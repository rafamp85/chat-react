import React, {useState, useContext} from 'react';
import RoomContext from '../context/rooms/roomContext';
import Mensajes from './Mensajes';

const Online = props => props.data.map(m => <li id={m[0]}>{m[1]}</li>);

const Chat = ( {messages, online, socket, setId} ) => {

  // Extraer rooms del state inicial
  const roomContext = useContext( RoomContext );
  const { room, autenticarPersona } = roomContext;

  const [input, setInput] = useState('');

  const handleSend = e => {
    e.preventDefault();

    if ( input !== '' ) {
      socket.emit( 'chat message', input, room );
    }

    setInput('');
  };

  return (
    <section>
      <ul id="messages"><Mensajes datos={messages} /></ul>

      <ul id="online"> &#x1f310; : <Online data={online} /> </ul>

      <div id="sendform">
        <form onSubmit={e => handleSend(e)} style={{display: 'flex'}}>
            <input
              id="m"
              value={input}
              onChange={e=>setInput(e.target.value.trim())}
            />
            <button
              style={{width:'75px'}}
              type="submit"
            >Enviar</button>
            <button
              type="button"
              style={{width:'75px'}}
              onClick={() => setId('')}
            >Salir</button>
        </form>
      </div>
    </section>
  );
}

export default Chat;
