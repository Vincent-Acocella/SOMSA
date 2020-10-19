import React from 'react'
import data from '../catagories/homePage.json'
import Card from 'react-bootstrap/Card';


export default function Display(activePage) {
    
    switch(activePage){
        case 1:
            break;
        case 2:
            break;
        default:
    }


    const newData = data.map((data) => {
        return (
            <Card key = {data.id}>
                <Card.body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.publishedDate}</Card.Text>
                    <Card.Text>{data.reaction}</Card.Text>
                </Card.body>
            </Card>
        )
    })

    return (
        <div>
            {newData}

        </div>
    )
}

