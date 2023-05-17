import { useState, useEffect } from "react";
import useAuth from "../Auth/useAuth";
import md5 from 'md5'
import { Link } from "react-router-dom";
import React from 'react';
import { InputUsuario } from '../componentes/elementos/input';
import axios from 'axios'
import { URL, INPUT } from '../Auth/config'
import { Toaster, toast } from 'react-hot-toast'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";


function Formulario() {
  useEffect(() => {
    listarEmpresa()
  }, [])

  const [usuario, setUsuario] = useState({ campo: '', valido: null })
  const [password, setPassword] = useState({ campo: '', valido: null })
  const [correo, setCorreo] = useState({ campo: null, valido: null })
  const [clave, setClave] = useState({ campo: null, valido: null })
  const [pass1, setPass1] = useState({ campo: null, valido: null })
  const [pass2, setPass2] = useState({ campo: null, valido: null })

  const [mensaje, setMensaje] = useState('')
  const [login, setLogin] = useState(true)
  const [recover1, setRecover1] = useState(false)
  const [codigo, setCodigo] = useState(false)
  const [recover2, setRecover2] = useState(false)


  const expresiones = {
    // usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    usuario: /^[a-zA-ZÑñ]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,30}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }
  const [empresa, setempresa] = useState([])

  const auth = useAuth()




  const listarEmpresa = async () => {
    try {
      axios.get(URL + '/public/empresa').then(json => {
        if (json.data.ok)
          setempresa(json.data.data)
        else toast.error(json.data.msg)
      })
    }
    catch (error) {

    }
  }


  const iniciarSesion = async () => {

    if ((usuario.valido === 'true' && password.valido === 'true')) {
      const pass = md5(password.campo)
      const user = usuario.campo;

      try {
        await axios.get(URL, {
          params: {
            "user": user,
            "pass": pass
          }
        }).then(json => {

          if (json.data.ok) {
            localStorage.setItem('tiempo', new Date().getMinutes())
            const token = json.data.token
            localStorage.setItem("token", token)
            localStorage.setItem('username', json.data.username)
            localStorage.setItem('nombre', json.data.nombre)
            localStorage.setItem('apellido', json.data.apellido)
            localStorage.setItem('rol', json.data.rol)
            localStorage.setItem('numRol', json.data.numRol)
            localStorage.setItem('url', window.location.href)
            auth.login('ok')
            toast.success(json.data.msg)
          }
          else
            toast.error(json.data.msg)
        })
      } catch (error) {
        toast.error('Error, intente mas tarde')
      }
    } else {
      toast.error('Introduzca sus datos')
    }
  }


  return (
    <div className="hold-transition login-page mt-0">


      <div className="login-box mt-0">

        <div className="card card-outline card-primary mt-0">
          <div className="card-header text-center">
            <h4 className="login-box-msg"> <p>BD Contact</p></h4>
            <p className='text-danger' >{mensaje}</p>
          </div>
          <div className=" card-body">
            <p className="login-box-msg">inicie session</p>
            <div className="col-12 mb-3">
              <InputUsuario
                estado={usuario}
                cambiarEstado={setUsuario}
                tipo="text"
                name="user"
                placeholder="Usuario"
                ExpresionRegular={expresiones.usuario}
                span="fas fa-envelope"
              />
            </div>
            <div className="col-12 mb-3">
              <InputUsuario
                estado={password}
                cambiarEstado={setPassword}
                tipo="password"
                name="pass"
                placeholder="Contraseña"
                ExpresionRegular={expresiones.password}
                span="fas fa-lock"
              />
            </div>
            <div className=" col-12 ">
              <Link
                to='#'
                onClick={iniciarSesion}
                className="btn btn-primary btn-block"
              >Ingresar
              </Link>
            </div>

          </div>
        </div>
      </div>


      <Toaster position='top-center' />
    </div>
  );
}
export default Formulario;
