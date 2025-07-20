import type NoteProps from '@/props/NoteProps';
import { Button, Field, Fieldset, Input, Stack, Textarea,  } from '@chakra-ui/react'
import { useState } from 'react';
import '../../index.css'


export default function CreateNoteForm({ onCreate }: { onCreate: (note: NoteProps) => void }) {
  const [note, setNote] = useState({ title: '', description: '' });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newNote: NoteProps = {
      id: Date.now(),
      title: note.title || '',
      description: note.description || '',
      createdAt: new Date(),
      onDelete: () => {}, // заглушка, не делает ничего
    };
    setNote({ title: '', description: '' }); // Сброс формы после создания заметки
    onCreate(newNote);
    
  }

    return (
        <Fieldset.Root className='w-full flex flex-col ' onSubmit={onSubmit}>
          <Stack>
            <Fieldset.Legend>Создание заметки</Fieldset.Legend>
            <Field.Root>
              <Input type="text" placeholder='Название заметки' value={note?.title ?? ''} onChange={(e) => setNote({...note, title: e.target.value})}/>
              <Textarea name="" id="" placeholder='Описание' value={note?.description ?? ''} onChange={(e) => setNote({...note, description: e.target.value})}/>
              <Button className='w-full' type='submit' onClick={onSubmit}>Создать</Button>
            </Field.Root>

          </Stack>
        </Fieldset.Root>
    );
}