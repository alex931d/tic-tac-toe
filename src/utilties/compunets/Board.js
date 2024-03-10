// Board.js
import React from 'react';
import '../compunets/Board.css';
import Square from './Square';

const Board = ({ squares, onClick, winnerLine }) => (
    <div className="board">
        {squares.map((value, index) => (
            <Square key={index} value={value} onClick={() => onClick(index)} isWinner={winnerLine && winnerLine.includes(index)} />
        ))}
    </div>
);

export default Board;