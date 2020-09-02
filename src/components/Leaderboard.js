import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Segment, Label, Grid, Header, Image, Divider
} from 'semantic-ui-react'


const colortrophy = ['yellow', 'orange', 'grey']

export class Leaderboard extends Component {

    static propType = {
        boardData: PropTypes.array.isRequired
    }

    render() {
        const {boardData} = this.props

        return (

            <div>
                {boardData.map((user, i) => (
                    <Segment>

                        <Label 
                            icon='trophy' 
                            color={colortrophy[i]} 
                            corner='left'
                        />

                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={4} verticalAlign='middle'>
                                    <Image src={user.avatarURL} />

                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as='h3' textAlign='left'>
                                        {user.name}
                                    </Header>

                                    <Grid>
                                        <Grid.Column width={12}> Answered Questions</Grid.Column>
                                        <Grid.Column width={4}>{user.answerTotal}</Grid.Column>
                                    </Grid>

                                    <Divider />

                                    <Grid>
                                        <Grid.Column width={12}>Created Questions</Grid.Column>
                                        <Grid.Column width={4}>{user.questionTotal}</Grid.Column>
                                    </Grid>
                                </Grid.Column>

                                <Grid.Column width={4} textAlign='center'>

                                    <Segment.Group>
                                        <Header as='h5' block attached='top'>Score</Header>
                                        <Segment>
                                            <Label circular color='green' size='big'>
                                                {user.questionTotal + user.answerTotal}
                                            </Label>
                                        </Segment>
                                    </Segment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Segment>
                ))}
                
            </div>
        )
    }
}

function mapStateToProps({users}) {
    const boardData = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answerTotal: Object.values(user.answers).length,
            questionTotal: user.questions.length,
            total: Object.values(user.answers).length + user.questions.length,
        }))
        .sort((x, y) => x.total - y.total)
        .reverse()
        .slice(0, 3)

    console.log('boardData', boardData)

    return {
        boardData
    }
}

export default connect(mapStateToProps)(Leaderboard)