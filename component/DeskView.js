import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import {
  getDecks,
  getDeck,
  saveDeckTitle,
  saveCardToDeck,
  deleteDeck,
} from "../utils/api";
import { white, purple, gray, red, green } from "../utils/colors";
import AppLoading from "expo-app-loading";

class DeskView extends Component {
  state = {
    isReady: false,
    data: {},
    title: this.props.route.params,
  };

  componentDidMount() {
    console.log(this.state.title);
    getDeck(this.state.title)
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
        getDeck(this.state.title)
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

  /*
  startQuiz = () => {
    this.props.navigation.navigate("CardView", {
      entryId: this.props.deckInfo.title,
      displayCount: 0,
    });
  }; */

  render() {
    if (this.state.isReady === false) {
      return <AppLoading />;
    }
    console.log(this.state.title);

    const { data } = this.state;
    console.log(data);
    const { title, questions } = data;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={({ fontSize: 50 }, { color: "#f26f28" })}>{title}</Text>
          <Text style={({ fontSize: 20 }, { color: "#292477" })}>
            {questions.length} cards
          </Text>
          <Button
            title="Add card"
            onPress={() => this.props.navigation.navigate("Addcard", title)}
          />

          <Button
            title="Start Quiz"
            color="#f194ff"
            onPress={() => {
              this.props.navigation.navigate("QuizView",title);
            }}
          />
        </View>
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
    margin: 10,
    borderColor: "#e93b81",
    borderWidth: 10,
    borderRadius: 3,
    width: 300,
  },
});

export default DeskView;
