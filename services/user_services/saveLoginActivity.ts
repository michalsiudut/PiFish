import { db } from '@/services/FirebaseConfig';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

const saveLoginActivity = async (userId: string) => {
    const userLoginRef = doc(db, 'users_logins', userId);

    try {
        await updateDoc(userLoginRef, {
            logins: arrayUnion(new Date().toISOString())
        });
    } catch (err: any) {
        if (err.code === 'not-found') {
            await setDoc(userLoginRef, {
                logins: [new Date().toISOString()]
            });
        } else {
            console.log("saveLoginActivity error: ", err);
        }
    }
};

export default saveLoginActivity;
