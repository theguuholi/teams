import Header from '@components/Header';
import { Container } from './styles';
import Highlight from '@components/Higlight';
import GroupCard from '@components/GroupCard';

export default function Groups() {
    return (
        <Container>
            <Header />
            <Highlight title="Teams" subtitle="Play with your Friends" />

            <GroupCard title="Group 1" />
        </Container>
    );
}