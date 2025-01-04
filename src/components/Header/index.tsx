import { Container, Logo } from "./styles";

import logoImg from "@assets/logo.png";

const Header = () => {
    return (
        <Container>
            <Logo source={logoImg} />
        </Container>
    );
}
export default Header;