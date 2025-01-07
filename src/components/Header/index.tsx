import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./styles";

import logoImg from "@assets/logo.png";

type Props = {
    showBackButton?: boolean;
}
const Header = ({ showBackButton = false }: Props) => {
    const navigate = useNavigation();

    const handleBack = () => {
        navigate.navigate('groups');
    };
    
    return (
        <Container>
            {showBackButton && (
                <BackButton onPress={handleBack}>
                    <BackIcon />
                </BackButton>
            )}
            <Logo source={logoImg} />
        </Container>
    );
}
export default Header;