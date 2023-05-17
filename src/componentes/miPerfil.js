

import React from 'react';
import useAuth from "../Auth/useAuth"
import { Button } from 'reactstrap';
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';
import { ComponenteInputUser } from './elementos/input'
import { Modal, ModalBody } from 'reactstrap'
import md5 from 'md5'
import { Toaster, toast } from 'react-hot-toast'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faLock, faUser, faWindowClose, } from '@fortawesome/free-solid-svg-icons';

function MiPerfil() {


    const [lista, setLista] = useState([])

    const [Pass1, setPass1] = useState({ campo: null, valido: null })
    const [Pass2, setPass2] = useState({ campo: null, valido: null })
    const [Pass3, setPass3] = useState({ campo: null, valido: null })
    const [PassDB, setPassDB] = useState({ campo: null, valido: null })

    const [modalPass, setModalPass] = useState(false)
    const auth = useAuth()
    useEffect(() => {
        axios.post(URL + '/miPerfil/ver').then(json => {
            // setData(json.data)
            if (json.data.ok) {
                console.log(json.data.data)
                setPassDB({ campo: json.data.data[0].pass, valido: 'true' })
                setLista(json.data.data)
            } else toast.error(json.data.msg)
        }).catch(() => {
            toast.error('Error en el Servidor')
        })

    }, [])




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

    try {


        const cambiarContraseña = () => {
            let passMd5 = md5(Pass1.campo)
            if (Pass1.valido === 'true' && Pass2.valido === 'true' && Pass3.valido === 'true') {
                if (passMd5 === PassDB.campo) {
                    if (Pass2.campo === Pass3.campo) {
                        axios.post(URL + '/miPerfil/cambiarMiContrasena', { pass1: passMd5, pass2: md5(Pass2.campo) }).then(j => {
                            if (j.data.ok) {
                                setModalPass(false)
                                toast.success(j.data.msg)
                                setPass1({ campo: null, valido: null })
                                setPass2({ campo: null, valido: null })
                                setPass3({ campo: null, valido: null })
                            } else toast.error(j.data.msg)

                        })
                    } else { toast.error('Confirme corresctamente su nueva contraseña'); return }
                } else { toast.error('Su contraseña actual es incorrecto'); return }
            }
            else { toast.error('Complete todos los campos'); return }
        }

        return (
            <div  >
                <div className="hold-transition sidebar-mini">
                    <div className="wrapper">
                        <Home />
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="container-fluid" style={{ height: '520px' }}>
                                    <div className='col-12 tituloPaginas'>
                                        Gestionar mi perfil
                                    </div >


                                    <div className="col-lg-6 col-xl-6 col-md-7 col-sm-8 col-12 bg-white m-auto"  >
                                        {lista.length > 0 && <>
                                            <div className="card-body box-profile row">
                                                <div className="text-center">
                                                    <img className="profile-user-img img-fluid img-circle"
                                                        src="../../dist/img/contact.png"
                                                        alt="SAN PEDRO CLAVER LAJASTAMBO" />
                                                </div>
                                                <div className='usuario  '><strong>{lista[0].nombre + ' ' + lista[0].apellido + ' '}</strong></div>
                                                <div className='usuario m-0 mt-2' style={{fontWeight:'bolder'}}><strong>{lista[0].username}</strong></div>

                                            </div>
                                            <div className="row botonModal">
                                                <Button className="btn-restaurar col-auto" onClick={() => setModalPass(true)}  >
                                                    <FontAwesomeIcon className='btn-icon-eliminar' icon={faLock}></FontAwesomeIcon>Recet Password
                                                </Button>
                                            </div>
                                        </>
                                        }


                                        <Modal isOpen={modalPass}>
                                            <div className='titloFormulario' >
                                                CAMBIAR CONTRASEÑA
                                            </div>
                                            <ModalBody>
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">

                                                    <ComponenteInputUser
                                                        estado={Pass1}
                                                        cambiarEstado={setPass1}
                                                        name="pass1"
                                                        placeholder="CONTRASEÑA ACTUAL"
                                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                        etiqueta='Contrasela Actual'
                                                        campoUsuario={true}
                                                        msg='Complete este campo'
                                                    /></div>
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">

                                                    <ComponenteInputUser
                                                        estado={Pass2}
                                                        cambiarEstado={setPass2}
                                                        name="pass1"
                                                        placeholder="NUEVA CONTRASEÑA"
                                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                        etiqueta='Nueva Contraseña'
                                                        campoUsuario={true}
                                                        msg='Complete este campo'
                                                    /></div>
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">

                                                    <ComponenteInputUser
                                                        estado={Pass3}
                                                        cambiarEstado={setPass3}
                                                        name="pass1"
                                                        placeholder="CONFIRMA CONTRASEÑA"
                                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                        etiqueta='Confirmar contraseña'
                                                        campoUsuario={true}
                                                        msg='Complete este campo'

                                                    />
                                                </div>

                                            </ModalBody>
                                            <div className="row botonModal">
                                                <Button className="btn-restaurar col-auto" onClick={() => setModalPass(false)}  >
                                                    <FontAwesomeIcon className='btn-icon-eliminar' icon={faWindowClose}></FontAwesomeIcon>Cancel
                                                </Button>
                                                <Button className="btn-nuevo col-auto" onClick={() => cambiarContraseña()}>
                                                    <FontAwesomeIcon className='btn-icon-nuevo' icon={faEdit}></FontAwesomeIcon>Recet password
                                                </Button>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className='footer-pague'> @COPYRIGHT todos los derechos reservados <spam className='spam-footer'>contact 2023</spam></div>

                            </div>
                        </div>
                    </div>
                </div>

                <Toaster position='top-right' />

            </div >

        );
    } catch (error) {
        // auth.logout()
    }

}
export default MiPerfil;
