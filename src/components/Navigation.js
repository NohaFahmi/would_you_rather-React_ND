import React, { Component } from 'react'
import { connect } from 'react-redux'

class Navigation extends Component {

    render() {
        
        return (
            <div>
                <h3>This is Navigation Part</h3>
            </div>
        )
    }
}

export default connect()(Navigation)