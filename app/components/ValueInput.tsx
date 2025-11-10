import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFontStatus } from '../hooks/useFontStatus';

interface Props {
    title: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    color: string
}

export const ValueInput: React.FC<Props> = ({
    title,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    color,
}) => {
    const isLoaded = useFontStatus();
    if (!isLoaded) {
        return <ActivityIndicator size={'small'} />
    }
    return (
        <>
            <View className='justify-center ml-4 mb-2'>
                <Text className='text-base' style={styles.text}>{title}</Text>
            </View>
            <View className='ml-4 h-14 text-primary justify-center border-[#6B7280] border rounded-lg w-auto mr-4 mb-4'>
                <TextInput
                    placeholder={placeholder}
                    className='text-justify ml-3'
                    placeholderTextColor={color}
                    style={styles.text}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}>
                </TextInput>
            </View>

        </>
    )
};


const styles = StyleSheet.create({
    text: {
        fontFamily: 'Lexend-Bold',
        color: 'primary',
    },
    textShadow: {
        fontFamily: 'Lexend-Bold',
        color: '#61897F',
    }
})

export default ValueInput;