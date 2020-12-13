import React ,{useState, useEffect} from 'react'
import {axios} from '../../../API/axios'
import {Pie} from 'react-chartjs-2'
import { MDBContainer } from "mdbreact";
import {SentimentStyled} from './Sentiment.styled'
import HandleStar from './HandleStar';


export default function Sentiment({match}) {
    

    const [data, setData] = useState({});

    const [sentiment, setSentiment] = useState();

    const [feeling, setFeeling] = useState();

    const [topicId, setTopicId] = useState();
    const [favorites, setFavorites] = useState({});

    const [isFavorite, setIsFavorite ] = useState(0);

    const [currentuser, setCurrentUser] = useState(-1);

    const [topicName, setTopicName] = useState();

    const [ci, setCi] = useState()

    useEffect(()=>{

        fetchSentiment();
        let curUser = localStorage.getItem('currentUser');
        let favorites = localStorage.getItem('favorites');
        if(curUser !== 0) setCurrentUser(curUser);
        if(favorites !== 0) setFavorites(favorites);
        
    },[])

    const fetchSentiment = async () => {
        const getSentiment = await axios.get(`/api/sentiment/${match.params.id}`);
        setSentiment(getSentiment);
        
        let confInterval = getSentiment.data.CI;
        setCi(confInterval)

        setFeeling(getSentiment.data.sentiment);

        if(getSentiment.data.sentiment){
            setFeeling("Positive");
        }else{
            setFeeling("Negative");
        }

        setTopicId(getSentiment.data.trend.Topic_ID);
        let topicname = getSentiment.data.trend.Topic_Name;

        if(topicname.length > 30){
            topicname = topicname.substring(0,28);
            topicname = topicname.concat("....")
        }

        setTopicName(topicname)
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
            
                <h2 className="name">{topicName}</h2>
         
                
    
            <h3 className="feel">People are feeling <u>{feeling}</u> about this</h3>
        
            <HandleStar accountId = {currentuser} topicId ={topicId} status = {isFavorite}></HandleStar>

            <div className="pie-chart">
            <MDBContainer>
                <Pie data={data} width = {1000} height = {250} options={{ responsive: true, maintainAspectRatio: false}}/>
            </MDBContainer>
            </div>
            <h3 className="tootin"> We are {ci}% confident</h3>

           

        </SentimentStyled>

    )
}