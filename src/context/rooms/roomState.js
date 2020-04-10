import React, { useReducer } from 'react';
import roomReducer from './roomReducer';
import roomContext from './roomContext';

import { AGREGAR_ROOM, AUTENTICAR_ROOM } from '../../types';

const RoomState = props => {
  const initialState = {
    room: '',
    autenticado: false
  };

  const [ state, dispatch ] = useReducer( roomReducer, initialState );

  const agregarRoom = nuevoRoom => {
    dispatch({
      type: AGREGAR_ROOM,
      payload: nuevoRoom
    });
  };

  const autenticarPersona = autentica => {
    dispatch({
      type: AUTENTICAR_ROOM,
      payload: autentica
    });
  }

  return (
    <roomContext.Provider
      value={{
        autenticado: state.autenticado,
        room: state.room,
        agregarRoom,
        autenticarPersona
      }}
    >
      {props.children}
    </roomContext.Provider>
  );

};

export default RoomState;
