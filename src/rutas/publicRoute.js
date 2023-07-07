import { Route, Redirect } from "react-router-dom"
import React from 'react';
import useAuth from "../Auth/useAuth"



export default function PublicRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    let url = null

    if (parseInt(localStorage.getItem('numRol')) === 1) {
        url = "/admin"
    }

    if (parseInt(localStorage.getItem('numRol')) === 2) {
        url = "/contactos"
    }



    return (
        <Route {...rest}>
            {auth.isLogged() ? (
                window.location.href = url
                // <Redirect to = {url} />
            ) : (
                <Component />
            )}
        </Route>
    );
} 