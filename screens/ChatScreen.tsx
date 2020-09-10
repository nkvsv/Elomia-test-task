import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useCallback, useEffect, Props } from 'react'
import { GiftedChat, IMessage, MessageProps, Message, SystemMessage, Day, MessageText, Time, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { StyleSheet, Image, View, Text } from 'react-native';
import { RootStackParamList } from '../types';
import { getMessage } from '../api/api';
import moment from 'moment';

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
      messagesContainerStyle={styles.messagesContainerStyle}
      placeholder='Write a message'
      renderDay={(props) => <Day {...props} textStyle={styles.dayTextStyle} dateFormat="D MMMM"/>}
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

const styles = StyleSheet.create({
  header: {
    height: 110,
    backgroundColor: '#A4B3EA',
  },
  headerLeft: {
    padding: 10,
    paddingLeft: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    left: -100,
    fontSize: 22,
  },
  textInput: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  messagesContainerStyle: {
    backgroundColor: '#EFF3FF',
    fontFamily: 'lato',
  },
  leftMessageTextStyle: {
    fontSize: 16,
    color: '#07144A'
  },
  rightMessageTextStyle: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  leftMessageContainerStyle: {
    backgroundColor: '#FFFFFF',
    height: 61,
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 3,
  },
  rightMessageContainerStyle: {
    backgroundColor: '#5C74DD',
    height: 61,
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 3,
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dayTextStyle: {
    color: '#07144A',
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 22
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
