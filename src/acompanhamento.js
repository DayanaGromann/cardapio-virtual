import React, {useState, useEffect} from 'react';
import { database } from './firebaseConfig';
import {ref, onValue} from 'firebase/database';

import './acompanhamento.css'

const Acompanhamento = ({indice})=>{
    
    const [estado, setEstado] = useState("nada")
    

    useEffect(()=>{
        
       obterEstadoPedido(indice)
    
    })

    const obterEstadoPedido = (indice) => {
      indice-= 1
      
      const estadoRef = ref(database, 'comandas/comanda'+indice+'/cliente/estado')
      

      onValue(estadoRef, (snapshot)=>{
        var snap = snapshot.val()
        setEstado(snap)
      })
      
     
    }

    return(
        <div className='acompanhamentoContainer'>
            <h2>{`Olá, Obrigado pela preferência! `}</h2>
            <h2>Estado do seu pedido:</h2>
            <div className='status'>
                <h2>{estado}</h2>
            </div>
        </div>
    )
}

export default Acompanhamento;