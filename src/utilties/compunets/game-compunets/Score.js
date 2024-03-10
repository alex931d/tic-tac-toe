import '../game-compunets/Score.css'
function Score({ settings, currentPlayer, scores }) {

    return (
        <>
            <div className="score-container">
                <div className="score-box you">
                    <span>{currentPlayer} you</span>
                    <span className="number medium-text">{scores.playerX}</span>
                </div>
                <div className="score-box ties">
                    <span>ties</span>
                    <span className="number medium-text">{scores.ties}</span>
                </div>
                <div className="score-box enemy">
                    <span>{currentPlayer === 'X' ? 'O' : 'X'} vs {settings._GameType === "pvp" ? "ply" : "cpu"}</span>
                    <span className="number medium-text">{scores.playerO}</span>
                </div>
            </div>
        </>
    )
}
export default Score;