import { number, string } from "prop-types";
import { useState, useEffect, useDebugValue } from "react";
import CerrarModalBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  const [enviar, setEnviar] = useState(false)

  const [errores, setErrores] = useState({
    nombre: "",
    cantidad: "",
    categoria: ""
  });

  const [datos, setDatos] = useState({
    nombre: '',
    cantidad: 0,
    categoria: ''
  })

  useEffect( () => {
    if( Object.keys(gastoEditar).length > 0 ){
        setDatos({
            nombre:gastoEditar.nombre,
            cantidad:Number(gastoEditar.cantidad),
            categoria:gastoEditar.categoria
        })
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }
  }, [])

  const cerrarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };


  const handleChange = e => {
    const { name, value } = e.target;
    
    setDatos({
        ...datos,
        [name]: value,
      });

      switch (name) {
        case 'nombre':
          errores.nombre =
            value.length <=0  ? '¡Ingresa un nombre!' : '';
          break;
        case 'cantidad':
          errores.cantidad =
            value <= 0
              ? '¡Ingresa una número mayor a 0!'
              : '';
          break;
        
        case 'categoria':
          errores.categoria =
            value.length <= 0
              ? '¡Selecciona una categoria!'
              : '';
          break;
        default:
          break;
      }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviar(true);
    
    const { nombre, cantidad, categoria } = datos;

    if (
      nombre !== "" &&
      cantidad !== 0 &&
      categoria !== ""

    ) {
        console.log("¡Registro ingresado!");
        guardarGasto({nombre,cantidad,categoria,id,fecha})
    } else {

        console.log("¡Ooh oh, ha ocurrido un error!");
        
    }

  };

  

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModalBtn} alt="cerrar modal" onClick={cerrarModal} />
      </div>
      <div className="contenedor-modal contenedor sombra">
        <form
          onSubmit={handleSubmit}
          className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        >
          <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
          <div className="campo">
            <label htmlFor="nombre">
              Nombre Gasto{" "}
              {(enviar && !datos.nombre) || errores.nombre !='' ? 
              (<Mensaje>{errores.nombre !='' ? (errores.nombre) : ('¡Ingresa un nombre!')}</Mensaje>) : ('')}

            </label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Añade el nombre"
              value={datos.nombre}
              onChange={handleChange}
              onBlur={() => {if(!datos.nombre){setErrores({...errores, nombre:'¡Ingresa un nombre!'})}}}
                         
            />
          </div>
          <div className="campo">
            <label htmlFor="cantidad">
              Cantidad{" "}
              {(enviar && !(datos.cantidad)) || errores.cantidad !='' ? 
              (<Mensaje>{errores.cantidad !='' ? (errores.cantidad) : ('¡Ingresa un número mayor a 0!')}</Mensaje>) : ('')}
            </label>
            <input
              id="cantidad"
              name="cantidad"
              type="number"
              placeholder="Añade la cantidad"
              value={datos.cantidad}
              onChange={handleChange}
              onBlur={() => {if(!datos.cantidad){setErrores({...errores, cantidad:'¡Ingresa un número mayor a 0!'})}}}
            />
          </div>
          <div className="campo">
            <label htmlFor="categoria">
              Categoria{" "}
              {(enviar && !datos.categoria) || errores.categoria != '' ? 
              (<Mensaje>{errores.categoria != '' ? (errores.categoria) : ('¡Selecciona una categoria!')}</Mensaje> ) : ''}
              
            </label>
            <select
              id="categoria"
              name="categoria"
              value={datos.categoria}
              onChange={handleChange}
              onBlur={() => {if(!datos.categoria){setErrores({...errores, categoria:'¡Selecciona una categoria!'})}}}
            >
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>
          <input type="submit" value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
