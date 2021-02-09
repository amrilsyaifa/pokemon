import React from 'react';
import DetailsScreen from './src/screens/Detail';
import HomeScreen from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Detail" component={DetailsScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
