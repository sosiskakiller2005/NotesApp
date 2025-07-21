import axios from "axios";

export const fetchNotes = async (filter: { search: string; sortItem: string; sortOrder: string; }) => {
    try{
        const dbURL = import.meta.env.VITE_DATABASE_URL;
        const response = await axios.get(dbURL, {
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