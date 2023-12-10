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
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.user === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.textColor}>{item.text}</Text>
          </View>
        )}
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
    padding: 16,
  },
  textColor: {
    color: "#f2f2f2",
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
