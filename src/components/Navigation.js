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
                    <Menu.Item name='home' as={NavLink} to="/" exact  style={{fontSize: '20px', color: '#b54800', fontWeight: 'bolder'}}/>
                    <Menu.Item name='new poll' as={NavLink} to="/add" style={{fontSize: '20px', color: '#b54800', fontWeight: 'bolder'}}/>
                    <Menu.Item name='leader board' as={NavLink} to="/leaderboard" style={{fontSize: '20px', color: '#b54800', fontWeight: 'bolder'}}/>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <span>
                                <Image 
                                    src={users[authedUser].avatarURL}
                                    avatar
                                    spaced='right'
                                    verticalAlign='bottom'
                                    size='mini'
                                    circular
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
                                circular
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