import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

export function CustomSplashScreen({ onFinish }: { onFinish: () => void }) {
    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            animationRef.current?.play();
        }, 500); // delay to see how it works in production

        return () => {
            clearTimeout(timer);
            StatusBar.setHidden(false, 'fade');
        };
    }, []);

    return (
        <View style={styles.fullScreen}>
            <LottieView
                ref={animationRef}
                source={require('@/assets/lottie/dzialajprosze.json')}
                loop={false}
                onAnimationFinish={onFinish}
                style={styles.lottie}
                resizeMode="cover"
            />
        </View>
    );
}

export default CustomSplashScreen

const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#14b8a6',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
});