import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegistarVenta = () => {

    const [productos, setProductos] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [vendedor, setVendedor] = useState("");
    const [startDate, setStartDate] = useState(new Date());


    useEffect(() => {
        getProductos();
        getVendedores();
    }, []);

    const showing = false;

    const getProductos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/productos/get');
            setProductos(response.data.products);
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
    
    const [producto, setProducto] = useState(getInitialState);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");


    const selectProduct = (e) => {    
        const product = JSON.parse(e.target.value); 
        setDescripcion(product.descripcion);
        setNombre(product.name);
        setProducto(product);
    };

    const selectVendedor = (e) => {    
        const vendedor = e.target.value; 
        setVendedor(vendedor);
    };

    return (
        <div class="modal-dialog text-center mt-2">
            <div class="col-sm-15 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src="https://media.istockphoto.com/vectors/cheers-with-beer-icon-handdrawn-vector-id1151319903?k=20&m=1151319903&s=170667a&w=0&h=n_90_xf2n85by03GIMHcfASRKMHI5mJqSLyoMg6foVw=" alt="icon" />
                    </div>
                    <form class="row g-3" action="http://localhost:5000/api/ventas/register" method="post">
                        <h4 class="col-12">Registrar venta: </h4>                          
                        <div class="col-md-6 mt-2">
                            <label for="uuid" class="form-label">Identificador:</label>
                            <select class="form-select" name="id" onChange={selectProduct}> 
                                <option value={null}></option>                 
                                {
                                    productos.map((product) => (
                                        <option value={JSON.stringify(product)}>{product.id}</option>
                                    ))                    
                                }
                            </select>
                            <input type="text" style={{ display: (showing ? 'block' : 'none') }} name="id_producto" value={producto.id}></input>
                            <input type="text" style={{ display: (showing ? 'block' : 'none') }} name="valor_producto" value={producto.valor}></input>
                            <input type="text" style={{ display: (showing ? 'block' : 'none') }} name="descripcion_producto" value={producto.descripcion}></input>
                        </div> 
                        <div class="col-md-6 mt-2">
                            <label for="productName" class="form-label">Nombre producto:</label>
                            <input type="text" class="form-control" id="productName" name="productName" value={nombre}/>
                        </div>
                        <div class="col-12">
                            <label for="descripcion" class="form-label">Descripción del producto:</label>
                            <input type="text" class="form-control" id="descripcion" name="descripcion"  value={descripcion}/>
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="cantidad" class="form-label">Cantidad:</label>
                            <input type="number" class="form-control" id="cantidad" name="cantidad"/>
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="fecha" class="form-label">Fecha de venta:</label>
                            <DatePicker class="form-control" id="fecha" name="fecha" selected={startDate} dateFormat="dd-MM-yyyy" onChange={(date) => setStartDate(date)} />
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="cedula" class="form-label">Cédula cliente:</label>
                            <input type="number" class="form-control" id="cedula_cliente" name="cedula_cliente"/>
                        </div>
                        <div class="col-md-6 mt-2">
                            <label for="nombre" class="form-label">Nombre cliente:</label>
                            <input type="text" class="form-control" id="nombre_cliente" name="nombre_cliente"/>
                        </div>                
                        <div class="col-12 mt-2">
                            <label for="vendedor" class="form-label">Vendedor:</label>
                            <select class="form-select" name="vendedor" onChange={selectVendedor}> 
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
                            <button class="btn btn-dark btn-block" id="post-btn" type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>    
    );
}

export default RegistarVenta;