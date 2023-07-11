import styled from "styled-components"
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";

export default function NewIn(){
    const navigate = useNavigate();
    const [valor, setValor] = useState("");
    const [descr, setDescr] = useState("");
    const { token, usuarioLogado } = useContext(TokenContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function saveNewIn(){
        if(!valor || !descr){
            alert("Preencha todos os campos!");
            return;
        }
        //const regexValor = /^[0-9]\,[0-9]$/;
        //console.log(valor.replace(",", "."));

        const valorEmReais = Number(valor.replace(",", "."));
        const descricao = descr;

        const promise = axios.post("https://ericchandia-projeto13-mywallet.herokuapp.com/NewIn", {value: valorEmReais, descr: descricao, type: "in"}, config);

        promise.then(response => {
            console.log("Entrada realizada com sucesso");
            console.log(response);
            navigate("/MyWallet");
        });

        promise.catch(error => {
            alert("Ocorreu algum erro inesperado, tente novamente");
            console.log(error);
        })

    }

    useEffect(() => {

        if(!token){
            navigate("/");
        }
        
    }, []);



    return(
        <NewInScreen>
            <h1>Nova entrada</h1>
            <input type="number" min="0.00" step="0.01" value={valor} onChange={e => setValor(e.target.value)} placeholder="Valor"  />
            <input value={descr} onChange={e => setDescr(e.target.value)} placeholder="Descrição"  />
            <ButtonSaveIn onClick={saveNewIn}>Salvar entrada</ButtonSaveIn>
        </NewInScreen>
    )
}

const NewInScreen = styled.div`
    width: 100%;
    height: 100%;
    padding: 10% 5%;
    display: flex;
    flex-direction: column;
    background: #8C11BE;
    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
        margin-bottom: 10%;
    }
    input{
        height: 8%;
        margin-top: 2%;
        margin-bottom: 1%;
        padding: 10px 10px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
`
const ButtonSaveIn = styled.div`
    
        height: 8%;
        margin-top: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #A328D6;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
    
`