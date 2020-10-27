class App extends React.Component {
    render() {
        return ( <Dashboard /> );
    }
}

class Dashboard extends React.Component {    
    constructor(props) {
        super(props) 
        
        this.state = {
            x: 0,
            y: 0,
        }

        // allow functions to access 'this' object
        this.updateState = this.updateState.bind(this)

        this.events = new EventSource("/api/events")
        this.events.addEventListener("test", this.updateState)        
    }

    updateState(e) {
        var data = JSON.parse(e.data)
        this.setState({x: data.X, y: data.Y})
        console.log(e.data)
    }

    render() {
        return (
            <div>
                <h1> Hello React World! </h1>
                <h1> {this.state.x} {this.state.y} </h1>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));