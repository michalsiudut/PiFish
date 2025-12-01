import { fetchUserData } from "@/services/user_services/fetchUserData";
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
    city: string;
    setCity: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    xp: number;
    setXp: (v: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [nick, setNick] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [xp, setXp] = useState(0);

    useEffect(() => {
        fetchUserData().then((result) => {
            setNick(result?.Nick ?? "");
            setProfilePhoto(result?.ProfilePhoto ?? "");
            setCity(result?.City ?? "");
            setEmail(result?.Email ?? "");
            setName(result?.Name ?? "");
            setSurname(result?.Surname ?? "");
            setXp(result?.xp ?? 0);
        });
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
                city,
                setCity,
                email,
                setEmail,
                xp,
                setXp,
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
