import { icons as images } from '@/constants/icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    text: string;
    iconName: keyof typeof images;
    onPress: () => void;
}

export const SettingsAccountManagment = ({ text, iconName, onPress }: Props) => {

    const dynamicIconSource = images[iconName]

    return (<>
        <TouchableOpacity onPress={onPress}>
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
                <Image source={images.Sign} style={styles.icon} className='mr-4'></Image>

            </View>
        </TouchableOpacity >
    </>
    );
};

export default SettingsAccountManagment;

const styles = StyleSheet.create({
    text: {
        fontFamily: "Lexend-Regular",
        fontSize: 16,
    },
    icon: {
        width: 24,
        height: 28,
    }
})