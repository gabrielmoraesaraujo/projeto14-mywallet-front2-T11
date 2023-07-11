import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const navigate = useNavigate();
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    const [name, setName] = useState("");
    const [senha, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function SignUpSucess(resposta){
        console.log(resposta);
        alert("Cadastro com sucesso!");
        navigate("/");
    }

    function validateData(){
        if ((email !== null && senha !== null && name !== null && confirmPassword !== null) && (senha === confirmPassword) && (regexEmail.test(email)) ) return true;
    }

    function cadastrarUsuario(){
        if(validateData()) {
            const usuario = {
                name: name,
                email: email,
                password: senha
            }

            const promise = axios.post("https://ericchandia-projeto13-mywallet.herokuapp.com/sign-up", usuario)
            .then(resposta => SignUpSucess(resposta))
            .catch(
                resposta => {
                    console.log(resposta);
                    if(resposta.response.status === 409){
                        alert(resposta.response.data.message);
                    }
                    else if(resposta.response.status === 422){
                        let error = "";
                        for(let i=0;i<resposta.response.data.details.length;i++){ error = error + resposta.response.data.details[i] + "\n" }
                        alert(error);
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
        <TelaSignUp>
            <p className="logo">MyWallet</p>
            <input value={name}  onChange={e => setName(e.target.value)} placeholder="Name"  />
            <input value={email}  onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="E-mail"/>
            <input value={senha}  onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" />
            <input type="password" value={confirmPassword}  onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmar a senha"/>
            <ButtonCadastrar onClick={cadastrarUsuario} >Cadastrar</ButtonCadastrar>
            <LinkEntrar onClick={() => {navigate("/")}}>Já tem uma conta? Entre agora!</LinkEntrar>
        </TelaSignUp>
    );
}

const TelaSignUp = styled.div`
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
        padding: 10px 10px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
    img{
        width: 60%;
        margin-top: 15%;
        margin-bottom: 10%;
    }
`

const ButtonCadastrar = styled.div`
    width:85%;
    height: 8%;
    background-color: #A328D6;
    margin-top: 2%;
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

const LinkEntrar = styled.div`
    margin-top: 5%;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line:underline;
    color: #FFFFFF;
`