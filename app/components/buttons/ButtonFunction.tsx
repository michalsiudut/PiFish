import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useFontStatus } from '../../hooks/useFontStatus';

interface Props {
    text: string;
    onChange: () => void;
    textColor: string;
}

export const ButtonFunction: React.FC<Props> = ({ text, onChange, textColor }) => {


    const { fontsLoaded } = useFontStatus();

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" />;
    }


    return (
        <>
            <TouchableOpacity onPress={onChange} className='items-center justify-center'>
                <Text style={{ fontFamily: "Lexend-Bold", color: textColor }}>
                    {text}
                </Text>
            </TouchableOpacity >
        </>
    )
};

export default ButtonFunction;