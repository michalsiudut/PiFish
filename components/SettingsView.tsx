import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onPress: () => void;
    title: string;
}

const SettingsView: React.FC<Props> = ({ title, onPress }) => {


    return (<>
        <Text style={styles.mainText} className='ml-4 mr-4 mt-8'>
            {title}
        </Text>
        <TouchableOpacity onPress={() => onPress()} className='flex-row h-20 items-center justify-between ml-4 mr-4 bg-light-400 mt-3 rounded-2xl w-auto'>
            <View className='flex-row items-center'>
            </View>
        </TouchableOpacity>
    </>
    );
};

export default SettingsView;

const styles = StyleSheet.create({
    mainText: {
        fontFamily: "Lexend-Bold",
        fontSize: 22,
    }
})