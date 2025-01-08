import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { getAll } from "./getAll";

export async function groupRemoveByName(group: string): Promise<void> {
    try {
        const storedGroups = await getAll();
        const groups = storedGroups.filter(g => g !== group);
        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);
    } catch (error) {
        throw error;
    }
}