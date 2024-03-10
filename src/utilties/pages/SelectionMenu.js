import React, { useState } from 'react';
import '../pages/SelectionMenu.css';
import logo from '../../assets/logo.svg';
import iconX from '../../assets/icon-x.svg';
import iconO from '../../assets/icon-o.svg';
import { useGameContext } from '../context';

function SelectionMenu({ }) {
    const {
        gameSettings, setGameSettings,
        state, setMenuState, setGameState, setFinishState,
    } = useGameContext();
    const [starter, setStarter] = useState(gameSettings._Starter);
    const handleStarterChange = (square) => {
        setStarter(square);
    };
    const handleSubmitSettings = (mode) => {
        setGameSettings({ _GameType: mode, _Starter: starter })
    }
    return (
        <>
            <div className="selection-menu centerlized">
                <div className="selection-menu-inner">
                    <img src={logo} alt='logo'></img>
                    <div className='pick-player-container'>
                        <span className='secoundary-text m'>pick player 1's mark</span>
                        <div className='player-picker-wrapper'>
                            <button
                                type="button"
                                className={`btn ${starter === "X" ? 'selected' : ''}`}
                                onClick={() => handleStarterChange("X")}
                            >
                                <img src={iconX} alt=''></img>
                            </button>
                            <button
                                type="button"
                                className={`btn ${starter === "O" ? 'selected' : ''}`}
                                onClick={() => handleStarterChange("O")}
                            >
                                <img src={iconO} alt=''></img>
                            </button>
                        </div>
                        <span className="secoundary-text m">remember {starter} goes first</span>
                    </div>
                    <button onClick={() => {
                        handleSubmitSettings("cpu")
                        setGameState();
                    }} className='btn main-btn'>new game (vs cpu)</button>
                    <button
                        onClick={() => {
                            handleSubmitSettings("pvp")
                            setGameState();
                        }} className='btn third-btn'>new game (vs player)</button>
                </div>
            </div>
        </>
    )
}

export default SelectionMenu;