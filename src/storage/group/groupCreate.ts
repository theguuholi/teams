import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { getAll } from "./getAll";

export async function groupCreate(group: string): Promise<void> {
    try {
        const storage = await getAll();
        const groups = JSON.stringify([...storage, group]);
        await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    } catch (error) {
        throw error;
        
    }
}