import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {
    Menu, Image, Button, Container,
} from 'semantic-ui-react'

import {setAuthedUser} from '../actions/authedUser'

class Navigation extends Component {

    handleLogout = e => {
        e.preventDefault();
        this.props.setAuthedUser(null)
    }

    render() {

        const {authedUser, users} = this.props
        
        return (

         
            <Container>
                <Menu>
                    <Menu.Item name='home' as={NavLink} to="/" exact />
                    <Menu.Item name='new poll' as={NavLink} to="/add"/>
                    <Menu.Item name='leader board' as={NavLink} to="/leaderboard"/>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <span>
                                <Image 
                                    src={users[authedUser].avatarURL}
                                    avatarURL
                                    spaced='right'
                                    verticalAlign='bottom'
                                />
                                {users[authedUser].name}
                            </span>
                        </Menu.Item>
                        <Menu.Item>
                            <Button
                                content='Logout'
                                labelPosition='right'
                                basic
                                compact
                                icon='log out'
                                size='mini'
                                onClick={this.handleLogout}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Container>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        authedUser,
        users
    }
}
export default connect(mapStateToProps, {setAuthedUser})(Navigation)