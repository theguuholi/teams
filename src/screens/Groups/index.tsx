import Header from '@components/Header';
import { Container } from './styles';
import Highlight from '@components/Higlight';

export default function Groups() {
    return (
        <Container>
            <Header />
            <Highlight title="Teams" subtitle="Play with your Friends" />
        </Container>
    );
}