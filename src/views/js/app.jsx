class App extends React.Component {
    render() {
        return ( <Dashboard /> );
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            x: 0,
            y: 0,

            m: props.m,
            n: props.n,

            table: this.newTable(props.m, props.n)
        }

        // allow functions to access 'this' object
        this.updateState = this.updateState.bind(this)
        
        this.events = new EventSource("/api/events")
        this.events.addEventListener("hello", function(e) {console.log("hello")})
        this.events.addEventListener("test", this.updateState)
    }

    updateState(e) {
        var data = JSON.parse(e.data)

        this.setState({
            x: data.X, y: data.Y,
            table: this.updateTable(this.state.table, data.X, data.Y, 1)
        })
    }

    updateTable(table, i, j, val) {
        table[i][j] = val
        return table
    }

    newTable(m, n) {
        var table = new Array()
        for (let i = 0; i < m; i++) {
            table[i] = new Array()
            for (let j = 0; j < n; j++) {
                table[i][j] = 0
            }
        }

        return table
    }

    render() {
        var rows = this.state.table.map(function (row, i) {
            var entry = row.map(function (val, j) {
                return (
                <td key={j}> {val} </td>
                )
            })
            return (
            <tr key={i}> {entry} </tr>
            )
        })
        return (
            <div>
                <h1> {this.state.x} {this.state.y} </h1>
                <table>
                    <tbody> {rows} </tbody>
                </table>
            </div>
        )
    }
}

class Dashboard extends React.Component {    
    render() {
        return (
            <div>
                <h1> Hello React World! </h1>
                <Table m={12} n={15} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));