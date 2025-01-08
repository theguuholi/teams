import Header from '@components/Header';
import { Container, Content, Form, HeaderList, Icon, NumbersOfPlayers } from './styles';
import Highlight from '@components/Higlight';
import Button from '@components/Button';
import Input from '@components/Input';
import ButtonIcon from '@components/ButtonIcon';
import Filter from '@components/Filter';
import { Alert, FlatList } from 'react-native';
import { useState } from 'react';
import PlayerCard from '@components/PlayerCard';
import ListEmpty from '@components/ListEmpty';
import { useRoute } from '@react-navigation/native';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';

type RouteParams = { group: string; }

const Players = () => {

    const [team, setTeam] = useState<string>('Team A');
    const [newPlayer, setNewPlayer] = useState<string>('');
    const [players, setPlayers] = useState<string[]>([]);
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const handleAddPlayer = async () => {
        if (newPlayer.trim() === '') {
            return Alert.alert('Please, inform the player name');
        }

        const player = {
            name: newPlayer,
            group: group
        }

        try {
            await playerAddByGroup(player, group);
        } catch (error) {
            console.error(error);
            Alert.alert('Error on add player');
            
        }

    }

    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle="Add people to split the team" />

            <Form>
                <Input placeholder='Player Name' autoCorrect={false}
                    onChangeText={setNewPlayer}

                />
                <ButtonIcon icon="add" />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Team A', 'Team B']}
                    keyExtractor={item => item}
                    horizontal
                    renderItem={({ item }) => <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />}
                />
                <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
                ListEmptyComponent={<ListEmpty message="No players found" />}
                renderItem={({ item }) => <PlayerCard name={item} onRemove={() => { }} />}
            />

            <Button title="Remove team" type='SECONDARY' />
        </Container>
    );
}

export default Players;