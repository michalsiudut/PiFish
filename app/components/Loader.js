import { ActivityIndicator, StyleSheet, View } from 'react-native';

const NajprostszyLoader = () => {
    return (
        <View style={styles.container}>
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
        bottom: -200,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
    },
});

export default NajprostszyLoader;