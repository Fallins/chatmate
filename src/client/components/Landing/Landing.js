import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../actions'
import { Button, Modal } from 'react-bootstrap'
import { greet } from '../../utils/utils'
import './Landing.less'

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            name: props.name
        }
    }

    startChat = () => {
        const { name } = this.state
        const { users } = this.props
        console.log(this.props)

        if (users.find(user => user == name)) {
            alert('User already exist. Please choose another name to chat.')
        } else {
            this.props.addUser(name)
            greet(name)
            this.props.history.push('/loby')
        }
    }

    onCloseHandler = () => this.setState({ show: false })
    onOpenHandler = () => this.setState({ show: true })
    onChangeHandler = e => this.setState({ name: e.target.value })

    render() {
        const { name } = this.state
        return (
            <div className="landing">
                {name ? (
                    <Button className="btn start" bsStyle="info" bsSize="large">
                        {`Hello, ${name}`}
                    </Button>
                ) : (
                    <Button
                        onClick={this.onOpenHandler}
                        className="btn start"
                        bsStyle="info"
                        bsSize="large"
                    >
                        Start
                    </Button>
                )}
                <Modal
                    bsSize="small"
                    show={this.state.show}
                    onHide={this.onCloseHandler}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Chatmate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className="textfield"
                            placeholder="Please enter your name"
                            value={this.state.name}
                            onChange={this.onChangeHandler}
                            onKeyDown={e =>
                                e.which == 13 ? this.startChat() : null
                            }
                        />
                        <Button bsStyle="success" onClick={this.startChat}>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapS2P = state => ({
    name: state.user.name,
    users: state.info.users
})

export default connect(
    mapS2P,
    { addUser }
)(Landing)
