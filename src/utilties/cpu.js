import { calculateWinner } from "./utilityFuns";

export function minimax(board, depth, isMaximizingPlayer, aiPlayer, humanPlayer) {
    const winnerResult = calculateWinner(board);
    const winner = winnerResult ? winnerResult.winner : null;


    if (winner) {
        return winner === aiPlayer ? 1 : winner === humanPlayer ? -1 : 0;
    }

    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = aiPlayer;
                const evaluation = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
                board[i] = null;
                maxEval = Math.max(maxEval, evaluation);
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = humanPlayer;
                const evaluation = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
                board[i] = null;
                minEval = Math.min(minEval, evaluation);
            }
        }
        return minEval;
    }
}
export const findBestMove = (board, aiPlayer, humanPlayer) => {
    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = aiPlayer;

            const result = calculateWinner(board);
            const humanCanWin = result && result.winner === humanPlayer;

            const moveVal = minimax(board, 0, false, aiPlayer, humanPlayer);

            board[i] = null;

            if ((humanCanWin && moveVal > bestVal) || (!humanCanWin && moveVal > bestVal)) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }

    return bestMove;
};