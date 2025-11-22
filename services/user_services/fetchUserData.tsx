import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";


export async function fetchUserData() {
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
            return userData;
        }
        // TODO catch the error from not available data
    } catch {
        // TODO catch the error from database
    }
}

