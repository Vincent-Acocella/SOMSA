import React from 'react'
import{Link} from 'react-router-dom'

export default function cta(props) {
    return (
        <div>
            <Link to={props.target}>
                {props.children}
            </Link>
        </div>
    )
}
