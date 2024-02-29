import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";
import { AppError } from "@utils/AppError";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const players = await playersGetByGroup(group);
    const playerAlreadyExists = players.filter(
      (player) => player.name === newPlayer.name
    );
    if (playerAlreadyExists.length > 0) {
      throw new AppError("Player already exists");
    }

    const storage = JSON.stringify([...players, newPlayer]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
