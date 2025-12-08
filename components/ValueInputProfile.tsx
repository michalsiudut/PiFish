import { useFontStatus } from '@/hooks/useFontStatus';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    title: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    color: string
    isValid?: boolean
}


export const ValueInput: React.FC<Props> = ({
    title,
    placeholder,
    value,
    onChangeText,
    color,
    isValid = true,
}) => {
    const isLoaded = useFontStatus();
    if (!isLoaded) {
        return <ActivityIndicator size={'small'} />
    }

    return (
        <>
            <View className='justify-center ml-4 mb-2'>
                <Text className='text-xl' style={styles.text}>{title}</Text>
            </View>
            <View className={
                isValid
                    ? 'ml-4 h-14 text-primary justify-center border border-[#6B7280] rounded-lg w-auto mr-5 mb-4 focus:border-secondary focus:border-2'
                    : 'ml-4 h-14 text-primary justify-center border border-[#EF4545] rounded-lg w-auto mr-5 mb-2 focus:border-secondary focus:border-2'
            }>
                <View className='flex-row items-center'>
                    <TextInput
                        placeholder={placeholder}
                        className='text-justify ml-3 flex-1'
                        placeholderTextColor={color}
                        style={styles.text}
                        value={value}
                        onChangeText={onChangeText}>
                    </TextInput>
                </View>
            </View >
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
    },
    icon: {
        height: 28,
        width: 28,
        tintColor: '#14b8a6',
        color: '#14b8a6',
        fontWeight: 900,
    }
})

export default ValueInput;