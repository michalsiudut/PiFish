import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


interface CustomButtonProps {
    title: string;
    secondTitle: string;

}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, secondTitle }) => {

    const [isClicked, setIsClicked] = useState(false);

    const handlePress = () => {
        setIsClicked(!isClicked);
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
        fontWeight: 'bold',
    },
    textClicked: {
        color: '#6B7280',
    },
});