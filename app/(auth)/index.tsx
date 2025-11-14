import Loader from '@/app/components/Loader';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { icons as images } from '../../constants/icons';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../FirebaseConfig';
import { ValueInput } from '../components/ValueInput';
import { ButtonFunction } from "../components/buttons/ButtonFunction";
import { TouchableText } from '../components/buttons/TouchableText';
import { useFontStatus } from '../hooks/useFontStatus';
import { validationEmail, validationPassword } from '../hooks/validations';

export default function index() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailValid, setEmailValid] = useState("");
    const [passwordValid, setPasswordValid] = useState('');
    const [credentialValid, setCredentialValid] = useState(true);
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


    const signIn = async () => {
        setIsLoading(true);

        const emailError = validationEmail(email);
        const passwordError = validationPassword(password);

        setEmailValid(emailError);
        setPasswordValid(passwordError);

        if (emailError !== '' || passwordError !== '') {
            setIsLoading(false);
            return;
        }

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            if (user) {
                router.replace('/(tabs)')
            }
        } catch (error) {
            const firebaseError = error as { code: string; message: string };
            console.log(error)
            setIsLoading(false);
            switch (firebaseError.code) {
                case "auth/invalid-credential":
                    setCredentialValid(false);
                    break;

                default:
                    break;
            }
        }
    }

    const switchToSignUp = () => {
        router.replace('/(auth)/SignUpPage');
    }

    const forgotPassword = () => {
        router.push('/(auth)/ForgotPassword');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                {isLoading ? (<Loader />) : (<View></View>)}
                <View className='justify-center items-center mt-24 mb-6'>
                    <Image source={images.WelcomeIcon} style={{ width: 53, height: 53, tintColor: "#14b8a6" }}>
                    </Image>
                </View>
                <View className='justify-center items-center mb-4 w-auto'>
                    <Text className='text-4xl' style={styles.text}>Witaj z powrotem</Text>
                </View>
                <View className='justify-center items-center mb-8'>
                    <Text className='text-base font-bold' style={styles.textShadow}>Zaloguj sie na swoje konto</Text>
                </View>
                <ValueInput
                    title="Email"
                    placeholder="Wpisz swój email"
                    value={email}
                    onChangeText={setEmail}
                    color="#61897F"
                    iconName='Mail'
                    isValid={emailValid != '' ? false : true}
                />
                {emailValid != '' ? (
                    <View className='ml-4 mb-2 flex-row gap-2 items-center'>
                        <Image source={images.Info} style={styles.icon}></Image>
                        <Text style={styles.textWarning} className=''>{emailValid}</Text>
                    </View>
                ) :
                    (<View></View>)}
                <ValueInput
                    title="Hasło"
                    placeholder="Wpisz swoje hasło"
                    value={password}
                    onChangeText={setPassword}
                    color="#61897F"
                    secureTextEntry={true}
                    iconName='Key'
                    isValid={passwordValid == "" ? true : false}
                />
                {passwordValid != '' ? (
                    <View className='ml-4 mb-2 flex-row gap-2 items-center'>
                        <Image source={images.Info} style={styles.icon}></Image>
                        <Text style={styles.textWarning} className=''>{passwordValid}</Text>
                    </View>
                ) :
                    (<View></View>)}
                <View className='justify-center items-end mr-4'>
                    <TouchableText text='Zapomniałeś hasła?' color='#14b8a6' fontSize={13} onChange={forgotPassword}></TouchableText>
                </View>
                <ButtonFunction text='Zaloguj się' onChange={signIn} textColor='primary' />
                <View className='mt-7 justify-center items-center flex-row gap-1'>
                    <Text style={styles.textShadow}>
                        Nie masz konta?
                    </Text>
                    <TouchableText text='Zarejestuj się' onChange={switchToSignUp} fontSize={13} color='#14b8a6'></TouchableText>
                </View>
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
    textWarning: {
        fontFamily: 'Lexend-Regular',
        color: '#EF4545',
        fontSize: 13,
    },
    icon: {
        width: 12,
        height: 12,
        tintColor: '#EF4545',
    }
})