import React, { Component, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import {
  getDecks,
  getDeck,
  saveDeckTitle,
  saveCardToDeck,
  deleteDeck,
} from "../utils/api";
import { white, purple, gray } from "../utils/colors";
import AppLoading from "expo-app-loading";

class DesksView extends Component {
  state = {
    isReady: false,
    data: [],
  };

  componentDidMount() {
    getDecks()
      .then((response) => {
        this.setState({
          data: response,
        });
      })

      .then(() =>
        this.setState(() => ({
          isReady: true,
        }))
      );
    this.didFocusSubscription = this.props.navigation.addListener(
      "focus",
      () => {
        getDecks()
          .then((response) => {
            this.setState({
              data: response,
            });
          })

          .then(() =>
            this.setState(() => ({
              isReady: true,
            }))
          );
      }
    );
  }

  render() {
    const { data } = this.state;

    if (this.state.isReady === false) {
      return <AppLoading />;
    }
    console.log(data);

    return (
      <View style={styles.container}>
        {Object.keys(data).map((key) => {
          const { title, questions } = data[key];
          return (
            <View key={key} style={styles.column}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('DeskView',title)}>
                <Text style={({ fontSize: 50 }, { color: "#f26f28" })}>
                  {title}
                </Text>
                <Text style={({ fontSize: 20 }, { color: "#292477" })}>
                  {questions.length} cards
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    backgroundColor: white,
  },
  column: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe5e2",
    padding: 10,
    borderColor: "#e93b81",
    borderWidth: 10,
    borderRadius: 3,
    width: 300,
  },
});

export default DesksView;
