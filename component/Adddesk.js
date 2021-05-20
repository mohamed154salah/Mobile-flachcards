import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  Button
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
import TextButton from "./TextButton";
class Adddesk extends Component {
  state = {
    inp: "",
  };

  handleChangeText = (text) => {
    this.setState(() => ({ inp: text }));
  };

  onPress = () => {
    if (this.state.inp === "") {
      alert(" title");
    }
    console.log(this.state.inp);
    saveDeckTitle(this.state.inp);
    console.log(getDecks());
    this.setState({inp : ''})
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.head}> title of your new deck?</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            onChangeText={(text) => this.handleChangeText(text)}
            placeholder="TITLE"
            value={this.state.inp}
          />
        </View>
        <Button title="Add deck" onPress={this.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "space-around",
  },
  head: {
    fontSize: 40,
    alignSelf: "center",
    fontWeight: "bold",
    justifyContent: "center",
    marginLeft: 15,
  },
  textInput: {
    borderColor: "blue",
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
});

export default Adddesk;
