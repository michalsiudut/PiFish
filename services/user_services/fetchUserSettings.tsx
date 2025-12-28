import { auth, db } from "@/services/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const fetchUserSettings = async () => {
    const user = auth.currentUser;
    if (!user) return null;

    const ref = doc(db, "users_settings", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data();
};

export default fetchUserSettings;
