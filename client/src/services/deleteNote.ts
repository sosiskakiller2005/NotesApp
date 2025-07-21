import axios from "axios";

export default async function deleteNote (id: number) {
    try {
        const dbURL = import.meta.env.VITE_DATABASE_URL;
        const response = await axios.delete(dbURL + '/' + id);
        return response.status;
    } catch (e) {
        console.error("Ошибка удаления заметки:", e);
    }
}