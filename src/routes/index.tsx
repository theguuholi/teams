import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./app.routes";
import { View } from "react-native";
import { useTheme } from "styled-components";

// Prop Drilling
// hierarquia sobre contextAPI 
// ContextAPI sobre prop drilling
// aumenta a complexidade do código
const Routes = () => {
    const { COLORS } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>

    );
}

export default Routes;