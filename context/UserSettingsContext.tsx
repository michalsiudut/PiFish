import { auth } from "@/services/FirebaseConfig";
import fetchUserSettings from "@/services/user_services/fetchUserSettings";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type UserSettingsContextType = {
    allNotifications: boolean;
    setAllNotifications: (v: boolean) => void;

    darkMode: boolean;
    setDarkMode: (v: boolean) => void;

    language: string;
    setLanguage: (v: string) => void;

    lessonsReminder: boolean;
    setLessonsReminder: (v: boolean) => void;

    newExercises: boolean;
    setNewExercises: (v: boolean) => void;

    ready: boolean;
};

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [allNotifications, setAllNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("");
    const [lessonsReminder, setLessonsReminder] = useState(false);
    const [newExercises, setNewExercises] = useState(false);
    const [ready, setReady] = useState(false);

    const setSettingsData = (data: any) => {
        setAllNotifications(data?.all_notifications ?? false);
        setDarkMode(data?.dark_mode ?? false);
        setLanguage(data?.language ?? "");
        setLessonsReminder(data?.lessons_reminder ?? false);
        setNewExercises(data?.new_exercises ?? false);
    };

    const clearSettings = () => {
        setAllNotifications(false);
        setDarkMode(false);
        setLanguage("");
        setLessonsReminder(false);
        setNewExercises(false);
    };

    useEffect(() => {
        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!isMounted) return;

            if (user) {
                try {
                    const data = await fetchUserSettings();
                    if (data && isMounted) {
                        setSettingsData(data);
                        console.log('[UserSettingsContext] User data fetched successfully');
                    }
                } catch (e) {
                    console.warn("[UserSettingsContext] Fetch error", e);
                }
            } else {
                clearSettings();
            }

            if (isMounted) setReady(true);
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    return (
        <UserSettingsContext.Provider
            value={{
                allNotifications,
                setAllNotifications,
                darkMode,
                setDarkMode,
                language,
                setLanguage,
                lessonsReminder,
                setLessonsReminder,
                newExercises,
                setNewExercises,
                ready
            }}
        >
            {children}
        </UserSettingsContext.Provider>
    );
};

export const useUserSettings = () => {
    const ctx = useContext(UserSettingsContext);

    if (!ctx) {
        throw new Error("useUserSettings must be used inside <UserSettingsProvider>");
    }

    return ctx;
};
