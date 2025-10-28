import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: "Home",
                headerShown: false
            }} />
            <Tabs.Screen name="Calendar" options={{
                title: "Calendar",
                headerShown: false
            }} />
            <Tabs.Screen name="Profile" options={{
                title: "Profile",
                headerShown: false
            }} />
            <Tabs.Screen name="Settings" options={{
                title: "Settings",
                headerShown: false
            }} />

        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})