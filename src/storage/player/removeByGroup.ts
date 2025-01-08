import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { listByGroup } from "./listByGroup";

export async function removeByGroup(name: string, group: string): Promise<void> {
    try {
        const storage = await listByGroup(group);
        const filters = storage.filter(player => player.name !== name);
        const players = JSON.stringify(filters);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
    } catch (error) {
        throw error;
    }
}