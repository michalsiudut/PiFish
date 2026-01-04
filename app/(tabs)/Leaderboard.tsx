import { fetchAllUsers } from '@/services/user_services/fetchAllUsers';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type User = {
    id: string;
    username?: string;
    xp?: number;
};

export default function Leaderboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUsers() {
            const data = await fetchAllUsers();
            setUsers(data);
            setLoading(false);
        }
        loadUsers();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Podium</Text>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Text style={styles.rank}>{index + 1}.</Text>
                        <Text style={styles.name}>{item.username || "Anon"}</Text>
                        <Text style={styles.xp}>{item.xp || 0} XP</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
    },
    title: {
        fontSize: 25,
        fontFamily: 'Lexend-Bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginHorizontal: 16,
    },
    rank: {
        width: 30,
        fontWeight: 'bold',
    },
    name: {
        flex: 1,
        fontSize: 16,
    },
    xp: {
        fontWeight: 'bold',
    },
    separator: {
        height: 8,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
