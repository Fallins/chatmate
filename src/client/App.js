import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { init } from './utils/utils'
import store from './store'
import './App.less'
import Nav from './components/Nav/Nav'
import Landing from './components/Landing/Landing'
import Chatroom from './components/Chatroom/Chatroom'
import Loby from './components/Loby/Loby'

class App extends Component {
    componentDidMount() {
        init(store.dispatch)
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Nav />

                        <Route exact path="/" component={Landing} />
                        <Route exact path="/loby" component={Loby} />
                        <Route exact path="/chat" component={Chatroom} />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
