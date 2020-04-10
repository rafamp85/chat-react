import { AGREGAR_ROOM, AUTENTICAR_ROOM } from '../../types';

export default ( state, action ) => {
  switch (action.type) {
    case AGREGAR_ROOM:
      return{
        ...state,
        room: action.payload
      };

    case AUTENTICAR_ROOM:
      return {
        autenticado: action.payload
      };

    default:
      return state;
  }
};
