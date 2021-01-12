import React from 'react'
import { Segment } from 'semantic-ui-react'

interface BrokenUrlMsgProps {
    cmpType:string

}

export const BrokenUrlMsg: React.FC<BrokenUrlMsgProps> = ({cmpType}) => {
    // const Segment = require('semantic-ui-react')

        return (
            <Segment>OOPS! seems like your {cmpType} url is broken, plese try a different url.</Segment>
        );
}