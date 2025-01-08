import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function listByGroup(group: string): Promise<PlayerStorageDTO[]> {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
        return players;
    } catch (error) {
        throw error;

    }
}