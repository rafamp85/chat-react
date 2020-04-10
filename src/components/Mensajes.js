import React from 'react';

const Mensajes = ({ datos }) => {

  return (
    <div>
      { datos.map( data =>
          data[0] !== '' ? (
            <li>
              <strong>{data[0]}</strong> : <div className="innermsg">{data[1]}</div>
            </li>
          )
          : ( <li className="update">{data[1]}</li> )
      )}
    </div>
  );

};

export default Mensajes;
