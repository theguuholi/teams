import { StatusBar } from 'expo-status-bar';
import Groups from '@screens/Groups';
import { ThemeProvider } from 'styled-components';
import theme from '@theme/index';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Loading from '@components/Loading';
import NewGroup from '@screens/NewGroup';
import Players from '@screens/Players';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Players /> : <Loading />}
      <StatusBar
        backgroundColor='transparent'
        style='light'
        translucent
      />
    </ThemeProvider>
  );
}