import Header from '@components/Header';
import { Container, Content, Form, Icon } from './styles';
import Highlight from '@components/Higlight';
import Button from '@components/Button';
import Input from '@components/Input';
import ButtonIcon from '@components/ButtonIcon';

const Players = () => {

    return (
        <Container>
            <Header showBackButton />
            <Highlight title="Team Name" subtitle="Add people to split the team" />

            <Form>
                <Input placeholder='Player Name' autoCorrect={false} />
                <ButtonIcon icon="add" />
            </Form>

        </Container>
    );
}

export default Players;