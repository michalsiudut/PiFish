import { auth } from '@/services/FirebaseConfig';
import { fetchUserData } from "@/services/user_services/fetchUserData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
type UserContextType = {
    nick: string;
    setNick: (v: string) => void;
    profilePhoto: string;
    setProfilePhoto: (v: string) => void;
    ready: boolean;
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
    phoneNumber: string;
    setPhoneNumber: (v: string) => void;
    gender: string;
    setGender: (v: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const CACHED_USER_KEY = 'cachedUserData';
const AUTH_STATE_KEY = 'authState';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [nick, setNick] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [ready, setReady] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [xp, setXp] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");

    const saveAuthState = async (isLoggedIn: boolean) => {
        try {
            await AsyncStorage.setItem(AUTH_STATE_KEY, JSON.stringify({ isLoggedIn, timestamp: Date.now() }));
        } catch (error) {
            console.warn('Failed to save auth state:', error);
        }
    };

    const cacheUserData = async (userData: any) => {
        try {
            await AsyncStorage.setItem(CACHED_USER_KEY, JSON.stringify(userData));
        } catch (error) {
            console.warn('Failed to cache user data:', error);
        }
    };

    const loadCachedUserData = async () => {
        try {
            const cached = await AsyncStorage.getItem(CACHED_USER_KEY);
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            console.warn('Failed to load cached user data:', error);
            return null;
        }
    };

    const setUserData = (userData: any) => {
        setNick(userData?.Nick ?? "");
        setProfilePhoto(userData?.ProfilePhoto ?? "");
        setCountry(userData?.Country ?? "");
        setEmail(userData?.Email ?? "");
        setName(userData?.Name ?? "");
        setSurname(userData?.Surname ?? "");
        setXp(userData?.xp ?? 0);
        setPhoneNumber(userData?.PhoneNumber ?? "");
        setGender(userData?.Gender ?? "");
    };

    const clearUserData = () => {
        setNick("");
        setProfilePhoto("");
        setCountry("");
        setEmail("");
        setName("");
        setSurname("");
        setXp(0);
        setPhoneNumber("");
        setGender("");
    };

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {

            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (!isMounted) return;

                if (user) {
                    try {
                        const result = await fetchUserData();
                        if (result && isMounted) {
                            console.log('[UserContext] User data fetched successfully');
                            setUserData(result);
                            await cacheUserData(result);
                            await saveAuthState(true);
                            setReady(true);
                        }
                    } catch (error) {
                        const cachedData = await loadCachedUserData();
                        if (cachedData && isMounted) {
                            setUserData(cachedData);
                            await saveAuthState(true);
                            setReady(true);
                        }
                    }
                } else {
                    clearUserData();
                    await saveAuthState(false);
                    setReady(true);
                    try {
                        await AsyncStorage.removeItem(CACHED_USER_KEY);
                    } catch (error) {
                        console.warn('Failed to remove cached user data:', error);
                    }
                }
            });

            return unsubscribe;
        };

        let unsubscribe: (() => void) | null = null;
        initializeAuth().then(unsub => {
            unsubscribe = unsub;
        }).catch(error => {
            console.error('[UserContext] Error during auth initialization:', error);
        });

        return () => {
            isMounted = false;
            if (unsubscribe) unsubscribe();
        };
    }, []);


    return (
        <UserContext.Provider
            value={{
                nick,
                setNick,
                profilePhoto,
                setProfilePhoto,
                ready,
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
