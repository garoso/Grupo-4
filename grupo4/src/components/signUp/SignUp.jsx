
function SignUp(){
  return(
    <div className="SignUp">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-4 shadow mt-5 p-4 rounded">
            <form class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4"/>
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4"/>
              </div>
              <div class="col-md-6 mt-2">
                <label for="inputName" class="form-label">Nombres</label>
                <input type="email" class="form-control" id="inputEmail4"/>
              </div>
              <div class="col-md-6 mt-2">
                <label for="inputLastName" class="form-label">Apellidos</label>
                <input type="password" class="form-control" id="inputPassword4"/>
              </div>
              <div class="col-12 mt-2">
                <label for="inputAddress" class="form-label">Direccion</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
              </div>
              <div class="col-12 mt-2">
                <label for="inputPhone" class="form-label">Telefono</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Numero de telefono"/>
              </div>
              <div class="col-md-6 mt-2">
                <label for="inputCity" class="form-label">City</label>
                <input type="text" class="form-control" id="inputCity"/>
              </div>
              <div class="col-12 mt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gridCheck"/>
                  <label class="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div class="col-12 mt-2">
                <button type="submit" class="btn btn-dark btn-block">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
