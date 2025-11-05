// src/components/MathTopicItem.js
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons as images } from '../../constants/icons';

interface MathProp {
    title: string,
    onPress: () => void,
    iconName: keyof typeof images;
}

const MathTopicItem: React.FC<MathProp> = ({ title, onPress, iconName }) => {
    const dynamicIconSource = images[iconName]

    return (
        <TouchableOpacity onPress={() => onPress()} className='flex-row h-20 items-center justify-between ml-4 mr-4 bg-light-400 mt-3 rounded-2xl w-auto'>
            <View className='flex-row items-center'>
                <Image source={dynamicIconSource} className='mr-4 ml-4 w-14 h-14'></Image>
                <Text style={{ fontFamily: "Lexend-Bold" }} className='text-base'>{title}</Text>
            </View>
            <Image source={images.Sign} className='mr-4'></Image>
        </TouchableOpacity>
    );
};

export default MathTopicItem;