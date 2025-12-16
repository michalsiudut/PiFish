import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

export function CustomSplashScreen({ onFinish }: { onFinish: () => void }) {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('@/assets/lottie/splash.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#14b8a6',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    lottie: {
        width: "100%",
        height: "100%",
    },
});
