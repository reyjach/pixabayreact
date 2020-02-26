import React ,{Component} from 'react';
import Buscador from './Componentes/Buscador';
import Resultado from './Componentes/Resultado';
import './App.css';

class App extends Component{

  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando: false,
    totalPaginas: ''
  }

  consultarApi = async () =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;

    const url = `https://pixabay.com/api/?key=15350299-8956fc9c12be7d794d1f2a99d&q=${termino}&per_page=20&page=${pagina}`;


    await fetch(url)
      .then(respuesta => {
        this.setState({
          cargando: true
        })
        return respuesta.json();
      })
      .then(resultado => {
        const resultadoPaginacion = Math.ceil(resultado.totalHits / 20);
        setTimeout(() =>{
          this.setState({
            imagenes:resultado.hits,
            cargando: false,
            totalPaginas: resultadoPaginacion
          })
        },1000)
      })
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
    const totalPaginas = this.state.totalPaginas;

    if(pagina === totalPaginas) return null

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

    const cargando = this.state.cargando;
    let resultado;
    if(cargando){
      resultado = <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                  </div>
    }else {
      resultado = <Resultado 
        imagenes={this.state.imagenes} 
        paginaAnterior={this.paginaAnterior} 
        paginaSiguiente={this.paginaSiguiente}
        pagina = {this.state.pagina}
        totalPaginas={this.state.totalPaginas}>
      </Resultado>
    }

    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscardor de Imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}></Buscador>
        </div>
        <div className="row justify-content-center">
          {resultado}
        </div>
      </div>
    );
  }
  
}

export default App;
