import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';

import { Tab, Container } from 'semantic-ui-react'

import QuestionCard from './QuestionCard'
// import CardContent from './CardContent';




class Dashboard extends Component {

    static propTypes = {
        userQuestions: PropTypes.object.isRequired
    }

    render() {


        const { userQuestions } = this.props

        console.log(this.props)
        return (

            <Container style={{ padding: '30px' }}>

                <Tab panes={panes({ userQuestions })} className='tab' />

                {/* <ul className='qIdsList'>
                    {this.props.questionsIds.map((id) => (
                        <li key={id}>
                            <QuestionCard id={id} />
                        </li>
                        
                    ))}
                        
                </ul> */}
            </Container>
        )
    }
}

const panes = props => {
    const { userQuestions } = props

    return [
        {
            menuItem: 'Unanswered Questions',
            render: () => (
                <Tab.Pane style={{ backgroundColor: '#b54800' }}>
                    {userQuestions.unanswered.map(q => (
                        <QuestionCard
                            key={q.id}
                            q_id={q.id}
                            // color={color.blue.hex}
                            unanswered={false}

                        >
                            {/* <CardContent 
                                    question={q}
                                    unanswered={false}
                                    color = {color.blue.name}
                                /> */}


                        </QuestionCard>
                    ))}
                </Tab.Pane>
            )
        },

        {
            menuItem: 'Answered Questions',
            render: () => (
                <Tab.Pane style={{ backgroundColor: '#007f7f' }}>
                    {userQuestions.answered.map(q => (
                        <QuestionCard
                            key={q.id}
                            q_id={q.id}
                            unanswered={true}
                        // color={color.green.hex}
                        >
                            {/* <CardContent 
                                    question={q}
                                    unanswered={true}
                                    color = {color.green.name}
                                /> */}
                        </QuestionCard>
                    ))}
                </Tab.Pane>
            )
        },
    ]
}
function mapStateToProps({ authedUser, users, questions }) {
    const answeredIds = Object.keys(users[authedUser].answers)
    const answered = Object.values(questions)
        .filter(q => answeredIds.includes(q.id))
        .sort((x, y) => y.timestamp - x.timestamp)

    const unanswered = Object.values(questions)
        .filter(q => !answeredIds.includes(q.id))
        .sort((x, y) => y.timestamp - x.timestamp)
    return {

        userQuestions: {
            answered,
            unanswered
        }
        // questionsIds: Object.keys(questions)
        // .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)
