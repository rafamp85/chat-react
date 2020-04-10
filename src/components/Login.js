import React, { useState, useContext } from 'react';
import RoomContext from '../context/rooms/roomContext';

const Login = ({socket , setId}) => {

  // Extraer rooms del state inicial
  const roomContext = useContext( RoomContext );
  const { room, agregarRoom } = roomContext;

  const [nameInput, setNameInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert("El nombre es obligatorio");
    }
    setId(nameInput);
    socket.emit("join", nameInput, room);
  };

  return(
    <div className="container">
        <header>
          <h1>RM Chat</h1>

          <div className="contenido-principal contenido">
            <h2>Bienvenid@</h2>
            <form onSubmit={event => handleSubmit(event)}>
              <input
                type = "text"
                id="name"
                className = "u-full-width"
                onChange={e => setNameInput(e.target.value.trim())}
                required
                placeholder="Cual es tu Nombre..."
              />

              <input
                type = "text"
                id="room"
                className = "u-full-width"
                onChange={e => agregarRoom(e.target.value.trim())}
                placeholder="Nombre de tu sala..."
              />

              <button
                type="submit"
                className = "button-primary u-full-width"
              >Entrar</button>
            </form>
          </div>
        </header>
    </div>
  )
}

export default Login;
