import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { listByGroup } from "./listByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string): Promise<void> {
    try {
        const storage = await listByGroup(group);
        const playerAlreadyExists = storage.some(player => player.name === newPlayer.name);
        if (playerAlreadyExists) {
            throw new AppError('Player already exists');
        }
        const players = JSON.stringify([...storage, newPlayer]);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
    } catch (error) {
        throw error;
    }
}