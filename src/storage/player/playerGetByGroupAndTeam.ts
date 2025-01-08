import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { listByGroup } from "./listByGroup";

export async function playerAddByGroupAndTeam(team: string, group: string): Promise<PlayerStorageDTO[]> {
    try {
        const storage = await listByGroup(group);
        const players = storage.filter(player => player.team === team);
        return players;
    } catch (error) {
        throw error;
    }
}