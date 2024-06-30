const easyAlgorithm = () => {
    //console.log("easyAlgorithm function called");


    const commonPlayerMoveEasy = (box, currentPlayer, nextPlayer) => {
        if (box.innerText === "") {
            box.innerText = currentPlayer;
            box.disabled = true; 
            //console.log("Move made by:", currentPlayer);
            let winnerFound = checkWinner();
            //console.log("Winner found:", winnerFound);
            if (!winnerFound) {
                //console.log("No winner yet, calling computer play for easy level...");
                setTimeout(() => {
                    //console.log("Inside setTimeout, before calling computerPlayEasy");
                    computerPlayEasy();
                    //console.log("Inside setTimeout, after calling computerPlayEasy");
                }, 500);
            }
        }
    };
    
    const computerPlayEasy = () => {
        //console.log("computerPlayEasy function called");
        randomMoveEasy("O");
    };

    const randomMoveEasy = (player) => {
        let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
        if (availableBoxes.length > 0) {
            let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
            randomBox.innerText = player;
            randomBox.disabled = true;
            checkWinner();
        }
    };


    boxes.forEach((box) => {
    
        box.addEventListener("click", (event) => commonPlayerMoveEasy(event.target, "X", "O"));
    });

    currentEventListener = (event) => commonPlayerMoveEasy(event.target, "X", "O");
 
    
    boxes.forEach((box) => {
        box.addEventListener("click", currentEventListener);
    });

};
