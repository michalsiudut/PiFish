import { ButtonFunction } from '@/app/components/buttons/ButtonFunction';
import { icons } from '@/constants/icons';
import { auth } from '@/FirebaseConfig';
import { sendPasswordResetEmail } from '@firebase/auth';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ValueInput from '../components/ValueInput';
import { useFontStatus } from '../hooks/useFontStatus';

export default function ForgotPassword() {
    const router = useRouter();
    const [showContent, setShowContent] = useState(false);
    const [email, setEmail] = useState('');

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

    const goBack = () => {
        router.back();
    }

    const sendCode = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Jeśli adres e-mail jest zarejestrowany, link do resetowania hasła został wysłany.");

        } catch (error) {
            // handle error
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <TouchableOpacity onPress={goBack}>
                        <Image source={icons.Arrow} style={styles.iconArrow}></Image>
                    </TouchableOpacity>
                    <View className='mt-16 justify-center items-center'>
                        <Image source={icons.WelcomeIcon} style={styles.icon}></Image>
                    </View>
                    <View className='mt-6 justify-center items-center'>
                        <Text style={styles.text} className='text-4xl'>
                            Odzyskaj hasło
                        </Text>
                        <View className='mt-4 justify-center'>
                            <Text style={styles.textShadow} className='text-center'>
                                Podaj swój adre e-mail, aby otrzymać kod weryfikacyjny.
                            </Text>
                        </View>
                    </View>
                    <View className='mt-8'>
                        <ValueInput title='Email' placeholder='Wpisz swój adres e-mail' color='#61897F' value={email} onChangeText={setEmail} iconName='Mail'></ValueInput>
                    </View>
                    <ButtonFunction text='Wyślij kod' onChange={sendCode} textColor='primary'>
                    </ButtonFunction>
                </SafeAreaView >
            </TouchableWithoutFeedback >
        )
    }

    const styles = StyleSheet.create({

        iconArrow: {
            width: 32,
            height: 32,
            marginLeft: 16,
        },
        icon: {
            width: 53,
            height: 53,
            tintColor: "#14b8a6"
        },
        text: {
            fontFamily: 'Lexend-Bold',
            color: 'primary',
        },
        textShadow: {
            fontFamily: 'Lexend-Bold',
            color: '#61897F',
        }
    })
}