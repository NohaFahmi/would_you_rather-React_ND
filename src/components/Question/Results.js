import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Label, Icon, Segment, Progress, Button } from 'semantic-ui-react';
import { styles } from '../../utils/helpers'

const VoteLabel = () => (
    <Label color="orange" ribbon="right" className="vote">
        <Icon name="check circle outline" size="big" className="compact" />
        <div style={{ float: 'right' }}>
            Your
        <br />
            Vote
        </div>
  </Label>
)
class Results extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        question: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }

    handleClick = () => {
        this.props.history.push('/')
    }
    render() {
        const { question, user} = this.props
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length

        const totalVotes = optionOneVotes + optionTwoVotes
        const userVote = user.answers[question.id]

        let option1 = styles.secondary,
        option2 = styles.secondary
        if(optionTwoVotes > optionOneVotes) {
            option2 = styles.primary

        } else if (optionOneVotes > optionTwoVotes) {
            option1 = styles.primary
        }

        return (
            <div>
               <Header as='h4'>
                   Results:
                   <Header.Subheader>
                       would you rather
                   </Header.Subheader>
               </Header>
               <Segment color={option1.color}>
                   {userVote === 'optionOne' && <VoteLabel />}

                   <p>{question.optionOne.text}</p>
                   <Progress 
                        color={option1.color}
                        percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
                   >
                       {optionOneVotes} out of {totalVotes} votes
                   </Progress>
               </Segment>

               <Segment color={option2.color}>
                   {userVote === 'optionTwo' && <VoteLabel />}

                   <p>{question.optionTwo.text}</p>
                   <Progress 
                        color={option2.color}
                        percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
                    >
                       {optionTwoVotes} out of {totalVotes} votes
                   </Progress>
               </Segment>
               <Button size='tiny' floated='right' onClick={this.handleClick}>Back</Button>
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