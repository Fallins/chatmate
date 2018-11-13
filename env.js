const config = {
    dev: {
        url: 'http://localhost:4000'
    },
    production: {
        url: 'https://react-chatmate.herokuapp.com/'
    }
}

module.exports = env => config[env]