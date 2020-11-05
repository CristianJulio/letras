import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Axios from "axios";
import Info from "./components/Info";
import Error from "./components/Error";
import Spinner from "./components/Spinner";

function App() {
  const [busquedaLetra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [submited, setSubmited] = useState(false);

  // Consultar API's
  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [resultadoLetra, resultadoArtista] = await Promise.all([
        Axios(url),
        Axios(url2),
      ]);

      if (
        resultadoArtista.data.artists !== null &&
        resultadoLetra.data.lyrics !== ""
      ) {
        setError(false);
        setLetra(resultadoLetra.data.lyrics);
        setInfo(resultadoArtista.data.artists[0]);
      } else {
        setError(true);
        setLetra("");
        setInfo({});
      }
      setSubmited(false);
    };
    consultarApiLetra();
  }, [busquedaLetra]);

  return (
    <Fragment>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
        setSubmited={setSubmited}
      />

      <div className="container mt-5">
        {submited ? <Spinner /> : null}
        {submited ? null : (
          <Fragment>
            {error ? <Error mensaje="No hay resultados" /> : null}
            <div className="row">
              <div className="col-md-6">
                <Info info={info} />
              </div>
              <div className="col-md-6">
                <Cancion letra={letra} />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default App;
