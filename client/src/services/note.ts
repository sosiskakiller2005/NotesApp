import axios from "axios";

export const fetchNotes = async (filter: { search: string; sortItem: string; sortOrder: string; }) => {
    try{
        const response = await axios.get("http://localhost:5137/notes", {
            params: {
                search: filter?.search,
                sortItem: filter?.sortItem,
                sortOrder: filter?.sortOrder
            }
        });
        return response.data.notes;
    } catch(e){
        console.error("Ошибка получения:", e);
    }
}