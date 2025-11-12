import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { icons } from '../../constants/icons';

import { ButtonFunction } from '@/app/components/buttons/ButtonFunction';
import { TouchableText } from '@/app/components/buttons/TouchableText';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../FirebaseConfig';
import Loader from '../components/Loader';
import ValueInput from '../components/ValueInput';
import { useFontStatus } from '../hooks/useFontStatus';

export default function SignUpPage() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nick, setNick] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
    // end font 


    const SignUp = async () => {
        setIsLoading(true);
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const userUID = user.user.uid;
            if (user) {
                await setDoc(doc(db, "users", userUID), {
                    Email: email,
                    City: '',
                    Name: '',
                    Nick: nick,
                    Surname: ''
                })

                console.log("success");
                setIsLoading(false);
                router.replace('/(tabs)');
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }
    const switchToSignIn = () => {
        setIsLoading(false);
        router.replace("/(auth)")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
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
                    <ValueInput title='Hasło' placeholder='Wpisz swoje hasło' color='#61897F' secureTextEntry={true} iconName='Key' onChangeText={setPassword}></ValueInput>
                </View>
                <View style={{ height: 13 }}></View>
                <ButtonFunction text='Zarejestruj się' onChange={SignUp} textColor='primary' />
                <View className='mb-4 justify-center items-center flex-row gap-1'>
                    <Text style={styles.textShadow}>
                        Nie masz konta?
                    </Text>
                    <TouchableText text='Zaloguj się' onChange={switchToSignIn} fontSize={13} color='#14b8a6'></TouchableText>
                </View>
                {isLoading ? <Loader /> : <View></View>}
            </SafeAreaView >
        </TouchableWithoutFeedback>
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