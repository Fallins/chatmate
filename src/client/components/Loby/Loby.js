import React, { Component } from 'react'
import { connect } from 'react-redux'
import { rooms } from '../../common/settings/setting'
import './Loby.less'

class Loby extends Component {
    constructor(props) {
        super(props)

        if (!props.name) props.history.push('/')
    }

    render() {
        return (
            <div className="rooms">
                {rooms.map(room => (
                    <div
                        key={room}
                        className={`room ${room}`}
                        onClick={() => this.props.history.push('/chat')}
                    >
                        <p>{room.toUpperCase()}</p>
                    </div>
                ))}
            </div>
        )
    }
}

const mapS2P = state => ({
    name: state.user.name
})

export default connect(mapS2P)(Loby)
