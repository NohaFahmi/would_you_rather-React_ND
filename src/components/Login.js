import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';

import { 
    Header, Grid, Image, Form, Container, Segment, Dimmer, Loader
} from 'semantic-ui-react';

import {setAuthedUser} from '../actions/authedUser'

class Login extends Component {

    state = {
        loading : false,
    }

    handleLoading = () => {
        this.setState({loading: true})
    }

    render() {
        
        return (
            <Container>
                <Segment>
                    <LoginHeader />
                    <LoginLayoutContianer 
                        image={<LogoImg />}
                        form={<ConnectedLoginForm onLoading={this.handleLoading}/>}
                        loading={this.state.loading}
                    />
                </Segment>
                <footer>
                    <a href='/'> this App created for Udacity, Made by NOHA MOHAMMED</a>
                </footer>
            </Container>
        )
    }
}
//building LoginHeader Component
const LoginHeader = () => (
    <Header as='h2' block attached='top' textAlign='center'>
        <Header.Content>Welcome To WOULD YOU RATHER App!</Header.Content>
        <Header.Subheader>Please, Sign In to continue</Header.Subheader>
    </Header>
)

//building LoginLayoutContianer Component
const LoginLayoutContianer = ({image, form, loading}) => (

    <div>
        <Grid padded textAlign='center'>
            <Grid.Row>
                <Grid.Column width={16}>
                    {loading === true && (
                        <Dimmer active inverted>
                            <Loader inverted content='Loading'/>
                        </Dimmer>
                    )}
                    {image}
                    <br />
                    {form}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

//build LogoImage
const LogoImg = () => (
    <Image 
        src="https://avatars.dicebear.com/api/jdenticon/logoImg.svg" 
        size="small" 
        centered 
        
    />
)

//building LoginForm component
class LoginForm extends Component {

    static propTypes = {
        onLoading: PropTypes.func.isRequired
    }

    state = {
        value: ''
    }

    onChange = (e, {value}) => {
        this.setState({value})
    }

    handleLogin = e => {
        e.preventDefault()
        const {onLoading, setAuthedUser} = this.props
        const authedUser = this.state.value

        new Promise((res, rej) => {
            onLoading()
            setTimeout(() => res(), 500)

        }).then(() => setAuthedUser(authedUser))
    }

    generateOptions = () => {
        const {users} = this.props

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: {avatar: true, src: user.avatarURL}
        }))
    }
    render() {
        const { value } = this.state
        const disable = value === '' ? true : false

        return (
            <Form onSubmit={this.handleLogin}>
                <Header as='h4' color='green'>
                    Sign In
                </Header>
                <Form.Dropdown 
                    placeholder='Select A Friend' 
                    value={value}
                    onChange={this.onChange}
                    options={this.generateOptions()}
                    required 

                />
                <Form.Button content='Login' positive fluid disabled={disable} />
            </Form>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.values(users)
    }
}

const ConnectedLoginForm = connect(
    mapStateToProps,
    {setAuthedUser}
)(LoginForm)
export default Login