import React,{useState,useEffect} from 'react';
import './Pedidos.css';
import {AiOutlineCaretUp, AiOutlineCaretDown, AiOutlineClose} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Pedidos({removerPedido,pedidos}) {
    var [valorTotal, setValorTotal] = useState(0)
    var [conferirPedido, setConferirPedido] = useState(false);
    let navigate = useNavigate();
    
    useEffect(()=>{
        var soma = 0;

        for(let i = 0; i<pedidos.length;i++){
            soma += pedidos[i].valor
        }

        setValorTotal(soma);
    },[pedidos])

    
    return ( 
        <div className= {conferirPedido ? 'pedidoAberto' : 'pedidoFechado'}>

            { conferirPedido    
                ? <button onClick={()=>{setConferirPedido(false)}}><AiOutlineCaretDown/> <br/> <b>minimizar pedido</b> </button>
                : <button onClick={()=>{setConferirPedido(true)}}><AiOutlineCaretUp/> <br/> <b>conferir pedido</b> </button>
            }
            
            <div className='itensContainer'>
                {pedidos.map((item,i)=>{
                    return(
                    <div className='itemPedido' key = {i}>
                        <br/>
                        <b>{i+1+". "+item.nomeProduto}</b>
                        <p>{"valor: " + item.valor.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</p>
                        <p>{"observação: " + item.observacoes}</p>
                        <button className='remover' onClick={()=>{removerPedido(i)}}><AiOutlineClose/> remover</button>
                        <br/>
                        <hr/>
                    </div>
                    )
                })}
            </div> 
               
            
            <div className='info'>
                <p>{"Quantidade de itens: "+ pedidos.length}</p>
                <p>{"valor total: "+ valorTotal.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</p>
                <button className='botaoConfirmacao' onClick = {()=>{navigate('confirmar')}}>Confirmar Pedido</button>
            </div>

            
            
        </div>
    );
}

export default Pedidos;