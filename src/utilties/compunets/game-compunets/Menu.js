import logo from '../../../assets/logo.svg';
import iconX from '../../../assets/icon-x.svg';
import iconO from '../../../assets/icon-o.svg';
import resertIcon from '../../../assets/icon-restart.svg';
import { useGameContext } from '../../context';
import '../game-compunets/Menu.css'
function Menu({ currentSquare }) {
    const {
        state, setMenuState, setGameState, setFinishState,
        reverse
    } = useGameContext();

    return (
        <>
            <div className="menu">
                <nav className="menu-inner">
                    <img src={logo} alt='logo'></img>
                    <div className='btn turn-indicator'>
                        {currentSquare === "X" ? (
                            <img src={iconX} alt=''></img>
                        ) : (
                            <img src={iconO} alt=''></img>
                        )}
                        <span>turn</span>
                    </div>
                    <button onClick={() => { reverse() }} className='btn secoundary-btn'>
                        <img src={resertIcon} alt=''></img>
                    </button>
                </nav>
            </div>
        </>
    )
}
export default Menu;