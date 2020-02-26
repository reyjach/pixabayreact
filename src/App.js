import React ,{Component} from 'react';
import Buscador from './Componentes/Buscador';
import Resultado from './Componentes/Resultado';

class App extends Component{

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  consultarApi = () =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;

    const url = `https://pixabay.com/api/?key=15350299-8956fc9c12be7d794d1f2a99d&q=${termino}&per_page=20&page=${pagina}`;


    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes:resultado.hits}))
  }

  datosBusqueda = (termino) =>{
    this.setState({
      termino: termino,
      pagina: 1
    }, () =>{
      this.consultarApi();
    })
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;
  
    if(pagina === 1) return null;

    pagina -= 1;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina += 1;


    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscardor de Imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}></Buscador>
        </div>
        <div className="row justify-content-center">
          <Resultado imagenes={this.state.imagenes} paginaAnterior={this.paginaAnterior} paginaSiguiente={this.paginaSiguiente}></Resultado>
        </div>
      </div>
    );
  }
  
}

export default App;
