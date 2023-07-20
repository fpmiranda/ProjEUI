import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {ModuleScreen} from './src/screens/ModuleScreen';
import {BottomTab} from './src/components/BottomTab';
import {HeaderImg} from './src/components/HeaderImg';

const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 100, 255)',
    background: 'rgb(50,50,50)',
    card: 'rgb(50,50,50)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(70, 70, 70)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Navbar"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Module"
          component={ModuleScreen}
          options={({route}) => ({
            headerTitle: route.params.title,
            headerBackground: () => <HeaderImg title={route.params.title} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
