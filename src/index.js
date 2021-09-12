import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);

        this.state = {
            history: [
                Array(9).fill(null),
            ],
            xIsNext: true,
        }

        this.handleClick = this.handleClick.bind(this)
    }


    get nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    get lastSquares() {
        const {history} = this.state;

        return history[history.length - 1];
    }

    get winner() {
        return calculateWinner(this.lastSquares)
    }

    handleClick(i) {
        const squares = [...this.lastSquares];

        if (this.winner || squares[i]) {
            return;
        }

        const history = [...this.state.history];
        squares[i] = this.nextPlayer;

        history.push(squares)
        history.concat()

        this.setState((state) => ({
            history: history,
            xIsNext: !state.xIsNext,
        }))
    }

    jumpTo(step) {
        const history = this.state.history.slice(0, step + 1)

        this.setState((_) => ({
            history: history,
            xIsNext: step % 2 === 0,
        }))
    }

    render() {
        const status = this.winner
            ? `Winner: ${this.winner}`
            : `Next player: ${this.nextPlayer}`;

        let moves = [];

        if (this.state.history.length > 1) {
            moves = this.state.history.map((steps, move) => {
                let text = move ? `Go to move #${move}` : 'Go to game start';

                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{text}</button>
                    </li>
                );
            })
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.lastSquares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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

    for (let line of lines) {
        const [a, b, c] = line;

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null;
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
