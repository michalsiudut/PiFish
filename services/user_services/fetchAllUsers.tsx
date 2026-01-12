import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export async function fetchAllUsers() {
    try {
        const usersCol = collection(db, "users");

        const q = query(usersCol, orderBy("xp", "desc"));

        const snapshot = await getDocs(q);
        const usersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return usersData;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}