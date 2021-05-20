import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import TextButton from "./component/TextButton";
import DeskView from "./component/DeskView";
import DesksView from "./component/DesksView";
import Adddesk from "./component/Adddesk";
import Addcard from "./component/Addcard";
import QuizView from "./component/QuizView";
import { setLocalNotification } from './utils/api'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { white, purple, gray,red ,green} from "./utils/colors";


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "DesksView") {
            return  <MaterialCommunityIcons name="cards" size={35} color="green" />;
          } else if (route.name === "Adddesk") {
            return  <MaterialIcons name="library-add" size={35} color="green" />;
          }
        },
      })}
      tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
    >
      <Tab.Screen
        name="DesksView"
        component={DesksView}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Adddesk"
        component={Adddesk}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <NavigationContainer>

        <Stack.Navigator>
            <Stack.Screen
              name="DesksView"
              component={Tabs} />
            <Stack.Screen
                name="DeskView"
                component={DeskView}
                options={({ route }) => ({
                
                  title: route.params.entryId,
                  headerTitle: route.params.entryId
                })} />
            <Stack.Screen
                name="Addcard"
                component={Addcard}
                options={({ route }) => ({   
                  title: 'Add Card'
                })} />
            <Stack.Screen
                name="QuizView"
                component={QuizView}
                options={({ route }) => ({  
                  title: 'Quiz'
                })} />
          </Stack.Navigator>



      </NavigationContainer>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App
