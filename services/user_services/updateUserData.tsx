import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";

export type UserData = {
    Nick: string;
    Email: string;
    Surname: string;
    Name: string;
    Country: string;
    xp: number;
    ProfilePhoto: string;
    PhoneNumber: string;
    Gender: string;
};

export async function updateUserData(data: Partial<UserData>) {
    const user = auth.currentUser;
    const userID = user?.uid;

    if (!userID) {
        console.warn("[updateUserData] User not logged in");
        return null;
    }

    try {
        const userDocRef = doc(db, "users", userID);
        await updateDoc(userDocRef, data);
        console.log("[updateUserData] User data updated:", data);
    } catch (err) {
        console.error("[updateUserData] ERROR:", err);
        throw err;
    }
}
