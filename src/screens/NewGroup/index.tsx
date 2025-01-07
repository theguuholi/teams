import Header from '@components/Header';
import { Container, Content, Icon } from './styles';
import Highlight from '@components/Higlight';
import Button from '@components/Button';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const NewGroup = () => {

    const navigation = useNavigation();
    const [group, setGroup] = useState<string>('');

    const handleNew = () => {
        navigation.navigate('players', { group: group });
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight title="Create a new Team" subtitle="Play with your Friends" />
                <Input placeholder='Team Name' onChangeText={setGroup} />
                <Button title='Create' style={{ marginTop: 18 }} onPress={handleNew} />
            </Content>
        </Container>
    );
}

export default NewGroup;