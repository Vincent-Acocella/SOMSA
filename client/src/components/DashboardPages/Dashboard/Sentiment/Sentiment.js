import React ,{useState, useEffect} from 'react'
import {axios} from '../../../API/axios'
import {Pie} from 'react-chartjs-2'
import { MDBContainer } from "mdbreact";
import {SentimentStyled} from './Sentiment.styled'


export default function Sentiment({match}) {
    useEffect(()=>{
        fetchSentiment();
    },[])

    const [data, setData] = useState({});

    const [sentiment, setSentiment] = useState();

    const [feeling, setFeeling] = useState();

    const fetchSentiment = async () => {
        const getSentiment = await axios.get(`/api/sentiment/${match.params.id}`);
        console.log(getSentiment);
        setSentiment(getSentiment);

        let confInterval = getSentiment.data.CI;

        setFeeling(getSentiment.data.sentiment);

        if(getSentiment.data.sentiment){
            setFeeling("Positive");
        }else{
            setFeeling("Negative");
        }

        let remainder = 100 - confInterval
     
        let newData = {
            labels: ["","Confidence Interval"],
            datasets: [
                {
                  data: [remainder, confInterval],
                  backgroundColor: [
                    "#F7464A",
                    "#46BFBD"
                  ],
                  hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1"
                  ]
                }
            ],
        }
        setData(newData)
    }
    return (
        <SentimentStyled>
            <MDBContainer>

            <h3 className="mt-5">{feeling}</h3>
            <Pie data={data} width = {500} height = {250} options={{ responsive: true, maintainAspectRatio: false}}/>
            </MDBContainer>
        </SentimentStyled>
    )
}