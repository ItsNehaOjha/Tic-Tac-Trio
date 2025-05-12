const hardAlgorithm = () => {

    //console.log("hard function is active");

    const commonPlayerMoveHard = (box, currentPlayer, nextPlayer) => {
        
        if (box.innerText === "") {
            const lastMove = parseInt(box.dataset.index);
            box.innerText = currentPlayer;
            box.disabled = true;
            //console.log("Move made by:", currentPlayer);
            let winnerFound = checkWinner();
            //console.log("Winner found:", winnerFound);
            if (!winnerFound) {
                //console.log("No winner yet, calling computer play for hard level...");
                setTimeout(() => {
                    //console.log("Inside setTimeout, before calling computerPlayHard");
                    computerPlayHard(lastMove);
                    //console.log("Inside setTimeout, after calling computerPlayHard");
                }, 500);
            }
        }
    };

    const computerPlayHard = (lastPlayerMove) => {
        // Get current board state
        const board = Array.from(boxes).map(box => box.innerText);
        const totalFilledCells = board.filter(cell => cell !== "").length;
        
        // Find best move using optimized strategy
        const bestMove = findBestMoveOptimized(board, totalFilledCells, lastPlayerMove);
        
        // Make sure the move is valid (cell is empty)
        if (bestMove !== -1 && board[bestMove] === "") {
            boxes[bestMove].innerText = "O";
            boxes[bestMove].disabled = true;
            checkWinner();
        }
    };

    const findBestMoveOptimized = (board, totalFilledCells, lastPlayerMove) => {
        // Special opening strategy for first move
        if (totalFilledCells === 1) {
            const openingMove = getOpeningMove(lastPlayerMove);
            // Double check the opening move is valid
            return board[openingMove] === "" ? openingMove : -1;
        }

        // Quick check for winning move
        const winningMove = findWinningMove(board, "O");
        if (winningMove !== -1 && board[winningMove] === "") return winningMove;

        // Quick check for defensive move
        const defensiveMove = findDefensiveMove(board, "X");
        if (defensiveMove !== -1 && board[defensiveMove] === "") return defensiveMove;

        // If no quick moves found, use minimax
        return findBestMoveMinimax(board);
    };

    const getOpeningMove = (lastPlayerMove) => {
        // Convert string index to number for easier comparison
        const lastMove = parseInt(lastPlayerMove);
        
        switch (lastMove) {
            case 4:  // Player played center
                const corners = [0, 2, 6, 8];
                return corners[Math.floor(Math.random() * corners.length)];
            case 3:  // Player played left edge
                return [0, 6][Math.floor(Math.random() * 2)];
            case 1:  // Player played top edge
                return [0, 2][Math.floor(Math.random() * 2)];
            case 5:  // Player played right edge
                return [2, 8][Math.floor(Math.random() * 2)];
            case 7:  // Player played bottom edge
                return [6, 8][Math.floor(Math.random() * 2)];
            default: // Player played a corner (0, 2, 6, 8)
                return 4;  // Take center
        }
    };

    const findWinningMove = (board, player) => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const values = [board[a], board[b], board[c]];
            
            // Check if two cells are filled with player's mark and one is empty
            if (values.filter(val => val === player).length === 2 && values.includes("")) {
                if (values[0] === "") return a;
                if (values[1] === "") return b;
                if (values[2] === "") return c;
            }
        }
        return -1;
    };

    const findDefensiveMove = (board, player) => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const values = [board[a], board[b], board[c]];
            
            // Check if two cells are filled with opponent's mark and one is empty
            if (values.filter(val => val === player).length === 2 && values.includes("")) {
                if (values[0] === "") return a;
                if (values[1] === "") return b;
                if (values[2] === "") return c;
            }
        }
        return -1;
    };

    const findBestMoveMinimax = (board) => {
        let bestScore = -Infinity;
        let bestMove = -1;
        
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, 0, false);
                board[i] = "";
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        
        return bestMove;
    };

    const minimax = (board, depth, isMaximizing) => {
        const winner = checkWinnerMinimax(board);
        if (winner !== null) {
            return winner === "O" ? 10 - depth : depth - 10;
        }
        
        if (isBoardFull(board)) {
            return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const checkWinnerMinimax = (board) => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const isBoardFull = (board) => {
        return board.every(cell => cell !== "");
    };

    // Set up event listeners for player moves
    currentEventListener = (event) => commonPlayerMoveHard(event.target, "X", "O");
    boxes.forEach((box) => {
        box.addEventListener("click", currentEventListener);
    });
};
