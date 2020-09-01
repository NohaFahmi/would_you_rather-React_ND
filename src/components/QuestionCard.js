import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';

import {
    Segment, Header, Grid, Image,
} from 'semantic-ui-react'

import CardContent from './Question/CardContent'
import Question from './Question/Question';
import Results from './Question/Results';

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

        const {author, type, question, unanswered= null} = this.props
        console.log((this.props))

        const tabColor = unanswered === true ? colors.green : colors.blue

        const borderTop = 
            unanswered === null
            ? `1px solid ${colors.grey}`
            : `2px solid ${tabColor.hex}`
        return (
            <Segment>
                <Header 
                    as='h5'
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
                            <Image src={author.avatarURL}/>
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
        )
    }
}

function mapStateToProps({users, questions, authedUser}, 
    {match, q_id}
    ) {
        let question, type;
        if(q_id !== undefined) {
            question = questions[q_id]
            type = types.CARD_CONTENT
        } else {

            const {q_id} = match.params
            question = questions[q_id]
            const user = users[authedUser]
            type = types.QUESTION
            
            if(Object.keys(user.answers).includes(q_id)) {
                type = types.RESULTS
            }
        }
        const author = users[question.author]
        
        return {
            question,
            author,
            type
        }
}
export default connect(mapStateToProps)(QuestionCard)
    