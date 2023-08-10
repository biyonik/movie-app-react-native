import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "./src/screens/DetailScreen";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

const Stack = createNativeStackNavigator();

const navigationOptions : NativeStackNavigationOptions = {
  title: 'Movie App',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTransparent: true,
  headerTitleAlign: 'left',
  headerShadowVisible: true,
  headerLargeTitle: true,
  headerLargeTitleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerBackTitleVisible: true,
  headerBackTitle: 'Back',
  headerBackTitleStyle: {
    fontSize: 20,
  },
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={navigationOptions}/>
        <Stack.Screen name="Details" component={DetailScreen} options={navigationOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
