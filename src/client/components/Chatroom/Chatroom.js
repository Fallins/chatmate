import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
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
const Input = ({ val, onChangeHandler, onSendHandler }) => (
    <div className="input">
        <input
            type="text"
            onChange={onChangeHandler}
            className="textfield"
            value={val}
        />
        <Button onClick={onSendHandler} bsStyle="primary">
            Send
        </Button>
    </div>
)
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
            room: 'system'
        }
    }

    sendHandler = () => {
        // this.setState({
        //     msgs: [
        //         ...this.state.msgs,
        //         { name: 'test', content: this.state.msg }
        //     ]
        // })
        const { room, msg } = this.state
        const { name } = this.props
        sendMsg(room, name, msg)
    }

    onChangeHandler = e => this.setState({ msg: e.target.value })

    onRoomChangeHandler = room => this.setState({ room })

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.msgs != state.msga) {
            return {
                ...state,
                msgs: nextProps.msgs
            }
        }

        return {
            ...state
        }
    }

    render() {
        const { msgs, room, msg } = this.state
        return (
            <div className="chatroom">
                <Grid>
                    <Row>
                        <Col
                            className="left-panel"
                            md={4}
                            sm={3}
                            xsHidden={true}
                        >
                            <Rooms
                                active={room}
                                roomChange={this.onRoomChangeHandler}
                            />
                        </Col>
                        <Col className="right-panel" xs={12} sm={9} md={8}>
                            <div className="messages">
                                <ul>
                                    <MsgList msgs={msgs[room]} />
                                </ul>
                            </div>

                            <Input
                                val={msg}
                                onChangeHandler={this.onChangeHandler}
                                onSendHandler={this.sendHandler}
                            />
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

// [
//     {
//         name: 'Ben',
//         content:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, sequi!'
//     },
//     {
//         name: 'Jay',
//         content:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, sequi!'
//     },
//     {
//         name: 'Jane',
//         content:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex obcaecati velit delectus tenetur placeat laudantium.'
//     },
//     {
//         name: 'Ben',
//         content: 'Lorem, ipsum dolor.'
//     },
//     {
//         name: 'Jane',
//         content:
//             'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis ipsum quos facere debitis expedita quisquam sit inventore deleniti laborum aut!'
//     },
//     {
//         name: 'Jay',
//         content: 'Lorem ipsum dolor sit amet consectetur.'
//     },
//     {
//         name: 'Jane',
//         content:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, magni suscipit. Veritatis inventore tenetur reiciendis, at facere placeat sint dolorem, ut dolor earum maiores atque illum ea dignissimos, tempora hic.'
//     }
// ]
