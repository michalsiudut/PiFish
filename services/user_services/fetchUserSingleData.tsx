import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { auth } from "../FirebaseConfig";


export async function fetchUserSingleData(fieldName: 'Nick' | 'Email' | 'Surname' | "Name" | "City" | "xp") {
    const user = auth.currentUser;
    const userID = user?.uid;

    if (!userID) {
        return null;
    }

    try {
        const userDocRef = doc(db, "users", userID);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const value = userData[fieldName];
            return value ?? null;
        }
        // TODO catch the error from not available data
    } catch {
        // TODO catch the error from database
    }
}

