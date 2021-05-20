import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  Button,
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
class Addcard extends Component {
  state = {
    question: "",
    answer: "",
    title:this.props.route.params
  };

  handleChangeText = (text) => {
    this.setState(() => ({ question: text }));
  };

  handleChangeText2 = (text) => {
    this.setState(() => ({ answer: text }));
  };

  onPress = () => {
    if (this.state.question === "" || this.state.answer === "") {
      alert("Please enter question or answer");
    }else{
    console.log(this.state.title);
    saveCardToDeck(this.state.title, {
      question: this.state.question,
      answer: this.state.answer,
    });
    this.props.navigation.navigate('DeskView',this.state.title)
    console.log(getDecks());
    this.setState({question : '',answer:''})

}
  };

  render() {
      const{title}=this.props.route.params;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.head}>
            What is the question of your new deck?
          </Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            onChangeText={(text) => this.handleChangeText(text)}
            placeholder="DECK question"
            value={this.state.question}
          />
        </View>
        <View>
          <Text style={styles.head}>What is the answer of your new deck?</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            onChangeText={(text) => this.handleChangeText2(text)}
            placeholder="DECK answer"
            value={this.state.answer}
          />
        </View>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={{fontSize: 20}}>SUBMIT</Text>
        </TouchableOpacity>
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
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  
});

export default Addcard;
