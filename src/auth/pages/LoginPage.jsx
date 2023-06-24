import { useForm } from '../../hooks';

import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPasword: '',
    registerRepeatPasword: ''
}

export const LoginPage = () => {
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPasword, registerRepeatPasword, onInputChange:onRegisterInputChange} = useForm( registerFormFields );
    
    const loginSubmit = ( event ) => {
        event.preventDefault();
        console.log({  email: loginEmail, password: loginPassword });
    };
   
    const registerOnSubmit = ( event ) => {
        event.preventDefault();
        console.log({ name: registerName, email: registerEmail, password: registerPasword, repeat_password: registerRepeatPasword });

        if ( registerPasword !== registerRepeatPasword ) {
            // Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            console.log('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }
    };

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
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                name="registerPasword"
                                value={ registerPasword }
                                onChange={ onRegisterInputChange }
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                name="registerRepeatPasword"
                                value={ registerRepeatPasword }
                                onChange={ onRegisterInputChange }
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
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