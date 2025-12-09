import { auth } from '@/services/FirebaseConfig';
import { fetchUserData } from "@/services/user_services/fetchUserData";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
type UserContextType = {
    nick: string;
    setNick: (v: string) => void;
    profilePhoto: string;
    setProfilePhoto: (v: string) => void;
    name: string;
    setName: (v: string) => void;
    surname: string;
    setSurname: (v: string) => void;
    country: string;
    setCountry: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    xp: number;
    setXp: (v: number) => void;
    phoneNumber: number;
    setPhoneNumber: (v: number) => void;
    gender: string;
    setGender: (v: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [nick, setNick] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [xp, setXp] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [gender, setGender] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // użytkownik zalogowany, pobierz dane
                const result = await fetchUserData();
                setNick(result?.Nick ?? "");
                setProfilePhoto(result?.ProfilePhoto ?? "");
                setCountry(result?.City ?? "");
                setEmail(result?.Email ?? "");
                setName(result?.Name ?? "");
                setSurname(result?.Surname ?? "");
                setXp(result?.xp ?? 0);
                setPhoneNumber(result?.phoneNumber ?? 0);
                setGender(result?.gender ?? 0);
            } else {
                // użytkownik nie jest zalogowany
                setNick("");
                setProfilePhoto("");
                setCountry("");
                setEmail("");
                setName("");
                setSurname("");
                setXp(0);
                setPhoneNumber(0);
                setGender("");
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <UserContext.Provider
            value={{
                nick,
                setNick,
                profilePhoto,
                setProfilePhoto,
                name,
                setName,
                surname,
                setSurname,
                country,
                setCountry,
                email,
                setEmail,
                xp,
                setXp,
                phoneNumber,
                setPhoneNumber,
                gender,
                setGender
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
//hook do danych
export const useUser = () => {
    const ctx = useContext(UserContext);

    if (!ctx) {
        throw new Error("useUser must be used inside <UserProvider>");
    }

    return ctx;
};
