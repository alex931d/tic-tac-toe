import './App.css';
import { useState } from 'react';
import { useGameContext } from './utilties/context';
import Game from './utilties/pages/Game';
import './utilties/Universal.css'
import SelectionMenu from './utilties/pages/SelectionMenu';
function App() {
  const {
    history, stepNumber, currentWinner, isGameFinished,
    setHistory, setStepNumber, setCurrentWinner, setIsGameFinished,
    state, setMenuState, setGameState, setFinishState
  } = useGameContext();



  return (
    <div className="App">
      <div className='main-wrapper'>
        {state._Game || state._Finish ? (
          <Game />
        ) : (
          <>
            <SelectionMenu />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
