import React,{useEffect,useState} from 'react'
import { storage } from '../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import {AiOutlinePlus, AiOutlineCaretDown} from "react-icons/ai";
import './produto.css'

const Produto = ({info, inserirPedido}) => {

  const [foto, setFoto] = useState("logo192.png")
  const [observacoes, setObservacoes] = useState("")

  var image = info.foto.slice(12);
  var imgUrl;
  
  useEffect(()=>{
    obterImg()
  },[foto])

  const obterImg = async()=>{
    imgUrl = await getDownloadURL(ref(storage, 'imagens/'+ image))
    setFoto(imgUrl)
  }
  
 
  return (
    <div className='produto'>
       <h1>{info.nomeProduto}</h1>

      <div className='imagem'>
        <img src = {foto}/>
        <h3>{"valor: "+ info.valor.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</h3>
      </div>

      <div className='descricao'>
        <br/>
        <h3>{"descrição: "+ info.descricao}</h3>
        <br/>
        <label>Inserir observação:</label>
        <input type='text' placeholder='ex: Sem alface' value = {observacoes} onChange = {(obs)=>{setObservacoes(obs.target.value)}}/>
        <br/>
        <button onClick={()=>{
          info.observacoes = observacoes;
          inserirPedido(info)
          setObservacoes("")
          }}> adicionar ao pedido</button>
      </div>
    </div>
  )
}

export default Produto;