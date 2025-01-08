import Header from '@components/Header';
import { Container, Content, Form, HeaderList, Icon, NumbersOfPlayers } from './styles';
import Highlight from '@components/Higlight';
import Button from '@components/Button';
import Input from '@components/Input';
import ButtonIcon from '@components/ButtonIcon';
import Filter from '@components/Filter';
import { Alert, FlatList, Keyboard, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import PlayerCard from '@components/PlayerCard';
import ListEmpty from '@components/ListEmpty';
import { useNavigation, useRoute } from '@react-navigation/native';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerAddByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { removeByGroup } from '@storage/player/removeByGroup';
import Loading from '@components/Loading';

type RouteParams = { group: string; }

const Players = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [team, setTeam] = useState<string>('Team A');
    const [newPlayer, setNewPlayer] = useState<string>('');
    const newPlayerNameInputRef = useRef<TextInput>(null);
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const route = useRoute();
    const { group } = route.params as RouteParams;
    const navigation = useNavigation();

    const handleAddPlayer = async () => {
        if (newPlayer.trim() === '') {
            return Alert.alert('Please, inform the player name');
        }

        const player = {
            name: newPlayer,
            team: group
        }

        try {
            await playerAddByGroup(player, group);
            newPlayerNameInputRef.current?.blur();
            Keyboard.dismiss();
            setNewPlayer('');
            fetchPlayersByTeam();
        } catch (error) {
            console.error(error);
            Alert.alert('Error on add player');
        }

    }

    const fetchPlayersByTeam = async () => {
        try {
            setIsLoading(true);
            const playersByTeam = await playerAddByGroupAndTeam(team, group);
            setPlayers(playersByTeam);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            Alert.alert('Error on fetch players');
        }
    }

    const handleRemovePlayer = async (name: string) => {
        try {
            await removeByGroup(name, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.error(error);
            Alert.alert('Error on remove player');
        }
    }

    const groupRemove = async () => {
        try {
            await removeByGroup(group, group);
            navigation.navigate('groups');
        } catch (error) {
            console.error(error);
            Alert.alert('Error on remove group');
        }
    }

    const handleGroupeRemove = async () => {
        try {
            await removeByGroup(group, group);
            Alert.alert("Remove", "Do you want to remove this group?", [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => groupRemove()
                }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error on remove group');
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle="Add people to split the team" />

            <Form>
                <Input placeholder='Player Name' autoCorrect={false}
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayer}
                    value={newPlayer}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />
                <ButtonIcon icon="add" onPress={handleAddPlayer} />
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

            {isLoading ?
                <Loading /> :
                <FlatList
                    data={players}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.name}
                    contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
                    ListEmptyComponent={<ListEmpty message="No players found" />}
                    renderItem={({ item }) => <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />}
                />
            }

            <Button title="Remove team" type='SECONDARY' onPress={handleGroupeRemove} />
        </Container>
    );
}

export default Players;