import { Table,  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowLeft, faArrowRight,  faTrashAlt, } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import useAuth from "../Auth/useAuth"
import {  ComponenteInputBuscar_, } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados

import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import Home from './elementos/home'
import { Toaster, toast } from 'react-hot-toast'

import axios from 'axios';


function Admin() {
    const auth = useAuth()
    const [lista, setLista] = useState([]);

    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })

    try {

        useEffect(() => {
            if (inputBuscar.valido === null ) listContacts()
            if (inputBuscar.valido === 'false') listContacts()

            document.title = 'Contacts'
        }, [inputBuscar])



        const token = localStorage.getItem("token")
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${token}`
                return config
            },
            error => {
                auth.logout()
                return Promise.reject(error)
            }
        )

        const listContacts = async () => {
            axios.post(URL + '/admin/all').then(json => {
                if (json.data.ok)
                    setLista(json.data.data)
                else
                    toast.error(json.data.msg)
            })
        }

        const eliminar = async (numero) => {

            const ok = window.confirm('¿está seguro de eliminar este registro?');
            if (ok) {
                if (numero !== null) {

                    axios.post(URL + '/admin/eliminar', { numero: numero }).then(json => {
                        if (json.data.ok) {
                            setLista(json.data.data)
                            toast.success(json.data.msg)
                        }
                        else
                            toast.error(json.data.msg)
                    })

                }
            }
        }



        const buscar = () => {
            let dir = URL + '/admin/buscar'
            if (inputBuscar.valido === 'true') {
                // console.log('pasa validaciones')

                axios.post(dir, { dato: inputBuscar.campo }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)

                    }
                    else toast.error(json.data.msg)
                })
            }
        }


        const siguiente = () => {
            let  dir = URL + '/admin/sig'

            if (lista.length > 0) {
                const last = lista[lista.length - 1].id
                // console.log(last, lista)
                axios.post(dir, { id: last }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                    } else {
                        toast.error(json.data.msg)
                    }
                })
            }
        }

        const anterior = () => {
            let dir = URL + '/admin/ant'
            if (lista.length > 0) {
                const last = lista[0].id
                console.log(last, lista)
                axios.post(dir, { id: last }).then(json => {
                    if (json.data.ok) {
                        setLista(json.data.data)
                    } else {
                        toast.error(json.data.msg)
                    }
                })
            }
        }

        return (
            <div>
                <div className="hold-transition sidebar-mini" >
                    <div className="wrapper">
                        <Home />
                        <div className="content-wrapper" >
                            <div className="content">
                                <div className="container-fluid pt-1">

                                    <div className='tituloPaginas'>
                                        Contacts
                                    </div >
                                    <div style={{ background: 'white' }}>

                                        <div className='contenedor-cabecera'>


                                        </div>
                                        <div className='contenedor'>

                                            <div className="container-4">
                                                <ComponenteInputBuscar_
                                                    estado={inputBuscar}
                                                    cambiarEstado={setInputBuscar}
                                                    name="inputBuscar"
                                                    ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                    placeholder="Escriba para filtrar ..."
                                                    eventoBoton={buscar}
                                                    // evento2 = {b}
                                                    etiqueta={'Buscar'}
                                                />
                                            </div>

                                            <div className="table table-responsive custom">

                                                <Table className="table table-sm">
                                                    <thead>
                                                        <tr >
                                                            <th className="col-2 ">Numero</th>
                                                            <th className="col-4 ">Nombre</th>
                                                            <th className="col-4 ">Dispositivo</th>
                                                            <th className="col-1 ">Fecha</th>
                                                            <th className="col-1 text-center">Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lista.map((s) => (
                                                            <tr key={s.id}>
                                                                <td className="col-2 ">{s.number}</td>
                                                                <td className="col-4 ">{s.name}</td>
                                                                <td className="col-4 ">{s.headline}</td>
                                                                <td className="col-1 ">{s.date}</td>

                                                                <td className="col-1 largTable">
                                                                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => eliminar(s.number)} className='botonEliminar' />
                                                                </td>

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                {lista.length === 0 &&
                                                    <div className='paciente' style={{ width: '100%' }}><strong>NO SE ENCONTRO NINGUNA INFORMACION</strong></div>
                                                }
                                            </div>
                                        </div>
                                        <div className='contenedor-foot'>
                                            <div className='navegador-tabla'>
                                                <div className='row'>
                                                    <FontAwesomeIcon className='col-auto anterior' icon={faArrowLeft} onClick={() => anterior()} > </FontAwesomeIcon>
                                                    <div className=' col-auto now'>{lista.length > 0 ? lista[lista.length - 1].id + ' - ' + lista[0].id : '0   -   0'}</div>
                                                    <FontAwesomeIcon className='col-auto next' icon={faArrowRight} onClick={() => siguiente()}> </FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='footer-pague'> @COPYRIGHT todos los derechos reservados <spam className='spam-footer'>contacts 2023</spam></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster position='top-right' />
            </div>
        );
    } catch (error) {
        // auth.logout()
    }

}
export default Admin;
