import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useFontStatus } from '../../hooks/useFontStatus';

interface Props {
    text: string;
    color: string;
    fontSize: number;
    onChange?: () => void;
}

export const TouchableText: React.FC<Props> = ({ text, color, fontSize, onChange }) => {


    const { fontsLoaded } = useFontStatus();

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" />;
    }


    return (
        <>
            < TouchableOpacity onPress={onChange}>
                <Text style={{ fontFamily: 'Lexend-Bold', fontSize: fontSize, color: color }}>
                    {text}
                </Text>
            </TouchableOpacity >
        </>
    )
};


export default TouchableText;