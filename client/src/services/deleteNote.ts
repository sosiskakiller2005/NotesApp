import axios from "axios";

export default async function deleteNote (id: number) {
    try {
        const response = await axios.delete('http://localhost:5137/notes/' + id);
        console.log("Заметка удалена:", response.data);
        return response.status;
    } catch (e) {
        console.error("Ошибка удаления заметки:", e);
    }
}