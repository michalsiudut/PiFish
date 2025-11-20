import { StyleSheet, Text, View } from "react-native";


export const DegreeListItem = ({ item, currentXp }) => {

    // Sprawdza, czy aktualny XP kwalifikuje się do tego stopnia
    const isActive = currentXp >= item.minXp && currentXp < item.maxXp;
    const isDone = currentXp < item.maxXp;

    const progressText = item.name !== 'GOAT'
        ? `${item.minXp} - ${item.maxXp - 1} XP`
        : `Minimum ${item.minXp} XP`;

    return (
        <>
            {isDone == false ?
                ((<View className="flex-row rounded-xl justify-between h-14 border-2 border-yellow-400 bg-yellow-100 mb-4 items-center" >
                    <Text className="ml-4" style={styles.text}>{item.name}</Text>
                    <Text className="mr-4" style={styles.text}>{progressText}</Text>
                </View >))
                :
                (<View className={isActive ? "flex-row rounded-xl justify-between h-14 border-2 border-secondary mb-4 items-center" : "flex-row rounded-xl justify-between h-14 bg-slate-200 mb-4 items-center"}>
                    <Text className="ml-4" style={styles.text}>{item.name}</Text>
                    <Text className="mr-4" style={styles.text}>{progressText}</Text>
                </View >)}
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "Lexend-Bold",
    }
})