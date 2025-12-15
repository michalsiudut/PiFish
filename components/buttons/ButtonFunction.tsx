import { useFontStatus } from '@/hooks/useFontStatus';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    text: string;
    onChange: () => void;
    textColor: string;
    fullyRounded?: boolean;
}

export const ButtonFunction: React.FC<Props> = ({ text, onChange, textColor, fullyRounded }) => {


    const { fontsLoaded } = useFontStatus();

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" />;
    }


    return (
        <>
            <View
                className={
                    fullyRounded
                        ? 'ml-4 mr-4 bg-secondary rounded-full h-12 mt-5 w-auto justify-center mb-5'
                        : 'ml-4 mr-4 bg-secondary rounded-xl h-12 mt-5 w-auto justify-center mb-5'
                }
            >
                <TouchableOpacity onPress={onChange} className='items-center justify-center'>
                    <Text style={{ fontFamily: "Lexend-Bold", color: textColor }}>
                        {text}
                    </Text>
                </TouchableOpacity >
            </View >
        </>
    )
};

export default ButtonFunction;