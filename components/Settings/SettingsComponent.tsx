import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
    icon: keyof typeof icons;
    message: string;
}

const SettingsComponent: React.FC<Props> = ({ icon, message }) => {
    return (
        <View className="flex-row justify-between mt-6">
            <View className="flex-row gap-4 justify-center items-center">
                <Image source={icons[icon]} style={styles.icons} className="ml-4"></Image>
                <Text style={styles.text}>{message}</Text>
            </View>
            <Image source={icons.Sign} className='mr-4'></Image>
        </View >
    );
};

export default SettingsComponent;


const styles = StyleSheet.create({
    icons: {
        width: 33,
        height: 33,
    },
    text: {
        fontFamily: "Lexend-regular",
        fontSize: 15,
    }
})