import { Dispatch, SetStateAction, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    title?: string;
    text?: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export const SettingsLanguageView = ({ title, text, value, setValue }: Props) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Polski', value: 'pl' },
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
    ]);

    return (<>
        <Text style={styles.mainText} className='ml-4 mr-4'>Język</Text>
        <View className='flex-row h-20 items-center justify-between ml-4 mr-4 bg-light-400 mt-3 rounded-2xl w-auto'>
            <View className='flex-row justify-center items-center'>
                <View className="bg-[#E0F7F4] ml-4 rounded-lg w-12 h-12 flex justify-center items-center">
                    <Image
                        source={require('@/assets/icons/LanguageIcon.png')}
                        style={{ width: 28, height: 32, tintColor: '#14b8a6' }}
                    />
                </View>
                <View className='ml-4'>
                    <Text style={styles.text}>
                        {text}
                    </Text>
                </View>
            </View>
            <View className='mr-4 w-32'>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{
                        backgroundColor: '#E0F7F4',
                        borderRadius: 16,
                        borderWidth: 0,
                        height: 48,
                        minHeight: 38,
                        paddingVertical: 0,
                    }}
                    textStyle={{
                        fontSize: 16,
                        fontFamily: "Lexend-Regular",
                        color: "#14b8a6",
                    }}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        elevation: 0,
                        borderRadius: 16,
                    }}
                />
            </View>
        </View>
    </>
    );
};

export default SettingsLanguageView;

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
    smallIcon: {
        width: 18,
        height: 18,
        tintColor: "#111827",
    },
    text: {
        fontFamily: "Lexend-Regular",
        fontSize: 16,
    },
})