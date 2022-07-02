import React,{useState, useEffect} from 'react'
import Produto from './produto';
import './listaProdutos.css'
const ListaProdutos = ({produtos, inserirPedido})=>{
    return(
        <div className='lista'>
            {produtos.map((doc,i) => {return(<Produto info = {doc} key = {i} inserirPedido={inserirPedido}/>)})}
        </div>
    )
}
export default ListaProdutos;