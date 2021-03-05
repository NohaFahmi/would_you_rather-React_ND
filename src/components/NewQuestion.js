import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {

    Segment, Header, Grid, Dimmer, Loader, Form, Divider, Container
} from 'semantic-ui-react'


import { handleSavingQuestions } from './../actions/questions';

export class NewQuestion extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        handleSavingQuestions: PropTypes.func.isRequired
    }

    state ={
        valid: false,
        isLoading: false,
        option1: '',
        option2: ''
    }

    changeHandle = e => {
        this.setState({ [e.target.id]: e.target.value})
    }

    submitHandle = e => {
        e.preventDefault()
        const {authedUser, handleSavingQuestions} = this.props
        const {option1, option2} = this.state

        new Promise((res, rej) => {
            this.setState({isLoading: true})
            handleSavingQuestions(option1, option2, authedUser)
            setTimeout(() => res('success'), 1000)
        }).then(() => {
            this.setState({
                option1: '',
                option2: '',
            })

            this.setState({valid: true})
        })
    }

    render() {
        console.log('this.props', this.props)
        const disable = this.state.option1 === '' || this.state.option2 === ''

        if(this.state.valid === true) {
            return <Redirect to='/' />
        }

        return (

            <Container style={{marginTop: '50px'}}>
                <Segment color='teal'>
                    <Header as='h3' textAlign='left' block attached='top' color='teal'>
                        Create a new Poll
                    </Header>

                    <Grid padded>
                        <Grid.Column>
                            {this.state.isLoading && (
                                <Dimmer active inverted>
                                    <Loader content='updating' />
                                </Dimmer>
                            )}

                            <h4>Complete the Question: </h4>

                            <p>
                                <strong>Would you rather...</strong>
                            </p>

                            <Form onSubmit={this.submitHandle}>
                                <Form.Input 
                                    id='option1'
                                    placeholder='Enter option one...'
                                    value={this.state.option1}
                                    onChange={this.changeHandle}
                                    required
                                />

                                <Divider horizontal>Or</Divider>

                                <Form.Input 
                                    id='option2'
                                    placeholder='Enter option two...'
                                    value={this.state.option2}
                                    onChange={this.changeHandle}
                                    required
                                />

                                <Form.Button positive size='small' style={{backgroundColor: '#007f7f'}} disabled={disable}>
                                    Submit
                                </Form.Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>
             </Container>

        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps, {handleSavingQuestions})(NewQuestion)