import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squareValue: this.props.num,
            clickCount: 0
        }
    }

    render() {
        return (
            <button 
                className="square" 
                onClick={()=> this.props.onClick()}
            >
                {this.props.num}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squareValues: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i) {
        const squares = this.state.squareValues.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        if (this.state.xIsNext) {
            squares[i] = "X";
            this.setState({xIsNext: false});
        } else {
            squares[i] = "O";
            this.setState({xIsNext: true});
        }
        this.setState({squareValues: squares});
    }

    calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    renderSquare(i) {
        return <Square 
                    num={this.state.squareValues[i]}
                    onClick={() => this.handleClick(i)}
                />;
    }

    render() {
        const status1 = "Next player: " + this.state.xIsNext ? "X" : "O";

        const winner = this.calculateWinner(this.state.squareValues);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
