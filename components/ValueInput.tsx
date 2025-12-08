import { icons as images } from '@/constants/icons';
import { useFontStatus } from '@/hooks/useFontStatus';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    color: string
    iconName: keyof typeof images;
    isValid?: boolean
}


export const ValueInput: React.FC<Props> = ({
    title,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    color,
    iconName,
    isValid = true,
}) => {
    const isLoaded = useFontStatus();
    if (!isLoaded) {
        return <ActivityIndicator size={'small'} />
    }
    const [isVisible, setIsVisivle] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
    const switchState = () => {
        setIsVisivle(!isVisible);
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <>
            <View className='justify-center ml-4 mb-2'>
                <Text className='text-base' style={styles.text}>{title}</Text>
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
                        secureTextEntry={isPasswordVisible}
                        onChangeText={onChangeText}>
                    </TextInput>
                    {iconName == "Eyeh" ?
                        <TouchableOpacity onPress={switchState}>
                            {isVisible ? <Image source={images[iconName]} style={styles.icon} className='mr-4'></Image> : <Image source={images.Eye} style={styles.icon} className='mr-4'></Image>}
                        </TouchableOpacity>
                        :
                        <Image source={images[iconName]} style={styles.icon} className='mr-4'></Image>}
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