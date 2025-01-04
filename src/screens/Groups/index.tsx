import Header from '@components/Header';
import { Container } from './styles';
import Highlight from '@components/Higlight';
import GroupCard from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import ListEmpty from '@components/ListEmpty';

export default function Groups() {
    const [groups, setGroups] = useState<string[]>([]);

    return (
        <Container>
            <Header />
            <Highlight title="Teams" subtitle="Play with your Friends" />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                renderItem={({ item }) => <GroupCard title={item} />}
                ListEmptyComponent={<ListEmpty message="No groups found" />}
            />
        </Container>
    );
}