// import styles from '../css/app.css'; 

class App extends React.Component {
    render() {
        return ( <Dashboard /> );
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
            var entry = row.map(function (color, j) {
                return (
                <td key={j}> <Cell color={color}/> </td>
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

class Cell extends React.Component {
    constructor(props) {
        super(props)
    } 

    render() {
        const whiteBlock = {
            background: "#fff",
            border: "1px solid #999",
            float: "left",
            fontSize: "24px",
            fontWeight: "bold",
            lineHeight: "34px",
            height: "34px",
            marginRight: "-1px",
            marginTop: "-1px",
            padding: "0",
            textAlign: "center",
            width: "34px",
        }

        const blackBlock = {
            background: "#000",
            border: "1px solid #999",
            float: "left",
            fontSize: "24px",
            fontWeight: "bold",
            lineHeight: "34px",
            height: "34px",
            marginRight: "-1px",
            marginTop: "-1px",
            padding: "0",
            textAlign: "center",
            width: "34px",
        }

        var myStyle
        if (this.props.color == 0) {
            myStyle = whiteBlock
        } else if (this.props.color == 1) {
            myStyle = blackBlock
        } else {
            myStyle = whiteBlock
        }
        
        return (
            <div style={myStyle}> </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))