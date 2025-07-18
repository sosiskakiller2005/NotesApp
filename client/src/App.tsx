import { useEffect, useState } from 'react'
// import { Portal, Select, Input,} from '@chakra-ui/react'
import './index.css'
import CreateNoteForm from './components/ui/CreateNoteForm'
import Note from './components/ui/Note'
import Filters from './components/ui/Filters'
import { fetchNotes } from './services/note'
import type NoteProps from './props/NoteProps.ts';
import { createNote } from './services/createNote.ts'


function App() {
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

  const onCreate = async (note: NoteProps) => {
    await createNote(note);
    const notes = await fetchNotes(filter);
    setNotes(notes);
  }

  return (
    <section className="p-8 flex flex-row justify-start gap-12">
      <div className='flex flex-col w-1/3 gap-10'>
        <CreateNoteForm onCreate={onCreate}/>
        <Filters filter={filter} setFilter={setFilter}/>
      </div>
      <ul className='flex flex-col gap-5 w-1/2'>
        {notes.map((n) => {
          return (
            <li key={n.id}>
              <Note id={n.id} title={n.title} description={n.description} createdAt={new Date(n.createdAt)} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}


export default App