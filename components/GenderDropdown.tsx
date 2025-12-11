import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function GenderDropdown({ value, setValue }: { value: string | null; setValue: (val: string) => void }) {

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Mężczyzna', value: 'male' },
        { label: 'Kobieta', value: 'female' },
    ]);

    return (<>
        <View className='justify-center ml-4 mb-2'>
            <Text className='text-xl' style={styles.text}>Płeć</Text>
        </View>
        <View className='mr-4 ml-4 mb-3'>
            <DropDownPicker
                style={{
                    backgroundColor: '#f0f0f0',
                    borderColor: "#6B7280",
                    borderWidth: 1,

                }}
                listMode="SCROLLVIEW"
                modalContentContainerStyle={{ backgroundColor: "#fff" }}
                modalProps={{
                    animationType: "slide"
                }}
                textStyle={{
                    color: '#111827',
                    fontFamily: "Lexend-Bold",
                }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(val) => {
                    const newVal = typeof val === 'function' ? val(value) : val;
                    setValue(newVal);
                }}
                setItems={setItems}
                placeholder="Wybierz płeć"
                zIndex={1000}
            />
        </View>
    </>
    );
}


const styles = StyleSheet.create({
    text: {
        fontFamily: 'Lexend-Bold',
        color: 'primary',
    },
    textShadow: {
        fontFamily: 'Lexend-Bold',
        color: '#61897F',
    },
    icon: {
        height: 28,
        width: 28,
        tintColor: '#14b8a6',
        color: '#14b8a6',
        fontWeight: 900,
    }
})
