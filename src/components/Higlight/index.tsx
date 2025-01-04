import { Container, Subtitle, Title } from "./styles";

type Props = {
    title: string;
    subtitle: string;
}

const Highlight = ({ title, subtitle }: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
        </Container>
    );
}
export default Highlight;