import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface Props {
    zIndex: number
}

const Loader = ({ zIndex }: Props) => {
    return (
        <View style={[styles.container, { bottom: zIndex }]}>
            <ActivityIndicator
                size="large"
                color="#14b8a6"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
    },
});

export default Loader;