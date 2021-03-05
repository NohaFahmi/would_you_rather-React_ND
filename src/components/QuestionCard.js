import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';


import {
    Segment, Header, Grid, Image, Container,
} from 'semantic-ui-react'

import CardContent from './question/CardContent'
import Question from './question/Question';
import Results from './question/Results';

import {colors} from '../utils/helpers'


const types = {
    CARD_CONTENT: 'CARD_CONTENT',
    QUESTION: 'QUESTION',
    RESULTS: 'RESULTS',
}

const Content = props => {
    const {type, question, unanswered} = props

    switch(type) {
        case types.CARD_CONTENT :
            return <CardContent question={question} unanswered={unanswered}/>

        case types.QUESTION :
            return <Question question={question}/>
        
        case types.RESULTS :
            return <Results question={question}/>

        default :
            return;
    }
}
class QuestionCard extends Component {

    static propTypes = {
        question: PropTypes.object.isRequired,
        author: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        unanswered: PropTypes.bool,
        q_id: PropTypes.string,
        // color: PropTypes.string
    }

    render() {

        const {author, type, question, badPath, unanswered= null} = this.props
        console.log((this.props))

        const tabColor = unanswered === true ? colors.teal : colors.orange

        const borderTop = 
            unanswered === null
            ? `1px solid ${colors.grey}`
            : `2px solid ${tabColor.hex}`

        if(badPath === true) {
            return <Redirect to='/questions/bad_id' />
        }

        return (
            <Container style={{marginTop: '40px'}}>
                <Segment>
                <Header 
                    as='h4'
                    textAlign='left'
                    block
                    attached='top'
                    style={{borderTop: borderTop}}   
                >
                    {author.name} asks: 
                </Header>

                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image 
                                src={author.avatarURL}
                                size='small'
                                circular
                                
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Content 
                                type={type}
                                question={question}
                                unanswered={unanswered}
                            />
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
               
            </Segment>

            </Container>
            
        )
    }
}

function mapStateToProps({users, questions, authedUser}, 
    {match, q_id}
    ) {
        let question, author, type, badPath = false;
        // console.log(match.params)
        if(q_id !== undefined) {
            question = questions[q_id]
            author = users[question.author]
            type = types.CARD_CONTENT

        } else {

            const {q_id} = match.params
            question = questions[q_id]
            const user = users[authedUser]

            if(question === undefined) {
                badPath = true
            } else {
                author = users[question.author]
                type = types.QUESTION
                
                if(Object.keys(user.answers).includes(question.id)) {
                    type = types.RESULTS
                }
            }
            
        }
        // const author = users[question.author]
        
        return {
            question,
            author,
            type,
            badPath
        }
}
export default connect(mapStateToProps)(QuestionCard)
    