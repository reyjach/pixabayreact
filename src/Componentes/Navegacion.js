import React, { Component } from 'react';

class Navegacion extends Component {

    mostrarAnterior = () => {
        const {pagina} = this.props;
        if (pagina === 1) return null

        return (
            <button onClick={this.props.paginaAnterior} type="button" className="btn btn-info mr-1">Anterior &larr;</button>
        )
    }

    mostrarSiguiente = () => {

        if (this.resultadoSiguiente()) return null
        

        return(
            <button onClick={this.props.paginaSiguiente} type="button" className="btn btn-info">Siguiente &rarr;</button>
        )


    }

    resultadoSiguiente = () => {
        const {pagina} = this.props;
        const {totalPaginas} = this.props;

        if (pagina === totalPaginas) {
            return true
        }else {
            return false
        }

    }

    render() { 
        return ( 
            <div className="py-5">
                {this.mostrarAnterior()}
                {this.mostrarSiguiente()}
            </div>
         );
    }
}
 
export default Navegacion;
