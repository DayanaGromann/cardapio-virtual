import React, { useEffect, useState } from 'react';
import { db, database } from './firebaseConfig';
import {getDocs, collection} from 'firebase/firestore';
import {ref,set, onValue, update} from 'firebase/database';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import ListaProdutos from './components/listaProdutos';
import Header from './components/header';
import Pedidos from './components/Pedidos';
import ConfirmationScreen from './confirmationScreen'
import Acompanhamento from './acompanhamento'


function App() {
  const [products, setProducts] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [indiceComanda, setIndiceComanda] = useState()
  const [comanda, setComanda] = useState()
  
  useEffect(()=>{
    getProducts()
  }, [])

  useEffect(()=>{
    obterIndiceComanda()
  })

  const getProducts = async()=>{
    const produtos = await getDocs(collection(db,"produtos"))
  
    produtos.forEach(doc => {
      setProducts(prevItems => [...prevItems, doc.data()])
    });
  }

  

  const obterIndiceComanda = () => {
    const indexRef = ref(database, 'quantidadeComandas')
    
    onValue(indexRef, (snapshot)=>{
      let qtde = snapshot.val()
      let indice = qtde + 1 
      setIndiceComanda(indice)
    })
  }


  const confirmarPedido = (cliente)=>{
    cliente.indice = indiceComanda;
    const pedidosRef = ref(database, 'comandas/'+ 'comanda'+indiceComanda)
    set(pedidosRef, {pedidos, cliente})

    setComanda({pedidos, cliente})
    console.log(comanda)

    const indiceRef = ref(database, '/' )
    update(indiceRef, {quantidadeComandas : indiceComanda})
  }

  const inserirPedido = (produto)=>{
    setPedidos([...pedidos, produto])
  }

  const removerPedido = (index) => {
    var todosPedidos = [...pedidos]
    todosPedidos.splice(index,1)
    setPedidos(todosPedidos)
  }

  const HomePage = ()=> {
    if(products.length > 0){
      return (
        <div className="App">
          
          <ListaProdutos produtos={products} inserirPedido = {inserirPedido}/>
          <Pedidos removerPedido = {removerPedido} pedidos = {pedidos}/> 
        </div>
      );
    }
  }

  return(
    <Router>
      <div className='container'>
      <Header lanchonete = {'Boburguer lanches artesanais'} />
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path='confirmar' element={<ConfirmationScreen pedidos={pedidos} confirmarPedido = {confirmarPedido}/>}/>
          <Route path='acompanhamento' element = {<Acompanhamento indice = {indiceComanda} />}/>
        </Routes> 
      </div>
    </Router>
  )
 
}

export default App;
