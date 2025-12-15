import SuccessSVG from '@/assets/icons/SuccessSVG1.svg';
import ButtonFunction from '@/components/buttons/ButtonFunction';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

const Success = () => {
    const router = useRouter();

    const handleChange = () => {
        router.replace("/(pages)/EditProfile");
    }

    return (<>
        <View className='flex-1 justify-center items-center'>
            <View className='rounded-full bg-slate-200 w-40 h-40 flex justify-center items-center mb-10'>
                <SuccessSVG width={128} height={100} />
            </View>
            <View className='flex justify-center items-center mr-4 ml-4'>
                <Text style={{ fontFamily: "Lexend-Bold", fontSize: 22, textAlign: 'center' }}>Twoje dane osobowe zostały pomyślnie zmienione!</Text>
            </View>
            <View className='flex justify-center items-center mr-4 ml-4 mt-4'>
                <Text style={{ fontFamily: "Lexend-Regular", fontSize: 16, textAlign: 'center', color: "#6B7280" }}>Twoje nowe dane są gotowe. Kliknij "OK", żeby je zobaczyć</Text>
            </View>
        </View>
        <View className='mb-5'>
            <ButtonFunction text='Ok' onChange={handleChange} textColor='primary' fullyRounded={true} />
        </View>
    </>
    )
}

export default Success
