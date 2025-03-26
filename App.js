import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CreateComicScreen from './screens/CreateComicScreen';
import ComicScreen from './screens/ComicScreen';
import ComicsListScreen from './screens/ComicsListScreen'; // Импортируем новый экран

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
        <Stack.Screen name="CreateComic" component={CreateComicScreen} options={{ title: 'Создать комикс' }} />
        <Stack.Screen name="Comic" component={ComicScreen} options={({ route }) => ({ title: route.params.title })} />
        <Stack.Screen name="ComicsList" component={ComicsListScreen} options={{ title: 'Список комиксов' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}