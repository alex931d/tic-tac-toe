import '../modals/WinnerScreen.css';
import iconO from '../../../assets/icon-o.svg';
import iconX from '../../../assets/icon-x.svg';
import { useGameContext } from '../../context';
import { clearScore } from '../../utilityFuns';
function WinnerScreen({ outcome, outcomeMsg }) {
    const {
        state, setMenuState, setGameState, setFinishState
    } = useGameContext();
    return (
        <>
            <div className="modal">
                <div className="winner-screen-wrapper">
                    <span className="secoundary-text m">{outcome === 'Tie' ? 'its a tie!' : `${outcome} won!`}</span>
                    <div className="row">
                        {outcome === "Tie" ?
                            (
                                <>

                                </>
                            )
                            :
                            (
                                <>
                                    {outcome === 'O' ? (
                                        <img src={iconO} alt=""></img>
                                    ) : (
                                        <img src={iconX} alt=""></img>
                                    )}
                                </>

                            )
                        }

                        <span className="main-text l" style={{ color: outcome === 'X' ? 'var(--btn-color-turkis)' : 'var(--btn-color-yellow)' }}>{outcomeMsg}</span>
                    </div>
                    <div className="row">
                        <button onClick={() => { setMenuState() }} className="btn secoundary-btn">quit</button>
                        <button onClick={() => { setGameState() }} className="btn main-btn">next round</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WinnerScreen;