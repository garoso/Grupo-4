import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const ModificarProducto = () => {

    const estadoProducto = [
        {value:0, label:"Disponible"},
        {value:1, label:"No disponible"}
    ]

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos();
    }, []);

    const showing = false;

    const getProductos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/productos/get');
            console.log(response.data.products);
            setProductos(response.data.products);
        } catch (error) {
            console.log("Ha ocurrido un error");
        }
    }

    const getInitialState = () => {
        const value = "0000";
        return value;
    };
    
    const [producto, setProducto] = useState(getInitialState);
    const [estado, setEstado] = useState(estadoProducto[0]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [valor, setValor] = useState();

    const selectEstado = (estado) => {
        setEstado(estado);
    } 

    const selectProduct = (e) => {    
        const product = JSON.parse(e.target.value); 
        setEstado(estadoProducto[product.stock]);
        setDescripcion(product.descripcion);
        setNombre(product.name);
        setValor(product.valor);
        setProducto(product);
    };

    const changeValor = (e) => {    
        const valor = JSON.parse(e.target.value); 
        setValor(valor);
    };

    const changeDescripcion = (e) => {    
        const descripcion = JSON.parse(e.target.value); 
        setValor(descripcion);
    };

    const changeNombre = (e) => {    
        const name = JSON.parse(e.target.value); 
        setValor(name);
    };

    return (        
         <div class="modal-dialog text-center mt-0">
            <div class="col-sm-10 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MlkOcfm3WFyiWvOGuk0U0ZpsYaTcjNfjzF60r5-jVk4a-W-N1IXfcLZLwna6ngmfDx8&usqp=CAU" alt="icon" />
                    </div>
                    <form class="row g-3" action="http://localhost:5000/api/product/update" method="post">
                        <h4 class="col-12">Modificar producto: </h4>                          
                        <div class="col-12 mt-2">
                            <label for="uuid" class="form-label">Identificador:</label>
                            <select class="form-select" name="id" onChange={selectProduct}> 
                                <option value={null}></option>                 
                                {
                                    productos.map((product) => (
                                        <option value={JSON.stringify(product)}>{product.id}</option>
                                    ))                    
                                }
                            </select>
                            <input type="text" style={{ display: (showing ? 'block' : 'none') }} name="uuid" value={producto.id}></input>
                        </div> 
                        <div class="col-12">
                            <label for="nombre" class="form-label">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" value={nombre} onChange={changeNombre}/>
                        </div>
                        <div class="col-12">
                            <label for="descripcion" class="form-label">Descripción:</label>
                            <input type="text" class="form-control" id="descripcion" name="descripcion" value={descripcion} onChange={changeDescripcion}/>
                        </div>
                        <div class="col-12">
                            <label for="valor" class="form-label">Valor unitario:</label>
                            <input type="number" class="form-control" id="valor" name="valor" value={valor} onChange={changeValor}/>
                        </div>
                        <div class="col-12">
                            <label for="estado" class="form-label">Estado del producto:</label>
                            <Select class="form-select" id="inputRol" name="stock" options={estadoProducto} value={estado} onChange={selectEstado} /> 
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

export default ModificarProducto;