function validateUserData(data: Record<string, any>) {
    return Object.values(data).every(value => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        return true;
    });
}

export default validateUserData;