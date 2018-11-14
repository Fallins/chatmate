import React, { Component } from 'react'
import {
    Grid,
    Row,
    Col,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { rooms } from '../../common/settings/setting'
// import { receiveMessage } from '../../actions'
import { sendMsg } from '../../utils/utils'
import './Chatroom.less'

const MsgList = ({ msgs }) =>
    msgs.map((msg, idx) => (
        <Msg key={idx} name={msg.name} content={msg.content} />
    ))
const Msg = ({ name, content }) => (
    <li>
        <div className="name">{name}</div>
        <div className="content">{content}</div>
    </li>
)
const Input = ({ val, onChangeHandler, onSendHandler }) => {
    const onEnter = e => {
        if (e.which == 13) onSendHandler()
    }
    return (
        <div className="input">
            <input
                type="text"
                onChange={onChangeHandler}
                className="textfield"
                value={val}
                onKeyDown={onEnter}
            />
            <Button onClick={onSendHandler} bsStyle="primary">
                Send
            </Button>
        </div>
    )
}
const Rooms = ({ active, roomChange }) => (
    <ul>
        {rooms.map(room => (
            <li
                onClick={() => roomChange(room)}
                className={room == active ? 'active' : ''}
                key={room}
            >
                {room.toUpperCase()}
            </li>
        ))}
    </ul>
)

class Chatroom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msgs: props.msgs,
            msg: '',
            room: 'system',
            name: props.name
        }
    }

    sendHandler = () => {
        const { room, msg } = this.state
        const { name } = this.props
        sendMsg(room, name, msg)
        this.setState({ msg: '' })
    }

    onChangeHandler = e => this.setState({ msg: e.target.value })

    onRoomChangeHandler = room => this.setState({ room })

    static getDerivedStateFromProps(nextProps, state) {
        let hasChange = false
        let newState = {}

        if (nextProps.msgs != state.msgs) {
            hasChange = true
            newState.msgs = nextProps.msgs
        }

        if (!nextProps.name) {
            nextProps.history.push('/')
        }

        return hasChange ? { ...state, ...newState } : { ...state }
    }

    render() {
        const { msgs, room, msg } = this.state
        return (
            <div className="chatroom">
                <Grid>
                    <Row>
                        <Col className="left-panel" md={4} sm={3} xs={12}>
                            <Col xsHidden={true}>
                                <Rooms
                                    active={room}
                                    roomChange={this.onRoomChangeHandler}
                                />
                            </Col>

                            <Col
                                smHidden={true}
                                mdHidden={true}
                                lgHidden={true}
                            >
                                <DropdownButton
                                    title={room.toUpperCase()}
                                    id="ROOM"
                                    className="dropdownBtn"
                                >
                                    {rooms.map(r => (
                                        <MenuItem
                                            key={r}
                                            onClick={this.onRoomChangeHandler.bind(
                                                this,
                                                r
                                            )}
                                            active={r == room}
                                        >
                                            {r.toUpperCase()}
                                        </MenuItem>
                                    ))}
                                </DropdownButton>
                            </Col>
                        </Col>
                        <Col className="right-panel" xs={12} sm={9} md={8}>
                            <div className="messages">
                                <ul>
                                    <MsgList msgs={msgs[room]} />
                                </ul>
                            </div>

                            {room == 'system' ? null : (
                                <Input
                                    val={msg}
                                    onChangeHandler={this.onChangeHandler}
                                    onSendHandler={this.sendHandler}
                                />
                            )}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapS2P = state => ({
    name: state.user.name,
    msgs: state.msgs
})

export default connect(mapS2P)(Chatroom)
