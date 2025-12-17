import { icons as images } from '@/constants/icons';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';

interface Props {
    text: string;
    iconName: keyof typeof images;
    value: boolean;
    setValue: (value: boolean) => void;
}

export const SettingsCheckbox = ({ text, iconName, value, setValue }: Props) => {

    const dynamicIconSource = images[iconName]

    return (<>
        <View className='flex-row h-20 items-center justify-between ml-4 mr-4 bg-light-400 mt-3 rounded-2xl w-auto'>
            <View className='flex-row justify-center items-center'>
                <View className="bg-[#E0F7F4] ml-4 rounded-lg w-12 h-12 flex justify-center items-center">
                    <Image
                        source={dynamicIconSource}
                        style={{ width: 24, height: 24, tintColor: '#14b8a6' }}
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
                    value={value}
                    onValueChange={setValue}
                    trackColor={{ false: '#b0b0b0', true: '#14b8a6' }}
                    thumbColor={value ? '#ffffff' : '#ffffff'}
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