import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { useState } from "react";



export default function SignIn(){
    const navigate = useNavigate();
    const { setToken, setUsuarioLogado } = useContext(TokenContext);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    function SignInSucess(resposta){
        console.log(resposta);
        setToken(resposta.data.token);
        setUsuarioLogado({id: resposta.data.id, user: resposta.data.name, email: resposta.data.email});
        navigate("/MyWallet");
    }

    function validaInformacoes(){
        if(email !== "" && senha !== "") return true;
    }

    function logarUsuario(){
        if(validaInformacoes()){
            
            const usuario = {
                email: email,
                password: senha
            }

            const promise = axios.post("https://ericchandia-projeto13-mywallet.herokuapp.com/sign-in", usuario)
            .then(resposta => SignInSucess(resposta))
            .catch(
                resposta => {
                    //console.log(resposta);
                    if(resposta.response.status === 401){
                        alert(resposta.response.data);
                    
                    }else{
                        alert(resposta.response.data.message);
                    }
                }
            );

        }else{
            alert("Preencha os campos corretamente!");
        }
    }

    return(

        <TelaSignIn>
        
        <p className="logo">MyWallet</p>
            <input value={email}  onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
            <input value={senha}  onChange={e => setSenha(e.target.value)} placeholder="Senha" type="password" />
            <ButtonEntrar onClick={logarUsuario}>Entrar</ButtonEntrar>
            <LinkSignUp onClick={() => {navigate("/SignUp")}}>Não tem uma conta? Cadastre-se!</LinkSignUp>
         

        </TelaSignIn>

    );
}


const TelaSignIn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #8C11BE;
    .logo{
        margin-bottom: 40px;
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
    }
    input{
        width:85%;
        height: 8%;
        margin-top: 1%;
        margin-bottom: 1%;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
`

const ButtonEntrar = styled.div`
    width:85%;
    height: 8%;
    background-color: #A328D6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
`

const LinkSignUp = styled.div`
    margin-top: 5%;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line:underline;
    color: #52B6FF;
`