import { auth, db } from "@/services/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

type UserSettingsData = {
    all_notifications?: boolean;
    dark_mode?: boolean;
    language?: string;
    lessons_reminder?: boolean;
    new_exercises?: boolean;
};

export const updateUserSettings = async (data: UserSettingsData) => {
    const user = auth.currentUser;
    if (!user) return null;

    const ref = doc(db, "users_settings", user.uid);
    await setDoc(ref, data, { merge: true }); // merge = true, to dont overcommit whole document
    return data;
};
