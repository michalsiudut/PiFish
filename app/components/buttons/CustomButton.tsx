import { useFontStatus } from '@/app/hooks/useFontStatus';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
    title: string;
    secondTitle: string;

}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, secondTitle }) => {

    const [isClicked, setIsClicked] = useState(true);

    const handlePress = (targetValue: boolean) => {
        if (isClicked !== targetValue) {
            setIsClicked(targetValue);
        }
    }

    const { fontsLoaded } = useFontStatus();

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" />;
    }


    return (
        <>
            < TouchableOpacity style={[styles.buttonClicked, isClicked && styles.button
            ]} onPress={() => handlePress(true)}>
                <Text style={[styles.textClicked, isClicked && styles.text]}>
                    {title}
                </Text>
            </TouchableOpacity >
            < TouchableOpacity style={[styles.buttonClicked, !isClicked && styles.button
            ]} onPress={() => handlePress(false)}>
                <Text style={[styles.textClicked, !isClicked && styles.text]}>
                    {secondTitle}
                </Text>
            </TouchableOpacity >
        </>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#14b8a6',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 168.5,
        marginRight: 5
    },
    buttonClicked: {
        backgroundColor: '#E5E7EB',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 168.5,
        marginRight: 5
    },
    text: {
        color: 'white',
        fontFamily: 'Lexend-Bold',
    },
    textClicked: {
        color: '#6B7280',
        fontFamily: 'Lexend-Bold',
    },
});