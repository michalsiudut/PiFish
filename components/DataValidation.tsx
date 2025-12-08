import React from "react"
import { StyleSheet, Text, View } from 'react-native'


const DataValidation = ({ credential }: { credential: string }) => {

    return (

        credential != "" ?
            <View className='flex-row'>
                <View className='bg-[#e29090] w-4 z-900 ml-4 h-24 rounded-tl-lg rounded-bl-lg'></View>
                <View className='flex-1 h-24 mb-3 mr-4 bg-[#f3baba] justify-center rounded-tr-lg rounded-br-lg'>
                    <Text style={styles.text} className='ml-4'>{credential}</Text>
                </View>
            </View>
            :
            <View>
            </View>

    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Lexend-Bold',
        color: 'primary',
    },

})

export default DataValidation;