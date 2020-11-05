import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({ setBusquedaLetra, setSubmited }) => {
  const [busqueda, setBusqueda] = useState({
    artista: "",
    cancion: "",
  });
  const [error, setError] = useState(false);

  // Extraigo el artista y la canción
  const { artista, cancion } = busqueda;

  const handleFormChange = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // Al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (artista.trim() === "" || cancion.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    // Enviar los valores al componente principal
    setBusquedaLetra(busqueda);
    setSubmited(true);
  };

  return (
    <div className="bg-info">
      {error ? <Error mensaje="Los campos no pueden quedar vacíos" /> : null}
      <div className="container">
        <div className="row">
          <form
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>
              <div className="row">
                <div className="col md-6">
                  <div className="form-group">
                    <label htmlFor="artista">Artista</label>
                    <input
                      type="text"
                      id="artista"
                      name="artista"
                      className="form-control"
                      placeholder="Nombre del Artista"
                      onChange={handleFormChange}
                      value={artista}
                    />
                  </div>
                </div>
                <div className="col md-6">
                  <div className="form-group">
                    <label htmlFor="cancion">Canción</label>
                    <input
                      type="text"
                      id="cancion"
                      name="cancion"
                      className="form-control"
                      placeholder="Nombre de la Canción"
                      onChange={handleFormChange}
                      value={cancion}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

Formulario.propTypes = {
  setBusquedaLetra: PropTypes.func.isRequired,
  setSubmited: PropTypes.func.isRequired,
};

export default Formulario;
