

export const caluclateDegree = (xp: number): [string, string, number] => {

    if (xp < 1000) {
        return ["Nowicjusz", "Uczeń", 1000];
    } else if (xp < 2500) {
        return ["Uczeń", "Praktykant", 2500];
    } else if (xp < 5000) {
        return ["Praktykant", "Wiedzący", 5000];
    } else if (xp < 9000) {
        return ["Wiedzący", "Ekspert", 9000];
    } else if (xp < 15000) {
        return ["Ekspert", "Mistrz", 15000];
    } else if (xp < 25000) {
        return ["Mistrz", "Profesor", 25000];
    } else if (xp < 40000) {
        return ["Profesor", "Mentor", 40000];
    } else if (xp < 65000) {
        return ["Mentor", "Tytan", 65000];
    } else if (xp < 100000) {
        return ["Tytan", "GOAT", 100000];
    } else {
        return ["GOAT", "Jesteś GOAT'em", 100000];
    }
}