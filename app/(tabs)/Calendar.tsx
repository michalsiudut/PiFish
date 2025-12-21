import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function calendar() {

    return (

        <SafeAreaView>
            <View className='flex-row justify-center items-center mb-4 mt-2'>
                <Text style={styles.text}>Kalendarz aktywności</Text>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontFamily: "Lexend-Bold",
    },
})