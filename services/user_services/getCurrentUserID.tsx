import { auth } from "../FirebaseConfig";


const getCurrentUserID = () => {
    const user = auth.currentUser;
    if (user) {
        const userID = user.uid;
        return userID;
    } else {
        return null;
    }
}

export default getCurrentUserID;