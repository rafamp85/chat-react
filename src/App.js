import React, { useState, useEffect } from 'react';
import RoomState from './context/rooms/roomState';
import Login from './components/Login';
import Chat from './components/Chat';
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';


export default () => {
  const [id, setId] = useState('');

  const [socket] = useSocket('https://open-chat-naostsaecf.now.sh');
  socket.connect();

  const [messages, setMessages] = useImmer([]);
  const [online, setOnline] = useImmer([]);

  useEffect(()=>{
    socket.on( 'message que', (nick, message) => {
      console.log('Message Que');
      setMessages( draft => {
        draft.push([ nick, message ])
      })
    });

    socket.on( 'update', message => setMessages(draft => {
      console.log('Update');
      draft.push([ '', message ]);
    }));

    socket.on( 'people-list', people => {
      console.log('People list');
      let newState = [];
      for( let person in people ) {
        newState.push([ people[person].id, people[person].nick ]);
      }
      setOnline( draft => { draft.push(...newState) });
      console.log(online)
    });

    socket.on( 'add-person', ( nick, id ) => {
      console.log('Add Person');
      setOnline( draft => {
        draft.push([ id, nick ])
      })
    });

    socket.on( 'remove-person', id => {
      console.log('Remove Person');
      setOnline( draft => draft.filter(m => m[0] !== id))
    });

    socket.on('chat message', (nick, message)=>{
      console.log('Chat message');
      setMessages(draft => { draft.push([nick,message]) })
    });
  },0);

  return (
    <RoomState>
      {id ? (
       <Chat messages={messages} socket={socket} online={online} setId={setId}/>
      ) : (
       <Login socket={socket} setId={setId}/>
      )}
    </RoomState>
  )
};
