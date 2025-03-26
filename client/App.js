import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawingScreen from './screens/DrawingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawing">
        <Stack.Screen name="Drawing" component={DrawingScreen} options={{ title: 'Рисование' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}