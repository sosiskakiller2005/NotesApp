import { Card, Heading,  } from '@chakra-ui/react'
import type NoteProps from '../../props/NoteProps';


export default function Note({title, description, createdAt}: NoteProps) {
    return (
        <Card.Root variant={'elevated'} >
            <Card.Header><Heading size={"md"}>{title}</Heading></Card.Header>
            <Card.Body><Card.Description>{description}</Card.Description></Card.Body>
            <Card.Footer>{createdAt.toLocaleDateString()}</Card.Footer>
        </Card.Root>
    )
}
