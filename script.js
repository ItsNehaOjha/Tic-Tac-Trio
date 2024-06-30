let currentAlgorithm = null;
let currentEventListener = null;
let gameCounter = 0;
let currentLossStreak = 0;
let scorePlayer = 0;
let tieGameCount =0;

const diffButtons = document.querySelectorAll(".diff");
const boxes = document.querySelectorAll(".box");
const resetMsgBtn = document.querySelector("#resetMsgBtn");
const resetMainBtn = document.querySelector("#resetMainBtn");
const newGameBtn = document.querySelector("#continueBtn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const scoreh3 = document.querySelector("#scoreCount");

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const showWinner = (winner) => {
    if (winner === "X") {
        msg.innerText = "Congratulations, You Won!";
        currentLossStreak = 0;
        scorePlayer++;
        scoreh3.innerText = scorePlayer;
    } else if (winner === "O") {
        msg.innerText = "Sorry, I Won!";
        currentLossStreak++;
        // scorePlayer--;
        scoreh3.innerText = scorePlayer;
        tieGameCount=0;
    } else {
        msg.innerText = "It's a Tie!";
        currentLossStreak++;
        tieGameCount++;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
    newGameBtn.classList.remove("hide");
    resetMsgBtn.classList.remove("hide");
    gameCounter++;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            return true;
        }
    }
    if ([...boxes].every(box => box.innerText)) {
        showWinner(null);
        return true;
    }
    return false;
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        if (box.innerText === "") {
            box.disabled = false;
        }
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        currentEventListener = null;
    });
    
    scoreh3.innerText = scorePlayer;
    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");
    resetMsgBtn.classList.add("hide");
    enableDiffButtons();
    if (currentAlgorithm) {
        startAlgorithm();
    }
};

const continueGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        currentEventListener = null;
    });

    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");
    resetMsgBtn.classList.add("hide");

  
    diffButtons.forEach(button => {
        if (button.id !== currentAlgorithm) {
            button.disabled = true;
            button.style.display = 'none';
        } else {
            button.classList.add('selected');
            button.disabled = false;

        }
    });

    if (currentAlgorithm) {
        startAlgorithm();
    }
};

const disableDiffButtons = () => {
    diffButtons.forEach(btn => btn.disabled = true);
};

const enableDiffButtons = () => {
    diffButtons.forEach(btn => btn.disabled = false);
};

diffButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        boxes.forEach((box) => {
            box.removeEventListener("click", currentEventListener);
        });
        diffButtons.forEach(button => button.classList.remove('selected'));
        btn.classList.add('selected');
        currentAlgorithm = btn.id;

        disableDiffButtons();
        btn.disabled = false;

        continueGame();
    });
});

const startAlgorithm = () => {
    boxes.forEach(box => {
        box.removeEventListener("click", currentEventListener);
    });

    if (currentAlgorithm === "easy") {
        easyAlgorithm();
    } else if (currentAlgorithm === "medium") {
        mediumAlgorithm();
    } else if (currentAlgorithm === "hard") {
        hardAlgorithm();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    resetGame();
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    
    
    setTimeout(() => {
        popup.classList.remove("show");
    }, 1500);
});


resetMsgBtn.addEventListener("click", () => {
    location.reload();
});


resetMainBtn.addEventListener("click", () => {
    location.reload();
});


newGameBtn.addEventListener("click", continueGame);

const startGame = () => {
    resetGame();
};
