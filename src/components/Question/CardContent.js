import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { PropTypes } from 'prop-types';

import { colors } from '../../utils/helpers'
 
import {
    Header, Button, Segment
} from 'semantic-ui-react'


class CardContent extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
        unanswered: PropTypes.bool.isRequired,
        // color: PropTypes.string,
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

        const {question, unanswered} = this.props
        const btnColor = unanswered === true ? colors.teal : colors.orange
        const btnContent = unanswered === true ? 'Show Results' : 'Answer Poll'
        
        console.log(this.props)

        if(this.state.pollView === true) {
            return <Redirect push to={`/questions/${question.id}`} />
        }
        return (
            <Segment>

                <Header as='h4' textAlign='left'>
                    Would you rather
                </Header>
                <p style={{textAlign: 'center'}}>
                    {question.optionOne.text}
                    <br />
                    or...
                </p>

                <Button 
                    color={btnColor.name}
                    size='small'
                    fluid
                    onClick={this.clickHandle}
                    content={btnContent}
                />
                
            </Segment>

        )
    }

}

export default CardContent
