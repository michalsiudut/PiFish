import { icons as images } from '@/constants/icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
    text: string;
}

export const ValidationView = ({ text }: Props) => {

    return (<>
        <View className='ml-4 flex-row gap-2 items-center'>
            <Image source={images.Info} style={styles.icon}></Image>
            <Text style={styles.textWarning} className=''>{text}</Text>
        </View>
    </>)
}

const styles = StyleSheet.create({
    textWarning: {
        fontFamily: 'Lexend-Regular',
        color: '#EF4545',
        fontSize: 13,
    },
    icon: {
        width: 12,
        height: 12,
        tintColor: '#EF4545',
    }
})

export default ValidationView;