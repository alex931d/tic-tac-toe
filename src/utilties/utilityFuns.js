export function calculateWinner(squares) {
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
            return {
                winner: squares[a],
                line: [a, b, c]
            };
        }
    }
    // Check for a tie
    if (squares.every(square => square !== null)) {
        return { winner: 'Tie', line: [] };
    }
    return null;
}
export function clearScore() {
    localStorage.setItem('scores', JSON.stringify({ playerX: 0, playerO: 0, ties: 0 }));
}