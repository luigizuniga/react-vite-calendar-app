import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { getEnvVariables } from "../helpers";

export const AppRouter = () => {

 // status = 'authenticated'; // 'not-authenticated';
  const authStatus = "authenticated"; 

  const enVar = getEnvVariables();
  console.log(enVar);
  
  
  return (
        <Routes>
            {
                ( authStatus === 'authenticated')
                ?   <Route path="/auth/*" element={ <LoginPage />}/>
                :   <Route path="/*" element={ <CalendarPage />}/>
            }
            <Route path="/*" element={ <Navigate to="/auth/login" /> }/>
        </Routes>
  )
}
