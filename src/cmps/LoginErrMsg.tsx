import React from 'react'
import {  Message } from 'semantic-ui-react'

interface LoginErrMsgProps {
    errorStatus?:number

}

export const LoginErrMsg: React.FC<LoginErrMsgProps> = ({errorStatus = null}) => {

    const msgContent = (errorStatus === 401)? 'OOPS! Wrong e-mail or password':'OOPS! Something went wrong';
        return (
            <Message negative>
                <Message.Header>{msgContent}</Message.Header>
                <p>Please try again</p>
            </Message>)
        
}