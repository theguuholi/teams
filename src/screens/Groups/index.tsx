import Header from '@components/Header';
import { Container } from './styles';
import Highlight from '@components/Higlight';
import GroupCard from '@components/GroupCard';
import { useCallback, useEffect, useState } from 'react';
import ListEmpty from '@components/ListEmpty';
import Button from '@components/Button';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAll } from '@storage/group/getAll';

export default function Groups() {
    const [groups, setGroups] = useState<string[]>([]);
    const navigation = useNavigation();
    const handleNewGroup = () => {
        navigation.navigate('new');
    };

    const fetchGroups = async () => {
        try {
            const storage = await getAll();
            setGroups(storage);
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenGroup = (group: string) => {
        navigation.navigate('players', { group });
    }

    useFocusEffect(useCallback(() => {
        console.log('useFocusEffect executed');
        fetchGroups();
    }, []));

    // useEffect(() => {
    //     //o que executar quando o componente for montado
    //     // quando vai executar depois de montado
    //     //array vazio executa uma vez
    //     // se passar uma variavel ele executa toda vez que a variavel mudar
    //     console.log('useEffect executed');
    //     fetchGroups();
    // }, [
    //     //variaveis que se mudarem o useEffect vai execut
    // ]);

    return (
        <Container>
            <Header />
            <Highlight title="Teams" subtitle="Play with your Friends" />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)} />}
                ListEmptyComponent={<ListEmpty message="No groups found" />}
            />
            <Button title='Create a new Team'
                onPress={handleNewGroup}
            />
        </Container>
    );
}