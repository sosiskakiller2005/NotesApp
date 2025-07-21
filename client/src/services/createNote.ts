import type NoteProps from "@/props/NoteProps";
import axios from "axios";

export const createNote = async (note: NoteProps) => {
    try{
        const dbURL = import.meta.env.VITE_DATABASE_URL;
        const response = await axios.post(dbURL, note);
        return response.status;
    } catch(e){
        console.error("Ошибка получения:", e);
    }
}