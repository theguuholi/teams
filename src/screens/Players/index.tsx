import Header from '@components/Header';
import { Container, Content, Form, HeaderList, Icon, NumbersOfPlayers } from './styles';
import Highlight from '@components/Higlight';
import Button from '@components/Button';
import Input from '@components/Input';
import ButtonIcon from '@components/ButtonIcon';
import Filter from '@components/Filter';
import { FlatList } from 'react-native';
import { useState } from 'react';

const Players = () => {

    const [team, setTeam] = useState<string>('Team A');
    const [players, setPlayers] = useState<string[]>([]);

    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Team Name" subtitle="Add people to split the team" />

            <Form>
                <Input placeholder='Player Name' autoCorrect={false} />
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


        </Container>
    );
}

export default Players;