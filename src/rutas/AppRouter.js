import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Check from './check';
import PublicRoute from './publicRoute'
import Formulario from '../login/login'
import Cliente from '../login/cliente'
import React from 'react';


// import Nav from '../componentes/home';
import Admin from '../componentes/admin'
import Contactos from '../componentes/contactos'
import PlusContact from '../componentes/PlusContact'
import MiPerfil from '../componentes/miPerfil';
import App from '../componentes/stripe/App'



import { useEffect } from "react";


import E500 from './e500'

import useAuth from "../Auth/useAuth";
import { TIEMPO_INACTIVO } from "../Auth/config";

export default function AppRouter() {

  const auth = useAuth()

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      const inter = setInterval(() => {
        const tiempo1 = localStorage.getItem('tiempo')
        if (!tiempo1 || localStorage.getItem('token') == null) { auth.logout() } // sino existe el cookie redireccionamos a la ventana login
        const tiempo2 = new Date().getMinutes()
        let dif = 0
        let aux1 = 0
        let aux2 = 0
        const maximo = 59
        const inicio = 0
        if (tiempo1 === tiempo2) {
          dif = 0
        }
        if (tiempo2 > tiempo1) {
          dif = tiempo2 - tiempo1
        } if (tiempo1 > tiempo2) {
          aux1 = maximo - tiempo1  //  59 - 50 = 10
          aux2 = tiempo2 - inicio  //  5 - 0  = 5
          dif = aux2 - aux1
        }
        if (dif >= TIEMPO_INACTIVO) {  // el tiempo de abandono tolerado, se define en el archivo varEntorno en unidades de tiempo MINUTOS
          auth.logout()
        }
      }, 10000);
      return inter;
    }

  }, [auth])

  const handleClick = () => {
    localStorage.setItem('tiempo', new Date().getMinutes())

  }

  const handleKeyPress = () => {
    localStorage.setItem('tiempo', new Date().getMinutes())
  }
  return (

    <BrowserRouter>
      <div onClick={handleClick} onKeyPress={handleKeyPress} >
        <Switch>
          <PublicRoute exact path="/" component={Cliente} />
          <PublicRoute exact path="/cts" component={Formulario} />
          <Check exact path='/contactos' component={Contactos} />
          <Check exact path='/stripe' component={App} />
          <Check exact path='/usuarioPlus' component={PlusContact} />
          <Check exact path='/admin' component={Admin} />
          <Check exact path='/miPerfil' component={MiPerfil} />
          <Route exact path="*" component={E500} />

        </Switch>
      </div>
    </BrowserRouter>

  )
}

