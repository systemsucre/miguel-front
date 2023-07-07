import { useState, useEffect } from "react";
import useAuth from "../Auth/useAuth";
import { Link } from "react-router-dom";
import React from 'react';
import { InputUsuario } from '../componentes/elementos/input';
import axios from 'axios'
import { URL, } from '../Auth/config'
import { Toaster, toast } from 'react-hot-toast'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { gapi } from 'gapi-script'

function Cliente() {


  const auth = useAuth()

  let idcliente = '760516385533-gnatcva0ggpuluvbljd72rf4dhf1sjpc.apps.googleusercontent.com'

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: idcliente,
      })
    }
    gapi.load("client:auth2", start)
  })






  const responseGoogle = (response) => {

    // console.log(response.profileObj, 'cleinte data')
    // console.log(response.profileObj.email, 'email')
    // console.log(response.profileObj.familyName, 'nombre')
    // console.log(response.profileObj.givenName, 'Apellidos')

    try {
      axios.get(URL, {
        params: {
          "email": response.profileObj.email,
          "nombre": response.profileObj.givenName          ,
          "apellidos": response.profileObj.familyName
        }
      }).then(json => {

        if (json.data.ok) {
          localStorage.setItem('tiempo', new Date().getMinutes())
          const token = json.data.token
          localStorage.setItem("token", token)
          localStorage.setItem('nombre', json.data.nombre)
          localStorage.setItem('apellido', json.data.apellido)
          localStorage.setItem('rol', json.data.rol)
          localStorage.setItem('numRol', json.data.numRol)
          localStorage.setItem('email', response.profileObj.email)
          localStorage.setItem('estado', json.data.estado)
          auth.login('ok')
          toast.success(json.data.msg)
        }
        else
          toast.error(json.data.msg)
      })
    } catch (error) {
      toast.error('Error, intente mas tarde')
    }

  }

  const responsefail = (response) => {
    console.log(response, 'Error')
  }

  const logout = (response) => {
    console.log(response)
  }

  return (
    <div className="hold-transition login-page mt-0">

      <GoogleLogin
        clientId={idcliente}
        buttonText="Inicie sesion con su cuenta Google"
        onSuccess={responseGoogle}
        onFailure={responsefail}
        cookiePolicy={'single_host_policy'}
      />

      {/* <GoogleLogout
        clientId={idcliente}
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout> */}

      <Toaster position='top-center' />
    </div>
  );
}
export default Cliente;
