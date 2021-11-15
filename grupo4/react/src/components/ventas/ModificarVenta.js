import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const ModificarVenta = () => {

    function getDate(fecha) {        
        const date = new Date(Date.parse(fecha));
        console.log(date)
        const d = date.getDate();
        const m = date.getMonth(); 
        const y = date.getFullYear();
        return new Date(`${d}-${m}-${y}`);
    }
    
    const estadoVenta = [
        {value:0, label:"En proceso"},
        {value:1, label:"Cancelada"},
        {value:2, label:"Entregada"}
    ]

    const [ventas, setVentas] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [vendedor, setVendedor] = useState("");

    useEffect(() => {
        getVentas();
        getVendedores();
    }, []);

    const showing = false;

    const getVentas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/ventas/get');
            setVentas(response.data.ventas);
        } catch (error) {
            console.log("Ha ocurrido un error");
        }
    }

    const getVendedores = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/vendedores');
            setVendedores(response.data.users);
        } catch (error) {
            console.log("Ha ocurrido un error");
        }
    }

    const getInitialState = () => {
        const value = "0000";
        return value;
    };
    
    const [venta, setVenta] = useState(getInitialState);
    const [startDate, setStartDate] = useState(new Date());
    const [cantidad, setCantidad] = useState();
    const [cedula_cliente, setCedula] = useState(0);
    const [nombre_cliente, setNombre] = useState("");
    const [estado, setEstado] = useState({});

    const selectVenta = (e) => {    
        const venta = JSON.parse(e.target.value); 
        console.log(venta);
        setVenta(venta);
        setCantidad(venta.cantidad);
        setCedula(venta.cedula_cliente);
        setNombre(venta.nombre_cliente);
        setStartDate(new Date());
        setVendedor(venta.email_vendedor);
        setEstado(estadoVenta[venta.estado]);
    };

    const selectVendedor = (e) => {    
        const vendedor = e.target.value; 
        setVendedor(vendedor);
    };

    const changeCantidad = (e) => {
        setCantidad(e.target.value);
    }

    const changeCedula = (e) => {
        setCedula(e.target.value);
    }

    const changeNombre = (e) => {
        setNombre(e.target.value);
    }
    
    const selectDate = (fecha) => {
        setStartDate(new Date(Date.parse(fecha)));
    }

    const selectEstado = (estado) => {
        setEstado(estado);
    }

    return (
        <div class="modal-dialog text-center mt-2">
            <div class="col-sm-15 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MlkOcfm3WFyiWvOGuk0U0ZpsYaTcjNfjzF60r5-jVk4a-W-N1IXfcLZLwna6ngmfDx8&usqp=CAU" alt="icon" />
                    </div>
                    <form class="row g-3" action="http://localhost:5000/api/ventas/update" method="post">
                        <h4 class="col-12">Modificar venta: </h4>                          
                        <div class="col-md-6 mt-2">
                            <label for="uuid" class="form-label">Identificador venta:</label>
                            <select class="form-select" name="id" onChange={selectVenta}> 
                                <option value={null}></option>                 
                                {
                                    ventas.map((venta) => (
                                        <option value={JSON.stringify(venta)}>{venta.id}</option>
                                    ))                    
                                }
                            </select>
                            <input type="text" style={{ display: (showing ? 'block' : 'none') }} name="uuid" value={venta.id}></input>
                            <input type="text" style={{ display: (showing ? 'block' : 'none') }} name="valor_producto" value={venta.valor_producto}></input>
                        </div> 
                        <div class="col-md-6 mt-2">
                            <label for="estado" class="form-label">Estado:</label>
                            <Select class="form-select" id="estado" name="estado" options={estadoVenta} value={estado} onChange={selectEstado} /> 
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="cantidad" class="form-label">Cantidad:</label>
                            <input type="number" class="form-control" id="cantidad" name="cantidad" value={cantidad} onChange={changeCantidad}/>
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="fecha" class="form-label">Fecha de venta:</label>
                            <DatePicker class="form-control" id="fecha" name="fecha" selected={startDate} dateFormat="dd-MM-yyyy" onChange={selectDate} />
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="cedula" class="form-label">Cédula cliente:</label>
                            <input type="number" class="form-control" id="cedula_cliente" name="cedula_cliente" value={cedula_cliente} onChange={changeCedula}/>
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="nombre" class="form-label">Nombre cliente:</label>
                            <input type="text" class="form-control" id="nombre_cliente" name="nombre_cliente" value={nombre_cliente} onChange={changeNombre}/>
                        </div>                
                        <div class="col-12 mt-2">
                            <label for="vendedor" class="form-label">Vendedor:</label>
                            <select class="form-select" name="vendedor" value={vendedor} onChange={selectVendedor}> 
                                <option value={null}></option>                 
                                {
                                    vendedores.map((vendedor) => (
                                        <option value={vendedor.email}>{vendedor.email}</option>
                                    ))                    
                                }
                            </select>
                            <input type="text" style={{ display: (showing ? 'block' : 'none') }} name="email_vendedor" value={vendedor}></input>
                        </div> 
                        <div class="col-12 mt-4 mb-4">
                            <button class="btn btn-dark btn-block" id="post-btn" type="submit">Modificar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>    
    );
}

export default ModificarVenta;