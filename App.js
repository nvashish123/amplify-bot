import React from "react";
import { StyleSheet, Text, SafeAreaView, Alert, StatusBar } from "react-native";
import Amplify from "aws-amplify";
import { ChatBot } from "aws-amplify-react-native";

import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight
  }
});

export default class App extends React.Component {
  state = {
    botName: "BookTrip_dev",
    welcomeMessage: "Welcome, what would you like to do today?"
  };

  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(err, confirmation) {
    if (err) {
      Alert.alert("Error", "Bot conversation failed", [{ text: "OK" }]);
      return;
    }

    Alert.alert("Done", JSON.stringify(confirmation, null, 2), [
      { text: "OK" }
    ]);

    this.setState({
      botName: "BookTrip_dev"
    });

    return "Trip booked. Thank you! what would you like to do next?";
  }

  render() {
    const { botName, showChatBot, welcomeMessage } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ChatBot
          botName={botName}
          welcomeMessage={welcomeMessage}
          onComplete={this.handleComplete}
          clearOnComplete={false}
          styles={StyleSheet.create({
            itemMe: {
              color: "red"
            }
          })}
        />
      </SafeAreaView>
    );
  }
}
