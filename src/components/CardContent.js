import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { PropTypes } from 'prop-types';

import {
    Header, Button, Segment
} from 'semantic-ui-react'


class CardContent extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
        unanswered: PropTypes.bool.isRequired,
        color: PropTypes.string,
    }

    state= {
        pollView: false
    }

    clickHandle = e => {
        this.setState(prevState => ({
            pollView: !prevState.pollView
        }))
    }

    render() {

        const {question, unanswered, color} = this.props

        if(this.state.pollView === true) {
            return <Redirect push to={`/question/:${question.id}`} />
        }
        return (
            <Segment>

                <Header as='h5' textAlign='left'>
                    Would you rather
                </Header>
                <p>
                    {question.optionOne.text}
                    <br />
                    or...
                </p>

                <Button 
                    color={color}
                    size='tiny'
                    fluid
                    onClick={this.clickHandle}
                    content={unanswered === true ? 'Answer Poll' : 'View Results'}
                />
                
            </Segment>

        )
    }

}

export default CardContent
