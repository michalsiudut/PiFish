import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onPress: () => void;
    title?: string;
    withTitle: boolean;
    text?: string;
}

export const SettingsView = ({ title, onPress, withTitle, text }: Props) => {


    return (<>
        {withTitle == true ? <Text style={styles.mainText} className='ml-4 mr-4'>
            {title}
        </Text> : <View></View>}
        <TouchableOpacity onPress={() => onPress()} className='flex-row h-20 items-center justify-between ml-4 mr-4 bg-light-400 mt-3 rounded-2xl w-auto'>
            <View className='flex-row justify-center items-center'>
                <View className="bg-[#a5faef] ml-4 rounded-lg w-10 h-10 flex justify-center items-center">
                    <Image
                        source={require('../assets/icons/LanguageIcon.png')}
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
                <TouchableOpacity className='flex-row'>
                    <Text style={styles.text}>Polski</Text>
                </TouchableOpacity>
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
    },
    icons: {
        width: 24,
        height: 28,
        tintColor: "#111827",
    },
    text: {
        fontFamily: "Lexend-Regular",
        fontSize: 16,
    },
})