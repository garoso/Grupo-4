import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Venta = () => {

    const [ventas, setVentas] = useState([]);
    const [ventas2, setVentas2] = useState([]);

    const [id, setID] = useState("");
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ventas/get');
            setVentas(response.data.ventas);
            setVentas2(response.data.ventas);
        } catch (error) {
            console.log("Ha ocurrido un error");
        }
    };

    const buscarVenta = (e) => {          
        ventas.forEach((venta) => {
            if (venta.id.toString().includes(id)) {
                setVentas2([venta]);
            }
        })      
    }

    const buscarCedula = (e) => {          
        ventas.forEach((venta) => {
            if (venta.cedula_cliente.toString().includes(cedula)) {
                setVentas2([venta]);
            }
        })      
    }

    const buscarNombre = (e) => {          
        ventas.forEach((venta) => {
            if (venta.nombre_cliente.toString().toLowerCase().includes(nombre)) {
                setVentas2([venta]);
            }
        })      
    }

    const changeID = (e) => {
        let id = e.target.value;
        setID(id);
        if (id.toString() === ""){
            setVentas2(ventas);
        }
    }

    const changeCedula = (e) => {
        let cedula = e.target.value;
        setCedula(cedula.toString().toLowerCase());
        if (id.toString() === ""){
            setVentas2(ventas);
        }
    }

    const changeNombre = (e) => {
        let nombre = e.target.value;
        setNombre(nombre.toLowerCase());
        if (id.toString() === ""){
            setVentas2(ventas);
        }
    }

    return (
        <div>
            <div class="form-inline offset-sm-1 mt-5">
                <h5 class="mg-l text-left mb-2">Buscar por identificador:</h5> 
                <input class="form-control mr-sm-2 ml-3" name="uuid" type="number" placeholder="Identificador" aria-label="UUID" onChange={changeID}/>
                <button class="btn btn-outline-success my-2 my-sm-0" onClick={buscarVenta}>Buscar</button>
            </div>
            <div class="form-inline offset-sm-1 mt-4">
                <h5 class="mg-l text-left mb-2">Buscar por cédula:</h5> 
                <input class="form-control mr-sm-2 ml-4" name="cedula" type="text" placeholder="Cédula del cliente" aria-label="Cédula del cliente" onChange={changeCedula}/>
                <button class="btn btn-outline-success my-2 my-sm-0" onClick={buscarCedula}>Buscar</button>
            </div>
            <div class="form-inline offset-sm-1 mt-4">
                <h5 class="mg-l text-left mb-2">Buscar por nombre:</h5> 
                <input class="form-control mr-sm-2 ml-4" name="nombre" type="text" placeholder="Nombre del cliente" aria-label="Nombre del cliente" onChange={changeNombre}/>
                <button class="btn btn-outline-success my-2 my-sm-0" onClick={buscarNombre}>Buscar</button>
            </div>
            <div class="col-sm-10 offset-sm-1 p-4 rounded">                
                <h2 class="mg-l text-left mb-2">Ventas realizadas:</h2> 
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Identificador</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Valor Unitario</th>
                        <th scope="col">Cédula Cliente</th>
                        <th scope="col">Nombre Cliente</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            ventas2.map((venta) => (                                
                                <tr>
                                    <td>{venta.id}</td>
                                    <td>{venta.cantidad}</td>
                                    <td>{venta.id_producto}</td>
                                    <td>{venta.descripcion_producto}</td>
                                    <td>{venta.valor_producto}</td>
                                    <td>{venta.cedula_cliente}</td>
                                    <td>{venta.nombre_cliente}</td>
                                    <td>{venta.email_vendedor}</td>
                                    {venta.estado === 0 && <td>En proceso</td>}
                                    {venta.estado === 1 && <td>Cancelada</td>}
                                    {venta.estado === 2 && <td>Entregada</td>}
                                </tr>
                            )) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Venta;