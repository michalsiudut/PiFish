import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
    title: string;
    secondTitle: string;

}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, secondTitle }) => {

    const [isClicked, setIsClicked] = useState(false);

    const handlePress = () => {
        setIsClicked(!isClicked);
    }

    //fonts 
    const [fontsLoaded] = useFonts({
        'Lexend-Regular': require('../../assets/fonts/Lexend-Regular.ttf'),
        'Lexend-Bold': require('../../assets/fonts/Lexend-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <>
            < TouchableOpacity style={[styles.button, isClicked && styles.buttonClicked
            ]} onPress={handlePress}>
                <Text style={[styles.text, isClicked && styles.textClicked]}>
                    {title}
                </Text>
            </TouchableOpacity >
            < TouchableOpacity style={[styles.button, !isClicked && styles.buttonClicked
            ]} onPress={handlePress}>
                <Text style={[styles.text, !isClicked && styles.textClicked]}>
                    {secondTitle}
                </Text>
            </TouchableOpacity >
        </>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#13ECB6',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 168.5,
        marginRight: 5
    },
    buttonClicked: {
        backgroundColor: '#E5E7EB',
    },
    text: {
        color: 'white',
        fontFamily: 'Lexend-Bold',
    },
    textClicked: {
        color: '#6B7280',
    },
});