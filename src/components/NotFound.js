import React, {Component}from 'react'
import { Segment, Icon, Header } from 'semantic-ui-react';

export class NotFount extends Component {
    render() {
        return (
            <Segment placeholder textAlign='center'>
                <Header icon>
                    <Icon name='exclamation triangle' textAlign='center'/>
                    <h1>OOPS!!</h1>
                    <h5>Page Not Found 404 Error</h5>
                    <p>Please, Use the menu to try again!</p>
                </Header>
    
            </Segment>
        )
    }
}

export default NotFount