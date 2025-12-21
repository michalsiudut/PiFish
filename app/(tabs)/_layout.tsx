import Loader from '@/components/Loader';
import { useAuth } from '@/context/AuthContext';
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { icons as images } from '../../constants/icons';


type TabIconProps = {
    icon: ImageSourcePropType;
    focused?: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon, focused }) => {
    const tintColor = focused ? '#14b8a6' : '#6B7280';
    return (
        <View>
            <Image
                style={{
                    width: 24,
                    height: 24,
                    marginTop: 3,
                    paddingRight: 1,
                }}
                source={icon}
                tintColor={tintColor}
            />
        </View>
    );
};


const _layout = () => {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/(auth)');
        }
    }, [user, loading]);

    if (loading || !user) {
        return <Loader zIndex={0} />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#14b8a6",
                tabBarInactiveTintColor: "#6B7280",
            }}
        >
            <Tabs.Screen name="index" options={{
                title: "Dom",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={images.Home}
                        focused={focused} />
                ),
            }} />
            <Tabs.Screen name="Calendar" options={{
                title: "Kalendarz",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={images.Calendar}
                        focused={focused} />
                )
            }} />
            <Tabs.Screen
                name="Leaderboard"
                options={{
                    title: "Leaderboard",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabIcon icon={images.Podium} focused={focused} />)
                }}
            ></Tabs.Screen>
            <Tabs.Screen name="Profile" options={{
                title: "Profil",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={images.Profile}
                        focused={focused} />
                )
            }} />

        </Tabs >
    )
}

export default _layout
