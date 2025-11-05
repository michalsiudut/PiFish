import { useFontStatus } from '@/app/hooks/useFontStatus';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    text: string;
}

export const TouchableText: React.FC<Props> = ({ text }) => {


    const { fontsLoaded } = useFontStatus();

    if (!fontsLoaded) {
        return <ActivityIndicator size="small" />;
    }


    return (
        <>
            < TouchableOpacity >
                <Text style={styles.text} className='mt-1 text-primary'>
                    {text}
                </Text>
            </TouchableOpacity >
        </>
    )
};


const styles = StyleSheet.create({

    text: {
        fontFamily: "Lexend-Bold",
        fontSize: 15
    }
})