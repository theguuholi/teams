import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
  group: string;
};

export default function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("TIME A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Please enter a name");
    }
    const newPlayer = { name: newPlayerName, team: team };

    try {
      await playerAddByGroup(newPlayer, group);
      // const players = await playersGetByGroup(group);
      // console.log(players);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("new player", error.message);
      } else {
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const fetchedPlayers = await playersGetByGroupAndTeam(group, team);
      setPlayers(fetchedPlayers);
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching players");
    }
  }

  // arrow function, array de dependencia, no array quando mudar ele vai executar o use effect novamente
  // o use effect nao aceita async await
  useEffect(() => {
    console.log("useEffect executou");
    console.log(team);
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione o nome d galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["TIME A", "TIME B", "TIME C"]}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Nao ha pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
}
