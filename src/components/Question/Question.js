import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    Header, Form, Radio, Button, Segment
} from 'semantic-ui-react';


import { handleSavingAnswers } from './../../actions/users';

export class Question extends Component {

    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        handleSavingAnswers: PropTypes.func.isRequired,
        question: PropTypes.object.isRequired,
    }

    state = {
        value: ''
    }

    changeHandle = (e, {value}) => this.setState({value})

    submitHandle = e => {
        e.preventDefault()

        if(this.state.value !== '') {
            const {authedUser, question, handleSavingAnswers} = this.props

            handleSavingAnswers(authedUser, question.id, this.state.value)
        }
    }

    render () {

        const {question} = this.props
        const disable = this.state.value === '' ? true : false

        return (
            <Segment>
                <Header as='h4'>
                    Would you rather
                </Header>
                <Form onSubmit={this.submitHandle}>
                    <Form.Field>

                        <Radio 
                            label={question.optionOne.text}
                            name='radioOptions'
                            value='optionOne'
                            checked={this.state.value === 'optionOne'}
                            onChange={this.changeHandle}
                        />

                        <br />

                        <Radio 
                            label={question.optionTwo.text}
                            name='radioOptions'
                            value='optionTwo'
                            checked={this.state.value === 'optionTwo'}
                            onChange={this.changeHandle}
                        />
                    </Form.Field>
                    <Form.Field >

                        <Button 
                            size='small'
                            fluid
                            positive
                            disabled={disable}
                            content='Submit'
                            style={{backgroundColor: '#b54800'}}
                        />
                    </Form.Field>
                </Form>
            </Segment>
        )
    }
}

function mapStateToProps({authedUser}, {match}) {
    return {
        authedUser
    }
}

export default connect(
    mapStateToProps, {handleSavingAnswers}
)(Question)