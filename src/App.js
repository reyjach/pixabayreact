import React ,{Component} from 'react';
import Buscador from './Componentes/Buscador';
import Resultado from './Componentes/Resultado';

class App extends Component{

  state = {
    termino: '',
    imagenes: []
  }

  consultarApi = () =>{
    const termino = this.state.termino;
    const url = `https://pixabay.com/api/?key=15350299-8956fc9c12be7d794d1f2a99d&q=${termino}&per_page=20`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes:resultado.hits}))
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
        <div className="row">
          <Resultado imagenes={this.state.imagenes}></Resultado>
        </div>
      </div>
    );
  }
  
}

export default App;
