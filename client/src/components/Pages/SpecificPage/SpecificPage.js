import React from 'react'

export default function SpecificPage({match}) {

    console.log(match.params.name);
    //Use fetch 
    //When we link we get access to props

    return (
        <div>
            Poop
        </div>
    )
}
