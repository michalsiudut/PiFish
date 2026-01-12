import { fetchAllUsers } from '@/services/user_services/fetchAllUsers';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type User = {
    id: string;
    Nick?: string;
    xp?: number;
    ProfilePhoto?: string;
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
                <ActivityIndicator size="large" color="#13ecb6" />
            </SafeAreaView>
        );
    }

    const topThree = users.slice(0, 3);
    const restOfUsers = users.slice(3);

    const PodiumItem = ({ user, rank }: { user: User, rank: number }) => (
        <View style={[styles.podiumColumn, rank === 1 && styles.podiumFirst]}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: user?.ProfilePhoto || 'https://via.placeholder.com/150' }}
                    style={[styles.avatar, rank === 1 ? styles.avatarLarge : styles.avatarSmall, { borderColor: rank === 1 ? '#13ecb6' : '#eee' }]}
                />
                <View style={[styles.rankBadge, rank === 1 ? styles.badgeGold : rank === 2 ? styles.badgeSilver : styles.badgeBronze]}>
                    <Text style={styles.rankBadgeText}>{rank}</Text>
                </View>
            </View>
            <View style={[styles.podiumBase, rank === 1 ? styles.baseTall : styles.baseShort]}>
                <Text style={styles.podiumName} numberOfLines={1}>{user?.Nick || "Anon"}</Text>
                <Text style={styles.podiumXP}>{user?.xp || 0} pkt</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Ranking</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.podiumSection}>
                    {topThree[1] && <PodiumItem user={topThree[1]} rank={2} />}
                    {topThree[0] && <PodiumItem user={topThree[0]} rank={1} />}
                    {topThree[2] && <PodiumItem user={topThree[2]} rank={3} />}
                </View>

                <View style={styles.listSection}>
                    {restOfUsers.map((item, index) => (
                        <View key={item.id} style={styles.userRow}>
                            <Text style={styles.listRank}>{index + 4}</Text>
                            <Image
                                source={{ uri: item.ProfilePhoto || 'https://via.placeholder.com/100' }}
                                style={styles.listAvatar}
                            />
                            <Text style={styles.listName}>{item.Nick || "Anon"}</Text>
                            <Text style={styles.listXP}>{item.xp || 0} pkt</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f6f8f8' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { padding: 20, alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1f2937' },

    // Podium Styles
    podiumSection: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 220,
        marginBottom: 20,
    },
    podiumColumn: { flex: 1, alignItems: 'center' },
    podiumFirst: { zIndex: 1 },
    avatarContainer: { position: 'relative', marginBottom: -5, zIndex: 2 },
    avatar: { borderRadius: 100, borderWidth: 4, backgroundColor: '#fff' },
    avatarLarge: { width: 80, height: 80 },
    avatarSmall: { width: 65, height: 65 },
    rankBadge: {
        position: 'absolute', bottom: -5, right: -5,
        width: 24, height: 24, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff'
    },
    badgeGold: { backgroundColor: '#13ecb6' },
    badgeSilver: { backgroundColor: '#9ca3af' },
    badgeBronze: { backgroundColor: '#fb923c' },
    rankBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    podiumBase: {
        width: '95%', backgroundColor: '#fff',
        borderTopLeftRadius: 15, borderTopRightRadius: 15,
        alignItems: 'center', justifyContent: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
    },
    baseTall: { height: 120 },
    baseShort: { height: 90 },
    podiumName: { fontWeight: 'bold', fontSize: 13, marginTop: 5 },
    podiumXP: { color: '#13ecb6', fontSize: 12, fontWeight: '600' },

    // List Styles
    listSection: { paddingHorizontal: 20, paddingBottom: 40 },
    userRow: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
        padding: 12, borderRadius: 15, marginBottom: 10,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
    },
    listRank: { width: 30, fontWeight: 'bold', color: '#6b7280', textAlign: 'center' },
    listAvatar: { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10, backgroundColor: '#eee' },
    listName: { flex: 1, fontSize: 15, fontWeight: '500' },
    listXP: { fontWeight: 'bold', color: '#13ecb6' }
});