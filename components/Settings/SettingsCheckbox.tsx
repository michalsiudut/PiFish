import { icons as images } from '@/constants/icons';
import { useState } from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';

interface Props {
    text: string;
    iconName: keyof typeof images;
}

export const SettingsCheckbox = ({ text, iconName }: Props) => {

    const dynamicIconSource = images[iconName]
    const [enabled, setEnabled] = useState(false);

    return (<>
        <View className='flex-row h-20 items-center justify-between ml-4 mr-4 bg-light-400 mt-3 rounded-2xl w-auto'>
            <View className='flex-row justify-center items-center'>
                <View className="bg-[#E0F7F4] ml-4 rounded-lg w-12 h-12 flex justify-center items-center">
                    <Image
                        source={dynamicIconSource}
                        style={{ width: 24, height: 28, tintColor: '#14b8a6' }}
                    />
                </View>
                <View className='ml-4'>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            </View>
            <View className='mr-4'>
                <Switch
                    value={enabled}
                    onValueChange={setEnabled}
                    trackColor={{ false: '#b0b0b0', true: '#14b8a6' }}
                    thumbColor={enabled ? '#ffffff' : '#ffffff'}
                    ios_backgroundColor="#b0b0b0"
                />
            </View>

        </View>
    </>
    );
};

export default SettingsCheckbox;

const styles = StyleSheet.create({
    text: {
        fontFamily: "Lexend-Regular",
        fontSize: 16,
    },
})