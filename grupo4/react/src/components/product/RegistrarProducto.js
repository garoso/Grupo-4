import React from 'react';

const RegistrarProducto = () => {

    return (        
         <div class="modal-dialog text-center mt-2">
            <div class="col-sm-10 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src="https://media.istockphoto.com/vectors/cheers-with-beer-icon-handdrawn-vector-id1151319903?k=20&m=1151319903&s=170667a&w=0&h=n_90_xf2n85by03GIMHcfASRKMHI5mJqSLyoMg6foVw=" alt="icon" />
                    </div>
                    <form class="row g-3" action="http://localhost:5000/api/product/register" method="post">
                        <h4 class="col-12">Registrar producto: </h4>
                        <div class="col-12 mt-2">
                            <label for="nombre" class="form-label">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" />
                        </div>
                        <div class="col-12">
                            <label for="descripcion" class="form-label">Descripción:</label>
                            <input type="text" class="form-control" id="descripcion" name="descripcion" />
                        </div>
                        <div class="col-12">
                            <label for="valor" class="form-label">Valor unitario:</label>
                            <input type="number" class="form-control" id="valor" name="valor" />
                        </div>
                        <div class="col-12">
                            <label for="stock" class="form-label">Estado del producto:</label>
                            <select class="form-select" name="stock">
                                <option value="0" selected>Disponible</option>
                                <option value="1">No disponible</option>
                            </select>
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

export default RegistrarProducto;