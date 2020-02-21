import React, { Component } from 'react';

class Buscador extends Component {

    busquedaRef = React.createRef();

    obtenerDatos = (e) =>{
        e.preventDefault();

        const termino = this.busquedaRef.current.value;

        this.props.datosBusqueda(termino);
        
    }

    render() { 
        return ( 
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} className="form-control form-group-lg" type="text" placeholder="Busca tu imagen, ejemplo: Futbol"></input>
                    </div>
                    <div className="col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar..."></input>
                    </div>
                </div>
            </form>
         );
    }
}
 
export default Buscador;