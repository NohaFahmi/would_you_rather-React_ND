import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { Header, Segment, Form, Radio, Button } from 'semantic-ui-react';


import { handleSavingAnswers } from '../../actions/shared'

class Question extends Component {

    static propTypes = {

        authedUser: PropTypes.string.isRequired,
        handleSavingAnswers: PropTypes.func.isRequired,
        question: PropTypes.object.isRequired
    }

    state = {
        value: ''
    }

    handleChange = (e, {value}) => this.setState({value})

    submitHandle = e => {

        e.preventDefault()

        if(this.state.value !== '') {

            const {authedUser, question, handleSavingAnswers} = this.props
            handleSavingAnswers(authedUser, question.id, this.state.value)
        }
    }
    render() {

        const {question} = this.props
        // console.log(this.props)
        const disable = this.state.value === '' ? true : false
        return (
            <Segment>
                <Header as='h5'>
                    Would you rather
                </Header>
                <Form onSubmit={this.submitHandle}>
                    <Form.Field>
                        <Radio 
                            label={question.optionOne.text}
                            name="optionsgroup"
                            value='optionOne'
                            checked={this.state.value === 'optionOne'}
                            onChange={this.handleChange}
                        />
                        <br />
                        <Radio 
                           label={question.optionTwo.text}
                            name="optionsgroup"
                            value='optionTwo'
                            checked={this.state.value === 'optionTwo'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button 
                            color='green'
                            size='tiny'
                            fluid
                            positive
                            disabled={disable}
                            content='Submit'
                        />
                    </Form.Field>
                </Form>
            </Segment>
        )
    }
}

function mapStateToProps({authedUser}, {match}) {
    // const {q_id} = match.params
    
    return {
        authedUser,
        // q_id
    }
}
export default connect(
    mapStateToProps,
    {handleSavingAnswers})(Question)