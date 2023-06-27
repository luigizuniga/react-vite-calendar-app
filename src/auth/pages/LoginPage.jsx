import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';

import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerRepeatPassword: ''
}

export const LoginPage = () => {
    const { startLogin , startRegister, errorMessage } = useAuthStore();
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerRepeatPassword, onInputChange:onRegisterInputChange} = useForm( registerFormFields );
    
    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    };
   
    const registerOnSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerRepeatPassword ) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        };
        // console.log({ name: registerName, email: registerEmail, password: registerPassword, repeat_password: registerRepeatPassword });
        startRegister({ name: registerName ,email: registerEmail, password: registerPassword });
    };

    useEffect(() => {
      if( errorMessage !== undefined ){
        Swal.fire('Error de Autentificacion', errorMessage, 'error');
      }
    }, [errorMessage])
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="email"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                                autoComplete='on'
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerOnSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                autoComplete='off'
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                autoComplete='off'
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                name="registerRepeatPassword"
                                value={ registerRepeatPassword }
                                onChange={ onRegisterInputChange }
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                autoComplete='off'
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}