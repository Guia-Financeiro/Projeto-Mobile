import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import CalculoGastosScreen from '../screens/Gastos/CalculoGastosScreen';
import SobreScreen from '../screens/Sobre/SobreScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Início">
        <Drawer.Screen name="Início" component={HomeScreen} />
        <Drawer.Screen name="Calcular Gastos" component={CalculoGastosScreen} />
        <Drawer.Screen name="Sobre" component={SobreScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;