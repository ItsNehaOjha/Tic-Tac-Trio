const mediumAlgorithm = () => {
    //console.log("medium function is active");
    //console.log("currentLossStreak:", currentLossStreak);

    const commonPlayerMoveMedium = (box, currentPlayer, nextPlayer) => {
        if (box.innerText === "") {
            box.innerText = currentPlayer;
            box.disabled = true;
            //console.log("Move made by:", currentPlayer);
            let winnerFound = checkWinner();
            //console.log("Winner found:", winnerFound);
            if (!winnerFound) {
                //console.log("No winner yet, calling computer play for medium level...");
                setTimeout(() => {
                    //console.log("Inside setTimeout, before calling computerPlayMedium");
                    computerPlayMedium();
                    //console.log("Inside setTimeout, after calling computerPlayMedium");
                }, 500);
            }
        }
    };

    const computerPlayMedium = () => {
        //console.log("computerPlayMedium function called");
        //console.log("currentLossStreak:", currentLossStreak);

        if (currentLossStreak < 2) {
            //console.log("AI playing optimally");
            let bestMove = findBestMove("O") || findBestMove("X");
            if (bestMove !== null && bestMove !== undefined) {
                //console.log("Best move found at index:", bestMove);
                boxes[bestMove].innerText = "O";
                boxes[bestMove].disabled = true;
                //console.log("AI made an optimal move at index:", bestMove);
            } else {
                //console.log("No optimal move found, playing randomly");
                randomMoveMedium("O");
            }
        } else {
            //console.log("AI playing randomly");
            randomMoveMedium("O");
        }
        checkWinner();
    };

    const findBestMove = (player) => {
        for (let pattern of winPatterns) {
            //console.log("Finding matching patterns");
            let [a, b, c] = pattern;
            let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
            
            if (values.filter(val => val === player).length === 2 && values.includes("")) {
                //console.log("Winning move or blocking pattern found:", pattern);
                if (values[0] === "") return a;
                if (values[1] === "") return b;
                if (values[2] === "") return c;
            }
        }
        //console.log("No winning or blocking move found");
        return null;
    };

    currentEventListener = (event) => commonPlayerMoveMedium(event.target, "X", "O");
    boxes.forEach((box) => {
        box.addEventListener("click", currentEventListener);
    });

    const randomMoveMedium = (player) => {
        let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
        if (availableBoxes.length > 0) {
            let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
            randomBox.innerText = player;
            randomBox.disabled = true;
            checkWinner();
        }
    };
};
