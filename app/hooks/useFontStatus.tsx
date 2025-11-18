import { useFonts } from 'expo-font';

export const useFontStatus = () => {
    const [fontsLoaded] = useFonts({
        'Lexend-Regular': require('../../assets/fonts/Lexend-Regular.ttf'),
        'Lexend-Bold': require('../../assets/fonts/Lexend-Bold.ttf'),
    });

    return { fontsLoaded };
};

export default useFontStatus