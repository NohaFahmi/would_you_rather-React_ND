import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {

    render() {
        
        return (
            <div>
                <h3>This is Login Page</h3>
            </div>
        )
    }
}

export default connect()(Login)