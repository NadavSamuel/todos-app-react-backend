import React from 'react'
import { Segment,Icon,Header } from 'semantic-ui-react'

interface NoTodosMsgProps {

}

export const NoTodosMsg: React.FC<NoTodosMsgProps> = ({ }) => {
    return (<Segment textAlign="center">
        <Header icon>
            <Icon name='exclamation' />
      You have no Todos. Please make some. 
    </Header>
    </Segment>);
}