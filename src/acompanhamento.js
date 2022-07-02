import React, {useState, useEffect} from 'react';
import { database } from './firebaseConfig';
import {ref, onValue} from 'firebase/database';

  // useEffect(()=>{
    //     if(pedidoConfirmado){
    //         obterEstadoPedido()
    //     }
    // })

const Acompanhamento = ({indice})=>{

    console.log(indice)
      // const obterEstadoPedido = (cliente) => {
    //     const estadoRef = ref(database, 'comandas/comanda'+cliente.indice+'/cliente/estado')
        
    //     onValue(estadoRef, (snapshot)=>{
    //       let valor = snapshot.val()
    //       console.log(cliente.indice)
    //     })
    //   }

    return(
        <>
            <h2>{`Olá, Obrigado pela preferência! `}</h2>
            <h2>Estado do seu pedido:</h2>
            <h2>oii</h2>
        </>
    )
}

export default Acompanhamento;