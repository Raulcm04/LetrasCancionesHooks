import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';

import Cancion from './components/Cancion.js'
import Informacion from './components/Informacion';

function App() {

  //utlizar useState
  const [artista, agregarArtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] = useState({});

  //consultar aPi de las letas
  const consultarAPILetra = async (busqueda) => {

    const url = `https://api.lyrics.ovh/v1/${busqueda.artista}/${busqueda.cancion}`;
    const resultado = await axios(url);

    //agregarArtista que se buscó
    agregarArtista(busqueda.artista);
    
    //almacenar la letra en el state
    agregarLetra(resultado.data.lyrics)
  }

  //consultar api de la banda
  const consultarAPIinfo = async () => {
    if (artista) {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await axios(url);
      agregarInfo(resultado.data.artists[0])
    }
  }



  useEffect(() => {
    consultarAPIinfo();
  }, [artista])

  return (
    <Fragment>
      <Formulario
        consultarAPILetra={consultarAPILetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {/* <p>artista</p> */}
            <Informacion
              info={info}
            />
          </div>
          <div className="col-md-6">
            {/* <p>letra</p> */}
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
