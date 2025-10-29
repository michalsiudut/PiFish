import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { icons as images } from '../../constants/icons';


type TabIconProps = {
    icon: ImageSourcePropType;
    name?: string;
    focused?: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon, name, focused }) => {
    const tintColor = focused ? '#14b8a6' : '#6B7280'; // Przykładowy kolor aktywny
    const iconSize = focused ? 'size-6' : 'size-6';
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
        }}>
            <Image
                source={icon}
                className={iconSize}
                tintColor={tintColor}
            />

        </View>
    );
};


const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#14b8a6",
                tabBarInactiveTintColor: "#6B7280",
                tabBarStyle: {
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 58,
                    overflow: 'hidden',
                },
                tabBarItemStyle: {
                    width: '100%',
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginTop: 2,
                    textAlign: 'center',
                }
            }}
        >
            <Tabs.Screen name="index" options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={images.Home}
                        name='Home'
                        focused={focused} />
                ),
            }} />
            <Tabs.Screen name="Calendar" options={{
                title: "Calendar",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={images.Calendar}
                        name='Calendar'
                        focused={focused} />
                )
            }} />
            <Tabs.Screen name="Profile" options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={images.Profile}
                        name='Profile'
                        focused={focused} />
                )
            }} />
            <Tabs.Screen name="Settings" options={{
                title: "Settings",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={images.Settings}
                        name='Settings'
                        focused={focused} />
                )
            }} />

        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})