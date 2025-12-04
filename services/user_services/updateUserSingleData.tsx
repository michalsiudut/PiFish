import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";

type UserFields = 'Nick' | 'Email' | 'Surname' | 'Name' | 'City' | 'xp' | 'ProfilePhoto' | 'PhoneNumber';

export async function updateUserSingleData<T extends string | number>(
    fieldName: UserFields,
    value: T
) {
    const user = auth.currentUser;
    const userID = user?.uid;

    if (!userID) {
        return null;
    }

    try {
        const userDocRef = doc(db, "users", userID);
        await updateDoc(userDocRef, {
            [fieldName]: value
        });
        // TODO catch the error from not available data
    } catch {
        // TODO catch the error from database
    }
}

