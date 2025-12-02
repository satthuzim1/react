// import logo from './logo.svg';
import '../App-tic-tac.css';
import { React, useState, useEffect } from 'react';



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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


function counter(squares) {
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
        if ((squares[a] || squares[b]) && squares[a] === squares[b]) {
            if (!squares[c])
                return (c);
        } else if ((squares[b] || squares[c]) && squares[b] === squares[c]) {
            if (!squares[a])
                return (a);
        } else if ((squares[a] || squares[c]) && squares[a] === squares[c]) {
            if (!squares[b])
                return (b);
        }
    }
    return null;
}
function machineTurn(squares) {
    const turn = "O";
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
        if (!squares[4]) {
             return 4
        }else{
            if(!squares[a]) return a;
            if(!squares[b]) return b;
            if(!squares[c]) return c;
        }
        if ((squares[a] === turn || squares[b] === turn) && squares[a] === squares[b]) {
            if (!squares[c])
                return (c);
        } else if ((squares[b] === turn || squares[c] === turn) && squares[b] === squares[c]) {
            if (!squares[a])
                return (a);
        } else if ((squares[a] === turn || squares[c] === turn) && squares[a] === squares[c]) {
            if (!squares[b])
                return (b);
        }
        
    }
    return "q";
}

function Board(props) {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    useEffect(() => {
        const squaress = squares.slice();


        if (!xIsNext) {
            console.log("counter " + counter(squaress))
            console.log("machine " + machineTurn(squaress))
            if (counter(squaress) === null) handleClick(machineTurn(squaress))
            else handleClick(counter(squaress))
        }
    })
    const handleClick = (i) => {
        const squaress = squares.slice();
        if (calculateWinner(squaress) || squaress[i]) {
            return;
        }
        squaress[i] = xIsNext ? 'X' : 'O';
        setSquares(squaress)
        setXIsNext(!xIsNext)
    }

    const Square = (props) => {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        )
    }

    const renderSquare = (i) => {
        return (
            <Square value={squares[i]} onClick={() => { handleClick(i) }} />
        )
    }


    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

function Tic() {
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

export default Tic;
// cmd: npm start
