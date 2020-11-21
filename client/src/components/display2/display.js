import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function display() {

    const [topicList, setTopicList] = useState()

    useEffect(()=>{

    },[])

    // call to api
    //Topic list will be a combination of favorites and original topics

   // const getTopicList = 

    return (
        <div>
            {topicList.map(topic =>(
                <h1 key={topic.topicid}>
                    <Link to={`/home/${topic.topicid}`}>{topic.topicid}</Link>
                </h1>
            ))}
        </div>
    )
}
