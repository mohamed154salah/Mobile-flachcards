import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  Button,
  Animated,
} from "react-native";
import {
  getDecks,
  getDeck,
  saveDeckTitle,
  saveCardToDeck,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from "../utils/api";
import { white, purple, gray, red, green } from "../utils/colors";
import AppLoading from "expo-app-loading";
import TextButton from "./TextButton";

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.onCorrectAnswer = this.onCorrectAnswer.bind(this);
    this.uncorrectAnswer = this.uncorrectAnswer.bind(this);
    this.resetScore = this.resetScore.bind(this);

  }
  state = {
    score: 0,
    curQuestion: 1,
    isReady: false,
    data: {},
    title: this.props.route.params,
  };

  componentDidMount() {
    clearLocalNotification()
    setLocalNotification()
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });


    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"],
    });


    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"],
    });

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

  onCorrectAnswer() {
    this.setState((prevstate) => ({
      score: prevstate.score + 1,
      curQuestion: prevstate.curQuestion + 1,
    }));
   
  }

  uncorrectAnswer() {
    this.setState((prevstate) => ({
      score: prevstate.score,
      curQuestion: prevstate.curQuestion + 1,
    }));
  }

  resetScore() {
    this.setState({
      score: 0,
      curQuestion: 1,
    });
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        friction: 10,
        tension: 8,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateX: this.frontInterpolate }],
    };

    const backAnimatedStyle = {
      transform: [{ rotateX: this.backInterpolate }],
    };

    if (this.state.isReady === false) {
      return <AppLoading />;
    }
    console.log(this.state.title);

    const { data, score, curQuestion } = this.state;
    console.log(data);
    const { title, questions } = data;
    console.log(curQuestion);

    return (
      <View style={styles.container}>
        {questions.length == 0 && (
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Sorry, no cards in the deck.
              </Text>
            </View>
          </View>
        )}

        {curQuestion <= questions.length && (
          <View>
            <View>
              <Text style={styles.Text}>
                {curQuestion + ":" + questions.length}
              </Text>
            </View>
            <View>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <Text
                  style={
                    ({ fontSize: 20 },
                    { fontWeight: "bold" },
                    { color: "#fff" })
                  }
                >
                  Question:{questions[curQuestion - 1].question}{" "}
                </Text>
                <Text>Answer the Question </Text>
              </Animated.View>
              <Animated.View
                style={[
                  backAnimatedStyle,
                  styles.flipCard,
                  styles.flipCardBack,
                ]}
              >
                <Text>The question answer is : </Text>
                <Text
                  style={
                    ({ fontSize: 20 },
                    { fontWeight: "bold" },
                    { color: "#ba135d" })
                  }
                >
                  {questions[curQuestion - 1].answer}{" "}
                </Text>
              </Animated.View>
            </View>
            <Button
              style={{ margin: 50 }}
              color="#f194ff"
              onPress={() => this.flipCard()}
              title="Show answer"
            />

          
            <View style={styles.fixToText}>
              <Button
                title="Right"
                color="#4aa96c"
                onPress={this.onCorrectAnswer}
              />
              <Button
                title="Wrong"
                color="#f55c47"
                onPress={this.uncorrectAnswer}
              />
            </View>
          </View>
        )}


        {curQuestion > questions.length &&
          questions.length != 0 &&
         
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
               Your Score: {score}
              </Text>
            </View>
            <View style={styles.fixToText}>
              <Button
                title="Restart"
                color="#4aa96c"
                onPress={this.resetScore}
              />
              <Button
                title="Back"
                color="#f55c47"
                onPress={()=>this.props.navigation.navigate('DeskView',title)}
              />
            </View>
          </View>
         
         }


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    backgroundColor: white,
  },
  column: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe5e2",
    padding: 10,
    margin: 10,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  flipCard: {
    margin: 10,
    width: 300,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cc9b6d",
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    backgroundColor: "#f2dac3",
    position: "absolute",
    top: 0,
  },
});

export default QuizView;
