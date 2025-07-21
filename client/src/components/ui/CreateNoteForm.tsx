import type NoteProps from '@/props/NoteProps';
import { Button, Field, Fieldset, Input, Stack, Textarea, } from '@chakra-ui/react'
import { useState } from 'react';
import '../../index.css'


export default function CreateNoteForm({ onCreate }: { onCreate: (note: NoteProps) => void }) {
  
  const [isTitleValid, setIsTitleValid] = useState(true);
  const checkFields = (title: string) => {
    const isValid = title === '' ? false :  true;
    return isValid;
  }

  const [note, setNote] = useState({ title: '', description: '' });
  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const isValid = checkFields(note.title);
    setIsTitleValid(isValid);
    if (isValid){
      const newNote: NoteProps = {
        id: Date.now(),
        title: note.title,
        description: note.description || '',
        createdAt: new Date(),
        onDelete: () => { }, // заглушка, не делает ничего
      };
      setNote({ title: '', description: '' }); // Сброс формы после создания заметки
      onCreate(newNote);
    }
  }

  return (
    <div>
      <h1>Создание заметки</h1>
      <Fieldset.Root className='w-full flex flex-col ' onSubmit={onSubmit}>
        <Stack>
          <Fieldset.Legend> </Fieldset.Legend>
          <Field.Root>
            <Field.Root invalid={!isTitleValid} >
              <Input type="text" placeholder='Введите название заметки' value={note?.title ?? ''} onChange={(e) => setNote({ ...note, title: e.target.value })}></Input>
              <Field.ErrorText>Название обязательно</Field.ErrorText>
            </Field.Root>

            <Textarea className='!mt-2' placeholder='Описание' value={note?.description ?? ''} onChange={(e) => setNote({ ...note, description: e.target.value })} />
            <Button className='w-full' type='submit' onClick={onSubmit}>Создать</Button>
          </Field.Root>
        </Stack>
      </Fieldset.Root>
    </div>
  );
}