import type NoteProps from '@/props/NoteProps';
import { Button, Input, Textarea,  } from '@chakra-ui/react'
import { useState } from 'react';


export default function CreateNoteForm({ onCreate }: { onCreate: (note: NoteProps) => void }) {
  const [note, setNote] = useState({ title: '', description: '' });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newNote: NoteProps = {
      id: Date.now(),
      title: note.title || '',
      description: note.description || '',
      createdAt: new Date(),
    };
    onCreate(newNote);
    
  }

    return (
        <form action="" className='w-full flex flex-col gap-3' onSubmit={onSubmit}>
          <h3 className='font-bold text-x1'>Создание заметки</h3>
          <Input type="text" placeholder='Название заметки' value={note?.title ?? ''} onChange={(e) => setNote({...note, title: e.target.value})}/>
          <Textarea name="" id="" placeholder='Описание' value={note?.description ?? ''} onChange={(e) => setNote({...note, description: e.target.value})}/>
          <Button type='submit'>Создать</Button>
        </form>
    );
}