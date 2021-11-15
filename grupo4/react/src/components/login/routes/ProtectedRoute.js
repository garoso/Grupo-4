import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { rutas } from "../../../path";
import useAuthContext from '../auth/hooks/useAuthContext';

const ProtectedRoute = (props) => {

    const {isAuthenticated, isAdminAuthenticated} = useAuthContext();
    const {path} = props;
    const admin_routes = [rutas.ADMIN, rutas.PRODUCTOS, rutas.REG_PRODUCTO, rutas.MOD_PRODUCTO];

    if (!isAuthenticated && !isAdminAuthenticated) {
        return <Redirect to={rutas.UNAUTHORIZED} />;
    } else if (isAuthenticated) {
        if (admin_routes.includes(path)) {
            return <Redirect to={rutas.UNAUTHORIZED} />;
        }
        return <Route {...props} />;  
    } 

    return <Route {...props} />;
}

export default ProtectedRoute;