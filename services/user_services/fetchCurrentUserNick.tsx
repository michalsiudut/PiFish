import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export async function fetchCurrentUserNick(uid: string) {
    try {
        const userDocRef = doc(db, "users", uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const nickname = userData.Nick;
            return nickname;
        }
        // TODO catch the error from not available data
    } catch {
        // TODO catch the error from database
    }
}

