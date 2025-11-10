import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { icons } from '../../constants/icons';

import { ButtonFunction } from '@/app/components/buttons/ButtonFunction';
import { TouchableText } from '@/app/components/buttons/TouchableText';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ValueInput from '../components/ValueInput';
import { useFontStatus } from '../hooks/useFontStatus';

export default function SignUpPage() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [showContent, setShowContent] = useState(false);

    //font 
    const isLoaded = useFontStatus();
    useEffect(() => {
        if (isLoaded) {
            setTimeout(() => {
                setShowContent(true);
            }, 50);
        }
    }, [isLoaded]);
    if (!showContent) {
        return <ActivityIndicator size={'large'} />;
    }


    const SignUp = () => {
    }
    const switchToSignIn = () => {
        router.replace("/(auth)")
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View className='justify-center items-center mt-12'>
                    <Image source={icons.WelcomeIcon} style={styles.icon}></Image>
                </View>
                <View className='justify-center items-center mt-7'>
                    <Text style={styles.text} className='text-4xl'>Stwórz konto</Text>
                </View>
                <View className='mt-6'>
                    <ValueInput title='Email' placeholder='Wpisz swój email' color='#61897F' iconName='Mail' onChangeText={setEmail}></ValueInput>
                </View>
                <View className='mt-2'>
                    <ValueInput title='Nazwa użytkownika' placeholder='Wpisz swoją nazwę użytkownika' color='#61897F' iconName='Name' onChangeText={setNick}></ValueInput>
                </View>
                <View className='mt-2'>
                    <ValueInput title='Imie' placeholder='Wpisz swoje imię' color='#61897F' iconName='Name' onChangeText={setName}></ValueInput>
                </View>
                <View className='mt-2'>
                    <ValueInput title='Nazwisko' placeholder='Wpisz swoje nazwisko' color='#61897F' iconName='Name' onChangeText={setSurname}></ValueInput>
                </View>
                <View className='mt-2'>
                    <ValueInput title='Miasto' placeholder='Wpisz swoje miasto' color='#61897F' iconName='City' onChangeText={setCity}></ValueInput>
                </View>
                <View className='mt-2'>
                    <ValueInput title='Hasło' placeholder='Wpisz swoje hasło' color='#61897F' secureTextEntry={true} iconName='Lock' onChangeText={setPassword}></ValueInput>
                </View>
                <View className='mt-2'>
                    <ValueInput title='Potwierdź hasło' placeholder='Wpisz swoje hasło jeszcze raz' color='#61897F' secureTextEntry={true} iconName='Key' onChangeText={setSecPassword}></ValueInput>
                </View>
                <View style={{ height: 30 }}></View>
                <ButtonFunction text='Zarejestruj się' onChange={SignUp} textColor='primary' />
                <View className='mb-4 justify-center items-center flex-row gap-1'>
                    <Text style={styles.textShadow}>
                        Nie masz konta?
                    </Text>
                    <TouchableText text='Zaloguj się' onChange={switchToSignIn} fontSize={13} color='#14b8a6'></TouchableText>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
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
        width: 53,
        height: 53,
        tintColor: "#14b8a6"
    }
})