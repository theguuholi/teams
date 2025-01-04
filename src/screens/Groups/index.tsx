import Header from '@components/Header';
import { Container } from './styles';
import Highlight from '@components/Higlight';
import GroupCard from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';

export default function Groups() {
    const [groups, setGroups] = useState<string[]>(['elixir']);

    return (
        <Container>
            <Header />
            <Highlight title="Teams" subtitle="Play with your Friends" />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => <GroupCard title={item} />}
            />
        </Container>
    );
}