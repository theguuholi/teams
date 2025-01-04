import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
}

const GroupCard = ({ title, ...rest }: Props) => {
    return (
        <Container>
            <Icon {...rest} />
            <Title>{title}</Title>
        </Container>
    );
}
export default GroupCard;