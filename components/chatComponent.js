import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() === '') {
      return; // Do not send empty messages
    }

    // Add the user's message to the list of messages
    setMessages([...messages, { text: userInput, user: 'user' }]);

    // TODO: Send the user's message to ChatGPT API and handle the response

    // Clear the input box
    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Ask Away</Text>
      </View>
      <FlatList
        data={messages.slice().reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.user === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
            <View style={item.user === 'user' ? styles.userMessage : styles.botMessage}>
              <Text style={styles.textColor}>{item.text}</Text>
            </View>
            <View style={item.user === 'user' ? styles.dotRight : styles.dotLeft} />
          </View>
        )}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Type your message..."
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="arrow-up" size={20} color="#f2f2f2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4d4d4d',
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  headingContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  textColor: {
    color: "#f2f2f2",
  },
  userMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',  // Align to the right for user messages
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',  // Align to the left for bot messages
  },
  dotRight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',  // Dot color for user messages
    marginRight: 8,
  },
  dotLeft: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4285f4',  // Dot color for bot messages
    marginLeft: 8,
  },
  userMessage: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  botMessage: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    marginTop: 16,
  },
  inputBox: {
    color: "#f2f2f2",
    flex: 1,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatComponent;
