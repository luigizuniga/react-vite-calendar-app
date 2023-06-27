import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onLogin , onLogout , clearErrorMessage , onChecking } from "../store";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();
   
    const startLogin = async({ email, password }) => {
        dispatch(onChecking());
        try {
            // const { data } = await calendarApi.post('/auth',{ email, password });
            const { data }  = await calendarApi.post("http://localhost:4000/api/auth",{ email, password });
            console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); 
            dispatch(onLogin({ name: data.name , uid: data.uid }));
        } catch (error) {
            dispatch(onLogout('Credenciales Incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        };
    };

    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const { data }  = await calendarApi.post("http://localhost:4000/api/auth/new",{ name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());       
            dispatch(onLogin({ name: data.name , uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(errorMessage.data?.msg || '---' ,'error'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        };
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch( onLogout() );
        try{
            const { data }  = await calendarApi.post("http://localhost:4000/api/auth/renew");
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name , uid: data.uid }));
        }catch(error){
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    return {
        // * Propiedades
        errorMessage,
        status,
        user,

        // * Metodos
        startLogin,
        startRegister,
        checkAuthToken,
    }
};

export default useAuthStore;