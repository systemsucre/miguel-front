import useAuth from "../../Auth/useAuth";
import { Link } from "react-router-dom";
import React from 'react';
// import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLayerGroup,  faPowerOff, } from '@fortawesome/free-solid-svg-icons';


function Home() {
    const auth = useAuth()

    // const [dropdown, setDropDown] = useState(false)

    // const abrirMenu = () => {
    //     setDropDown(!dropdown)
    // }


    const salir = () => {
        let ok = window.confirm('Cerrar Sesion ?')
        if (ok) {
            auth.logout()
        }
    }

    let tam = window.innerWidth

    return (
        <>
            <div>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ height: '60px' }}>
                    <ul className="navbar-nav" style={{ paddingTop: '10px' }}>
                        <li key="uniqueId1" className="nav-item">
                            <p className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></p>
                        </li>
                        <li key="uniqueId2" className="nav-item d-none d-sm-inline-block">
                            <Link to="/" className="nav-link">Inicio</Link>
                        </li>
                    </ul>

                </nav>
                <aside className="main-sidebar sidebar-dark-primary " style={{ height: '100%' }}>
                    {/* <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon> */}
                    {tam < 700 &&
                        <p className="nav-link mt-2" style={{ color: 'white' }} data-widget="pushmenu" role="button"> <i className="fas fa-bars"></i> </p>
                    }

                    <div className="brand-link pb-0" >
                        <div className="text-center">
                            <img src="dist/img/contact.png" alt="perfil" className="img-circle elevation-4" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <div className="text-center">
                            <p className="brand-text font-weight-light" style={{ fontSize: '14px' }}>{localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido')}</p>
                            <p><small className="brand-text font-weight-light" style={{ fontSize: '14px' }}>{localStorage.getItem('rol')}</small></p>
                            <Link to={'/miPerfil'}>  <p className="brand-text font-weight-light" style={{ fontSize: '14px', color: 'white' }}>Gestionar mi Perfil</p></Link>
                        </div>
                    </div>

                    <div className="sidebar">
                        <nav className="mt-1">

                            <div>
                                <ul className="nav nav-pills nav-sidebar flex-column " data-widget="treeview" role="menu" data-accordion="false">
                                    {(parseInt(localStorage.getItem('numRol')) === 1) && <>


                                        <li key="uniqueId1s0sss" className="nav-item">
                                            <Link to='/admin' className="nav-link">
                                                <FontAwesomeIcon icon={faLayerGroup} className='nav-icon'></FontAwesomeIcon>
                                                <p>Contactos</p>
                                            </Link>
                                        </li>

                                    </>
                                    }

                                    <br></br>
                                    <li key="uniqueId10gh" className="nav-item " onClick={salir}>
                                        <Link to='#' className="nav-link" >
                                            <FontAwesomeIcon icon={faPowerOff} className='nav-icon' ></FontAwesomeIcon >
                                            <p>Cerrar Sesion</p>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </div>
                </aside>
            </div >

        </>
    )
}
export default Home;