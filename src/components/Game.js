import React from 'react';

import Board from "./Board";

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

    get isDraw() {
        return this.lastSquares.every((square) => square) && !this.winner;
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
        const history = this.state.history;

        const status = this.isDraw
            ? 'Draw'
            : this.winner
                ? `Winner: ${this.winner}`
                : `Next player: ${this.nextPlayer}`;

        let moves = [];

        if (history.length > 1) {
            moves = history.slice(0, history.length - 1)
                .map((steps, move) => {
                    let text = 'Go to ' + (move ? `move #${move}` : 'game start');

                    return (
                        <li key={move}>
                            <button onClick={() => this.jumpTo(move)}>{text}</button>
                            <Board squares={steps}/>
                        </li>
                    );
                })
        }

        return (
            <div className="game">
                <div className="game-board">
                    <h1 className="game-title">Tic-Tac-Toe</h1>
                    <Board
                        squares={this.lastSquares}
                        winningLine={getWinningLines(this.lastSquares)}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol className="history">{moves}</ol>
                </div>
            </div>
        );
    }
}

function getWinningLines(squares) {
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
            return line;
        }
    }

    return null;
}

function calculateWinner(squares) {
    const line = getWinningLines(squares);

    return line ? line[0] : null;
}

export default Game;
