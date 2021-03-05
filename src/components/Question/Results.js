import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Header, Icon, Label, Segment, Progress, Button

} from 'semantic-ui-react'

import { styles } from '../../utils/helpers'

const VotesLabel = () => (
    <Label color="orange" ribbon='right' className='vote'>
        <Icon name='check circle outline' size='big' className='compact'/>
        <div style={{float: 'right'}}>
            Your
            <br />
            vote
        </div>
    </Label>
)

export class Results extends Component {

    static propTypes = {

        history: PropTypes.object.isRequired,
        question: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    }

    clickHandle = () => {
        this.props.history.push('/')
    }

    render() {

        const {question, user} = this.props
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const userVotes = user.answers[question.id]

        let option_1 = styles.secondary,
        option_2 = styles.secondary

        if(optionOneVotes > optionTwoVotes) {
            option_1 = styles.primary
        } else if(optionTwoVotes > optionOneVotes) {
            option_2 = styles.primary
        }
        return (
            <div>
                <Header as='h2' color='teal'>
                    Results: 
                    <Header.Subheader>
                        would you rather
                    </Header.Subheader>
                </Header>
                <Segment color={option_1.color}>
                    {userVotes === 'optionOne' && <VotesLabel />}

                    <p>{question.optionOne.text}</p>

                    <Progress 
                        percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
                        progress
                        color={option_1.color}
                    >
                    {optionOneVotes} out of {totalVotes} votes

                    </Progress>
                </Segment>

                <Segment color={option_2.color}>
                    {userVotes === 'optionTwo' && <VotesLabel />}

                    <p>{question.optionTwo.text}</p>

                    <Progress 
                        percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
                        progress
                        color={option_2.color}
                    >
                    {optionTwoVotes} out of {totalVotes} votes

                    </Progress>
                </Segment>
                <Button
                    size="tiny"
                    floated='right'
                    onClick={this.clickHandle}
                >
                    Back

                </Button>

            </div>
           
        )
    }
}

function mapStateToProps({users, authedUser}) {

    const user = users[authedUser]

    return {
        user
    }
}

export default withRouter(connect(mapStateToProps)(Results))