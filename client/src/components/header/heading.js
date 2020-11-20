import React from 'react'
import './heading.css'

export default function heading(props) {
    return (
    <h1 className='heading'>{props.children}</h1>
    )
}
