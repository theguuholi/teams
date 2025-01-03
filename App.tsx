import { StatusBar } from 'expo-status-bar';
import Groups from '@screens/Groups';
import { View } from 'react-native';

export default function App() {
  return (
    <View>
      <Groups />
      <StatusBar style="auto" />
    </View>
  );
}