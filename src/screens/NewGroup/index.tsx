import Header from '@components/Header';
import { Container, Content, Icon } from './styles';
import Highlight from '@components/Higlight';
import Button from '@components/Button';
import Input from '@components/Input';

const NewGroup = () => {

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight title="Create a new Team" subtitle="Play with your Friends" />
                <Input placeholder='Team Name' />
                <Button title='Create' style={{marginTop: 18}} />
            </Content>
        </Container>
    );
}

export default NewGroup;