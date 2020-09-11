import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useCallback, useEffect, Props } from 'react';
import {
  GiftedChat,
  IMessage,
  Day,
  MessageText,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import { StyleSheet, Image } from 'react-native';
import { RootStackParamList } from '../types';
import { getMessage } from '../api/api';
import Colors from '../constants/Colors';

export default function ChatScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  useEffect(() => {
    navigation.setOptions({
      title: AI_NAME,
      headerLeft: () => <Image style={styles.logo} source={AI_AVATAR} />,
      headerStyle: styles.header,
      headerLeftContainerStyle: styles.headerLeft,
      headerTitleStyle: styles.headerTitle,
    })

    setMessages([
      {
        _id: 1,
        text: 'Hello! Please send your message :)',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: AI_NAME,
        },
      },
    ])
  }, []);

  const onSend = useCallback((messages = []) => {
    getMessage().then((response) => {
      const newMessageText = `IP: ${response?.data.ip}, time: ${response?.requestResponseTimeout}, text: ${messages[0].text}`
      messages[0].text = newMessageText
      messages[0].avatar = AI_AVATAR
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      alwaysShowSend={true}
      messagesContainerStyle={styles.chatContainerStyle}
      renderSend={(props) => <Send {...props} containerStyle={styles.sendContainer} children={<Image source={PAPERPLANE_ICON} />} />}
      placeholder='Write a message'
      renderDay={(props) => <Day {...props} textStyle={styles.dayTextStyle} dateFormat="D MMMM" />}
      renderComposer={(props) => <Composer {...props} placeholderTextColor="#9AADDE" textInputStyle={styles.composerTextInput} />}
      renderInputToolbar={(props) => <InputToolbar {...props} containerStyle={styles.inputToolbarContainer} primaryStyle={styles.inputToolbarPrimary} />}
      renderBubble={(props) => <Bubble {...props} wrapperStyle={{
        left: styles.leftMessageContainerStyle,
        right: styles.rightMessageContainerStyle
      }} />}
      renderMessageText={(props) => <MessageText {...props} textStyle={{
        left: styles.leftMessageTextStyle,
        right: styles.rightMessageTextStyle
      }} />}
      renderTime={() => null}
      renderAvatar={() => null}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

const AI_NAME = 'Elomia';
const AI_AVATAR = require('../assets/images/avatar.png');
const PAPERPLANE_ICON = require('../assets/images/paper-plane.png');
const FONT = 'Lato_400Regular';
const FONT_BOLD = 'Lato_700Bold';
const MESSAGE_CONTAINER_PRESET = {
  justifyContent: 'space-around',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 3,
  padding: 13,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.02,
  shadowRadius: 10,
};

const styles = StyleSheet.create({
  chatContainerStyle: {
    backgroundColor: Colors.light_purple,
    paddingBottom: 25,
  },
  header: {
    height: 110,
    backgroundColor: Colors.dark_purple,
  },
  headerTitle: {
    color: Colors.white,
    left: -100,
    fontSize: 22,
    fontFamily: FONT_BOLD
  },
  headerLeft: {
    padding: 10,
    paddingLeft: 16,
  },
  inputToolbarPrimary: {
    backgroundColor: Colors.light_purple,
    bottom: 13,
  },
  inputToolbarContainer: {
    backgroundColor: Colors.light_purple
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 100,
  },
  dayTextStyle: {
    color: Colors.dark_blue,
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 22,
    fontFamily: FONT_BOLD
  },
  textInput: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  composerTextInput: {
    borderRadius: 25,
    marginLeft: 18,
    marginRight: 18,
    backgroundColor: Colors.white,
    maxHeight: 51,
    minHeight: 45,
    paddingLeft: 22,
    paddingTop: 15,
    paddingBottom: 11,
    color: Colors.dark_blue,
    fontSize: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    fontFamily: FONT
  },
  sendContainer: {
    position: 'absolute',
    right: 30,
    bottom: 9
  },
  leftMessageContainerStyle: {
    backgroundColor: Colors.white,
    ...MESSAGE_CONTAINER_PRESET,
    marginLeft: 2,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 3,
  },
  rightMessageContainerStyle: {
    backgroundColor: Colors.sky_blue,
    ...MESSAGE_CONTAINER_PRESET,
  },
  leftMessageTextStyle: {
    fontSize: 16,
    color: Colors.dark_blue,
    fontFamily: FONT
  },
  rightMessageTextStyle: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: FONT
  },
});
