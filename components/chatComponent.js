import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';


const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  
  // Helper function to detect if the message is asking for news
  const isAskingForNews = useCallback((message) => {
    const lowerCaseMessage = message.toLowerCase();
    // Simple checks for phrases that might indicate a request for news 
    return lowerCaseMessage.includes("latest news") || lowerCaseMessage.includes("current event") || lowerCaseMessage.includes("update on") || lowerCaseMessage.includes("show me news about") || lowerCaseMessage.includes("news");
  }, []);

  

  const handleSendMessage = async () => {
    if (userInput.trim() === '') {
      return; // Do not send empty messages
    }
  
    // Add the user's message to the list of messages
    const userMessage = { text: userInput, user: 'user' };

    //Clear input box
    setUserInput('');

    //add user message to display
    setMessages([...messages, userMessage]);
    
    //Simulate bot typing before sending the message
    setIsBotTyping(true);
  
    // Send the user's message to the Python server
    const response = await sendToPythonServer(userInput);
  
    // Add the bot's response to the list of messages
    const botMessage = { text: response.botResponse, user: 'bot' };
  
    // Update the state with both user and bot messages
    setMessages([...messages, userMessage, botMessage]);
    
    //Need to turn off indicator
    setIsBotTyping(false);
    
    // Clear the input box
    setUserInput('');


  };
  

  const sendToPythonServer = async (message) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      const results = await response.json();
      return results;
    } catch (error) {
      console.error('Error sending message to Python server:', error);
    }
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
              <View style={styles.messageContainer}>
                {item.user === 'user' ? (
                  <>
                    <View style={styles.userMessage}>
                      <Text style={styles.textColor}>{item.text}</Text>
                    </View>
                    <View style={styles.dotRight} />
                  </>
                ) : (
                  <>
                  <View style={styles.dotLeft} />
                  <View style={styles.botMessage}>
                    <Text style={styles.textColor}>{item.text}</Text>
                  </View>
                </>
                )}
              </View>
          </View>
        )}
        inverted
      />
      <View style={styles.typingContainer}>
        {isBotTyping && (
          <>
            <View style={styles.dotLeft} />
            <LottieView
              source={require('../animations/TextAnimation.json')}
              autoPlay
              loop={true}
              onAnimationFinish={() => setIsBotTyping(false)}
              style={styles.typingAnimation}
            />
          </>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Type your message..."
          placeholderTextColor="#a0a0a0"
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
    alignItems: 'flex-start',
    alignSelf: 'flex-end', // Align to the right for user messages
    marginLeft: 16, 
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start', // Align to the left for bot messages
    marginRight: 16,  
  },
  typingAnimation: {
    width: 50,
    height: 50,
    alignSelf: 'flex-start', // Align to the left for bot messages
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',  // Align messages at the top
  },
  dotRight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',  // Dot color for user messages
    marginTop: 16,  // Adjust the margin as needed
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'top',
  },
  dotLeft: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4285f4',  // Dot color for bot messages
    marginTop: 16,
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
