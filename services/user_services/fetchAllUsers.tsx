import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export async function fetchAllUsers() {
    try {
        const usersCol = collection(db, "users");
        const snapshot = await getDocs(usersCol);
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return usersData;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
