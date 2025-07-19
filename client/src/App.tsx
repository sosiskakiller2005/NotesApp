import { useEffect, useState, type JSX } from 'react'
// import { Portal, Select, Input,} from '@chakra-ui/react'
import './index.css'
import CreateNoteForm from './components/ui/CreateNoteForm'
import Note from './components/ui/Note'
import Filters from './components/ui/Filters'
import { fetchNotes } from './services/note'
import type NoteProps from './props/NoteProps.ts';
import { createNote } from './services/createNote.ts'
import { Button, IconButton } from '@chakra-ui/react'
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [icon, setIcon] = useState<JSX.Element>(<MdOutlineWbSunny className='icon'/>);
  useEffect(() => {
    setIcon(theme === 'dark' ? <MdOutlineWbSunny /> : <LuMoon />);
  }, [theme]);
  
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [filter, setFilter] = useState({
    search: '',
    sortItem: 'date',
    sortOrder: 'desc',

  });

  useEffect(() => {
    const fetchData = async () => {
      const notes = await fetchNotes(filter);
      setNotes(notes);
    }

    fetchData();

  }, [filter]);

  const toggleTheme = () => {
    const button = document.querySelector('.themeBtn');
    const newTheme = theme === 'light' ? 'dark' : 'light';
  
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    button?.classList.toggle('light');
  };
  
  
  const onCreate = async (note: NoteProps) => {
    await createNote(note);
    const notes = await fetchNotes(filter);
    setNotes(notes);
  }
  

  return (
    <section className="app flex flex-row justify-start gap-12">
      <div className='flex flex-col w-1/3 gap-10 '>
        <CreateNoteForm onCreate={onCreate}/>
        <Filters filter={filter} setFilter={setFilter}/>
      </div>
      {/* <h2>asdf</h2> */}
      <ul className='flex flex-col gap-5 w-1/2'>
        {notes.map((n) => {
          return (
            <li key={n.id}>
              <Note id={n.id} title={n.title} description={n.description} createdAt={new Date(n.createdAt)} />
            </li>
          )
        })}
      </ul>

      <IconButton className='themeBtn' onClick={toggleTheme}>
        <span className='icon'>
          {icon}
        </span>
      </IconButton>
    </section>
  )
}


export default App