import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface Props {
    title: string,
    placeholderValue: string,
}

const EditProfileComponent = ({ title, placeholderValue }: Props) => {
    return (
        <>

            <View>
                <View className='ml-4 mr-4 mt-4'>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View className='mt-3'>
                    <TextInput className='border border-[#6B7280] mr-4 ml-4 h-14 p-4 rounded-lg focus:border-secondary focus:border-[3px]' placeholder={placeholderValue} style={[styles.text, { fontSize: 15 }]}></TextInput>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Lexend-Bold",
        fontSize: 20,
    },
    shadowText: {
        fontFamily: "Lexend-Bold",
        color: '#61897F',
    }
})

export default EditProfileComponent