import React ,{Component} from 'react';
import Buscador from './Componentes/Buscador';

class App extends Component{

  state = {
    termino: ''
  }

  consultarApi = () =>{
    console.log('desde consultar api')
  }

  datosBusqueda = (termino) =>{
    this.setState({
      termino
    }, () =>{
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscardor de Imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}></Buscador>
        </div>
      </div>
    );
  }
  
}

export default App;
