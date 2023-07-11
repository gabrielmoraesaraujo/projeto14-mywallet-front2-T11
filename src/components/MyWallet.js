import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import TokenContext from "../contexts/TokenContext";
import axios from 'axios';


export default function MyWallet(){
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const { token, usuarioLogado } = useContext(TokenContext);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        if(!token){
            navigate("/");
        }
        getRecords();
    }, []);


    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }


    function getRecords(){
        let sum = 0;

        const promise = axios.get(`https://ericchandia-projeto13-mywallet.herokuapp.com/getRecords`, 
        config);

        promise.then((resposta) => {
            console.log("resposta records: " );
            console.log(resposta.data);
            setRecords([...resposta.data]);
            
            for(let i=0; i<resposta.data.length; i++){
                if(resposta.data[i].type === "in"){
                    sum = sum+resposta.data[i].value;
                }else{
                    sum = sum-resposta.data[i].value;
                }
            }
            setTotal(sum);
        });

        promise.catch((resposta) => {
            console.log("Problema ao obter dados.Logue novamente");
            setTimeout(() => navigate("/"), 3000);
        }    
        );

        

    }


    return(
    <MyWalletScreen>
    <Top>
        <h1>Olá, {usuarioLogado.user}</h1>
        <ion-icon size="large" name="log-out-outline" onClick={() => navigate("/")}></ion-icon>
    </Top>
    <Records layout={records.length > 0 ? "start" : "center"}>
        {records.length > 0 ? 
        records.map(record => 
        <Record>
            <div style={{display: 'flex'}}>
            <RecordDate>{record.time}</RecordDate>
            <RecordDescr>{record.descr}</RecordDescr>
            </div>
            <RecordValue color={record.type === 'in' ? "#03AC00" : "#C70000"}>{record.value}</RecordValue>
        </Record>)
        :
        <p>Não há resgistros de entrada ou saída</p>
        }
    </Records>
    <Balance>
            <strong>SALDO</strong>
            <BalanceTotal color={Number(total) >= 0 ? "#03AC00" : "#C70000"}>
                {total.toFixed(2)}
            </BalanceTotal>
        </Balance>
    <Bottom>
        <NewIn onClick={() => {navigate("/NewIn")}}>
            <ion-icon name="add-circle-outline"></ion-icon>
            <p>Nova Entrada</p>
        </NewIn>
        <NewOut onClick={() => {navigate("/NewOut")}}>
            <ion-icon name="remove-circle-outline"></ion-icon>
            <p>Nova saída</p>
        </NewOut>
    </Bottom>
    </MyWalletScreen>
    );
}

const Balance = styled.div`
    width: 100%;
    height: 20px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 10px;
    background: #FFFFFF;
    border-radius: 5px;
    strong{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
    }
`

const BalanceTotal = styled.div`
        font-family: Raleway;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: right;
        color: ${props => props.color} !important;
`

const MyWalletScreen = styled.div`
    width: 100%;
    height: 100%;
    padding: 10% 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #8C11BE;
    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
        margin-bottom: 10%;
    }
`
const Top = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
    
    ion-icon {
        font-size: 64px;
        color: white;
    }
`
const Records = styled.div`
    width: 100%;
    height: 65%;
    margin-top: 20px;
    margin-bottom: -10px;
    padding: 3% 3%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: ${props => props.layout};
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    p{
        width: 70%;
    }
`
const Record = styled.div`
    width: 100%;
    height: 5%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`

const RecordDate = styled.div`
    margin-right: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    color: #C70000;
`
const RecordDescr = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`

const RecordValue = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    color: ${props => props.color};
`

const Bottom = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    ion-icon{
        font-size: 25px;
    }
`
const NewIn = styled.div`
    width: 48%;
    height: 100%;
    border-radius: 5px;
    background-color: #A328D6;
    margin-right: 4%;
    padding: 3% 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
    }
`

const NewOut = styled.div`
    width: 48%;
    height: 100%;
    border-radius: 5px;
    background-color: #A328D6;
    padding: 3% 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
    }
`