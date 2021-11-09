import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { rutas } from "../../../path";
import useAuthContext from '../auth/hooks/useAuthContext';

const ProtectedRoute = (props) => {

    const {isAuthenticated, isAdminAuthenticated} = useAuthContext();
    const {path} = props;

    if (!isAuthenticated && !isAdminAuthenticated) {
        return <Redirect to={rutas.UNAUTHORIZED} />;
    } else if (isAuthenticated) {
        if (path.includes('admin')) {
            return <Redirect to={rutas.UNAUTHORIZED} />;
        }
        return <Route {...props} />;  
    } 

    return <Route {...props} />;
}

export default ProtectedRoute;