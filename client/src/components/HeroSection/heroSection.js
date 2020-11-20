import React from 'react'
import MainContainer from '../maincontainer/mainContainer'
import Heading from '../header/heading'
import CTA from '../CTA/cta'

export default function heroSection() {
    return (
       <MainContainer>
            <Heading>Plan your Day with Vincent</Heading>
            <CTA target = '/signup'>Start Now</CTA>
        </MainContainer>
    )
}
