import React, {useState, useEffect} from 'react';
import './confirmationScreen.css'

const ConfirmationScreen = ({pedidos, confirmarPedido})=>{

    const values = {
        nome: '',
        email: '',
        telefone: '',
        logradouro: '',
        numero: '',
        referencia: '',
        bairro: '',
        formaPagamento: 'dinheiro',
    }

    const [cliente, setClient] = useState(values)
    const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  

    const getClientInfo = (e) => {
        const {name, value} = e.target;
        setClient({...cliente, [name]:value})    
    }

  

    const registrarPedido = (e)=>{
        e.preventDefault()
        setPedidoConfirmado(true)
        cliente.estado = "Aguardando confirmação do estabelecimento"


        confirmarPedido(cliente)
    }

    {if(!pedidoConfirmado){
    
        return(
            <div className='container'>
                
                <h2>Dados Pessoais</h2>
                <form onSubmit ={registrarPedido}>
                    <label>
                        Nome
                        <input type='text' name='nome' value={cliente.nome} onChange={getClientInfo}/>
                    </label>
                    <label>
                        e-mail
                        <input type='text' name='email' value={cliente.email} onChange={getClientInfo}/>
                    </label>
                    <label>
                        telefone
                        <input type='text' name='telefone' value={cliente.telefone} onChange={getClientInfo}/>
                    </label>
                
                    <hr/>
                    <br/>

                    <label>
                        Logradouro
                        <input type='text' name='logradouro' value={cliente.logradouro} onChange={getClientInfo}/>
                    </label>
                    <label>
                        Número
                        <input type='text' name='numero' value={cliente.numero} onChange={getClientInfo}/>
                    </label>
                    <label>
                        referência
                        <input type='text' name='referencia' value={cliente.referencia} onChange={getClientInfo}/>
                    </label>
                    <label>
                        bairro
                        <input type='text' name='bairro' value={cliente.bairro} onChange={getClientInfo}/>
                    </label>
                
                    <hr/>
                    <br/>

                    <label>
                        Forma de pagamento
                        <select name='formaPagamento' value={cliente.formaPagamento} onChange={getClientInfo}>
                            <option value='dinheiro'>dinheiro</option>
                            <option value='cartão de crédito'>cartão de crédito</option>
                            <option value='cartão de débito'>cartão de débito</option>
                            <option value='pix'>pix</option>
                        </select>
                    </label>

                    <input type="submit" value="Confirmar" />
                </form>
            </div>
    
        )
    }else{
        return(
            <>
                <h2>{`Olá ${cliente.nome}, Obrigado pela preferência! `}</h2>
                <h2>Estado do seu pedido:</h2>
                <h2>{cliente.estado}</h2>
            </>
        )
    }}
}

export default ConfirmationScreen;