import React from 'react'
import Card from 'react-bootstrap/Card'


export default function singleCard(newCard) {
    const{
        id,
        name,
        catagory,
        publishedDate,
        reaction
    } = newCard

    return (
        <div className= "">
            <Card className = "" style={{ width: '30rem', borderTop: '10rem'}}>
            <Card.Body key={id}>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{catagory}</Card.Subtitle>
                <Card.Text>
                    {publishedDate}
                    {reaction}
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
            </Card>
        </div>
    )
}
