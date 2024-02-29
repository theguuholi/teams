import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();
  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      const data = await groupGetAll();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("Fetching groups");
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhuma turma encontrada" />
        )}
      ></FlatList>
      <Button title="Criar turma" onPress={handleNewGroup} />
    </Container>
  );
}
