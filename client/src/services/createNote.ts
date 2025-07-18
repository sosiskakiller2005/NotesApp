import type NoteProps from "@/props/NoteProps";
import axios from "axios";

export const createNote = async (note: NoteProps) => {
    try{
        const response = await axios.post("http://localhost:5137/notes", note);
        console.log("Создана заметка:", response.data);
        return response.status;
    } catch(e){
        console.error("Ошибка получения:", e);
    }
}