// Square.js
import React from 'react';
import '../compunets/Square.css';
import iconO from '../../assets/icon-o.svg';
import iconX from '../../assets/icon-x.svg';

const Square = ({ value, onClick, isWinner }) => (
    <button className={`square piece ${value || "empty"} is-winner ${isWinner}`} onClick={onClick}>
        {value === 'X' ? <img src={iconX} alt="X" /> : value === 'O' ? <img src={iconO} alt="O" /> : null}    </button>
);

export default Square;