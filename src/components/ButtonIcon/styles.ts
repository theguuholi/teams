import theme from "@theme/index";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export type ButonIconTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButonIconTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  min-height: 56px;
  max-height: 56px;

  align-items: center;
  justify-content: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
}))``;
