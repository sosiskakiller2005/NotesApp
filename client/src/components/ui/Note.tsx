import '../../index.css'
import { Card, Heading, IconButton, } from '@chakra-ui/react'
import { Tooltip } from "@/components/ui/tooltip"
import { MdDeleteOutline } from "react-icons/md";
import type NoteProps from '../../props/NoteProps';
import { useState } from 'react';
import DeleteDialog from './DeleteDIalog';

export default function Note({ id, title, description, createdAt, onDelete }: NoteProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        await onDelete(id);
        setIsDialogOpen(false);
    };


    return (
        <Card.Root className='card' variant={'elevated'} >
            <Card.Header><Heading size={"md"}>
                <div className=' flex flex-row gap-10 items-center'>
                    {title}
                    <Tooltip content='Удалить заметку' openDelay={500} closeDelay={100} >
                        <IconButton variant='ghost' size='sm' onClick={handleDeleteClick}>
                            <MdDeleteOutline />
                        </IconButton>
                    </Tooltip>
                    <DeleteDialog
                        isOpen={isDialogOpen}
                        onCancel={() => setIsDialogOpen(false)}
                        onConfirm={handleConfirmDelete}
                    />

                </div>
            </Heading>
            </Card.Header>
            <Card.Body><Card.Description>{description}</Card.Description></Card.Body>
            <Card.Footer>{createdAt.toLocaleDateString()}</Card.Footer>
        </Card.Root>
    )
}


