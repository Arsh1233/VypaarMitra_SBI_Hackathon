import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';
import { theme } from './src/components/theme';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primary.sbi_blue} barStyle="light-content" />
      <RootNavigator />
    </NavigationContainer>
  );
}
