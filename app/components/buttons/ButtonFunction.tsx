import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
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
            <View className='ml-4 mr-4 bg-secondary rounded-xl h-12 mt-5 w-auto justify-center mb-5'>
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