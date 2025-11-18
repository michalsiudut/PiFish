import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class settings extends Component {
    render() {
        return (
            <SafeAreaView>
                <View className='justify-center items-center'>
                    <Text style={styles.text}>Ustawienia</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontFamily: "Lexend-Bold"
    }
})