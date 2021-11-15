import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Producto = () => {

    const [productos, setProductos] = useState([]);
    const [productos2, setProductos2] = useState([]);

    const [id, setID] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/productos/get');
            console.log(response.data.products);
            setProductos(response.data.products);
            setProductos2(response.data.products);
        } catch (error) {
            console.log("Ha ocurrido un error");
        }
    };

    const buscarProducto = (e) => {          
        productos.forEach((producto) => {
            if (producto.id.includes(id)) {
                setProductos2([producto]);
            }
        })      
    }

    const buscarDescripcion = (e) => {  
        const resultados = [];        
        productos.forEach((producto) => {
            if (producto.descripcion.toString().toLowerCase().includes(descripcion)) {
                resultados.push(producto);
            }
        });
        setProductos2(resultados);    
    }

    const changeID = (e) => {
        let id = e.target.value;
        setID(id);
        if (id.toString() === ""){
            setProductos2(productos);
        }
    }

    const changeDescripcion = (e) => {
        let descripcion = e.target.value;
        setDescripcion(descripcion);
        if (descripcion === ""){
            setProductos2(productos);
        }
    }

    return (
        <div>
            <div class="form-inline offset-sm-1 mt-5">
                <h5 class="mg-l text-left mb-2">Buscar por identificador:</h5> 
                <input class="form-control mr-sm-2 ml-3" name="uuid" type="number" placeholder="Identificador" aria-label="UUID" onChange={changeID}/>
                <button class="btn btn-outline-success my-2 my-sm-0" onClick={buscarProducto}>Buscar</button>
            </div>
            <div class="form-inline offset-sm-1 mt-4">
                <h5 class="mg-l text-left mb-2">Buscar por descripción:</h5> 
                <input class="form-control mr-sm-2 ml-4" name="uuid" type="text" placeholder="Descripción" aria-label="UUID" onChange={changeDescripcion}/>
                <button class="btn btn-outline-success my-2 my-sm-0" onClick={buscarDescripcion}>Buscar</button>
            </div>
            <div class="col-sm-10 offset-sm-1 p-4 rounded">                
                <h2 class="mg-l text-left mb-2">Productos:</h2> 
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Identificador</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Valor Unitario</th>
                        <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            productos2.map((product) => (                                
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.descripcion}</td>
                                    <td>{product.valor}</td>
                                    {product.stock === 0 && <td>Disponible</td>}
                                    {product.stock === 1 && <td>No disponible</td>}
                                </tr>
                            )) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Producto;