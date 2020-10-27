class App extends React.Component {
    render() {
        return ( <Dashboard /> );
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <h1> Hello React World! </h1>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));