import React from 'react';

import Square from "./Square";

class Board extends React.Component {
    renderSquare(i) {
        const {squares, winningLine, onClick} = this.props;

        return <Square
            key={`col-${i}`}
            value={squares[i]}
            winning={winningLine && winningLine.includes(i)}
            onClick={() => onClick ? onClick(i) : {}}
        />;
    }

    render() {
        const rows = [];

        for (let row = 0; row < 3; row++) {
            const cols = []

            for (let col = 0; col < 3; col++) {
                cols.push(this.renderSquare(3 * row + col));
            }

            rows.push(<div key={`row-${row}`} className="board-row">{cols}</div>);
        }

        return <div className="board">{rows}</div>;
    }
}

export default Board;