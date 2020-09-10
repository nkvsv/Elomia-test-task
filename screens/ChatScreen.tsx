import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native';
import {AxiosResponse} from 'axios';
import { RootStackParamList } from '../types';
import { getMessage, ApiCallData } from '../api/api'

export interface FutureMessageParams {
  ip: string,
  data: string
}

export interface s {}

export default function ChatScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const currentSentMessageParams = useState({})

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! Please send your message :)',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Elomia',
          avatar: 'https://elomia.com/assets/avatar_450.jpg',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    getMessage().then((response) => {
      const newMessageText = `IP: ${response?.data.ip}, time: ${response?.requestResponseTimeout}, text: ${messages[0].text}`
      messages[0].text = newMessageText

      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    })    
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
