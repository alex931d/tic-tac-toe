import Board from "../compunets/Board";
import { useState } from "react";
import React from "react";
import { useGameContext } from "../context";
import '../pages/Game.css'
import Menu from "../compunets/game-compunets/Menu";
import WinnerScreen from "../compunets/modals/WinnerScreen";
import Score from "../compunets/game-compunets/Score";
import { calculateWinner } from "../utilityFuns";
import { findBestMove } from "../cpu";

function Game() {
    const [aiWaiting, setAiWaiting] = useState(false);
    const {
        history, stepNumber, currentWinner, isGameFinished,
        setHistory, setStepNumber, setCurrentWinner, setIsGameFinished,
        state, setMenuState, setGameState, setFinishState,
        reset, gameSettings, scores, setScores
    } = useGameContext();
    const xIsNext = stepNumber % 2 === 0; const currentPlayer = gameSettings._GameType === 'cpu' ? gameSettings._Starter : (xIsNext ? gameSettings._Starter : (gameSettings._Starter === 'X' ? 'O' : 'X'));
    const handleClick = (i) => {
        if (!isGameFinished && state._Game && !aiWaiting) {
            const currentHistory = history.slice(0, stepNumber + 1);
            const currentSquares = currentHistory[currentHistory.length - 1].squares.slice();

            if (currentSquares[i] !== null) {
                return;
            }
            currentSquares[i] = currentPlayer;
            setHistory([...currentHistory, { squares: currentSquares }])
            if (calculateWinner(currentSquares)) {
                setCurrentWinner(calculateWinner(currentSquares));
                setIsGameFinished(true)
                setFinishState();


                const winner = calculateWinner(currentSquares).winner;
                if (winner === 'Tie') {
                    setScores((prevScores) => ({
                        ...prevScores,
                        ties: prevScores.ties + 1,
                    }));
                } else if (winner === 'O' || winner === 'X') {
                    setScores((prevScores) => ({
                        ...prevScores,
                        [winner === 'X' ? 'playerX' : 'playerO']: prevScores[winner === 'X' ? 'playerX' : 'playerO'] + 1,
                    }));
                }

            };
            setStepNumber(currentHistory.length);

            if (gameSettings._GameType === "cpu" && !calculateWinner(currentSquares)) {
                setAiWaiting(true);
                setTimeout(() => {
                    const bestMove = findBestMove(currentSquares, currentPlayer === 'X' ? 'O' : 'X', currentPlayer);
                    const aiMove = currentPlayer === 'X' ? 'O' : 'X';
                    currentSquares[bestMove] = aiMove;
                    setHistory([...currentHistory, { squares: currentSquares }]);
                    setStepNumber(currentHistory.length);

                    if (calculateWinner(currentSquares)) {
                        setCurrentWinner(calculateWinner(currentSquares));
                        setIsGameFinished(true)
                        setFinishState();


                        const winner = calculateWinner(currentSquares).winner;
                        if (winner === 'Tie') {
                            setScores((prevScores) => ({
                                ...prevScores,
                                ties: prevScores.ties + 1,
                            }));
                        } else if (winner === 'O' || winner === 'X') {
                            setScores((prevScores) => ({
                                ...prevScores,
                                [winner === 'X' ? 'playerX' : 'playerO']: prevScores[winner === 'X' ? 'playerX' : 'playerO'] + 1,
                            }));
                        }

                    }
                    setAiWaiting(false);
                }, 1000);

            }

        }
    };
    const currentSquares = history[stepNumber].squares;

    return (
        <>
            <div className="game centerlized">
                {currentWinner && isGameFinished && (
                    <>
                        <div className="overlay"></div>
                        <div className="winner-screen">
                            <WinnerScreen outcome={currentWinner.winner} outcomeMsg={currentWinner.winner === 'Tie' ? 'It\'s a tie!' : `takes the round`} />
                        </div>
                    </>
                )}
                <div className="game-inner">
                    <Menu currentSquare={currentPlayer} />
                    <Board squares={currentSquares} onClick={handleClick} isGameFinished={isGameFinished} winnerLine={currentWinner ? currentWinner.line : []} />
                    <Score settings={gameSettings} currentPlayer={currentPlayer} scores={scores} />
                </div>
            </div>
        </>
    )
}
export default Game;