
import React, { createContext, useContext, useEffect, useState } from 'react';
import { clearScore } from './utilityFuns';
const initalState = {
    _Menu: true,
    _Game: false,
    _Finish: false,
}

const defaultGameSettings = {
    _GameType: "pvp",
    _Starter: 'X',
}
const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [state, setState] = useState(initalState);
    const [scores, setScores] = useState({});
    const reset = () => {
        setHistory([{ squares: Array(9).fill(null) }])
        setStepNumber(0)
    }
    const reverse = () => {
        if (stepNumber > 0) {
            setStepNumber((prevStep) => prevStep - 1);
            setIsGameFinished(false);
            setCurrentWinner(undefined);
            setHistory((prevHistory) => prevHistory.slice(0, stepNumber));
            if (stepNumber === 1) {
                reset();
            }
        }
    };
    const setMenuState = () => {
        reset();
        clearScore();
        setScores({ playerX: 0, playerO: 0, ties: 0 });
        setIsGameFinished(false)
        setCurrentWinner(undefined)
        setState({
            _Menu: true,
            _Game: false,
            _Finish: false,
        });
    };

    const setGameState = () => {
        reset();
        setIsGameFinished(false)
        setCurrentWinner(undefined)
        setState({
            _Menu: false,
            _Game: true,
            _Finish: false,
        });
    };

    const setFinishState = () => {
        setState({
            _Menu: false,
            _Game: false,
            _Finish: true,
        });
    };
    const [gameSettings, setGameSettings] = useState(defaultGameSettings);
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [currentWinner, setCurrentWinner] = useState(undefined);

    useEffect(() => {
        const storedScores = JSON.parse(localStorage.getItem('scores'));
        if (storedScores) {
            setScores((prevScores) => ({
                ...prevScores,
                ...storedScores,
            }));
        }
        else {
            setScores({ playerX: 0, playerO: 0, ties: 0 })
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('scores', JSON.stringify(scores));
    }, [scores]);

    return (
        <GameContext.Provider value={{
            history, stepNumber, currentWinner, isGameFinished, setHistory, setStepNumber, setCurrentWinner, setIsGameFinished,
            state, setMenuState, setGameState, setFinishState,
            gameSettings, setGameSettings,
            reset, reverse, scores, setScores
        }}>
            {children}
        </GameContext.Provider>
    );
};
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};