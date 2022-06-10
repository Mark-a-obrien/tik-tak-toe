
// Gameboard
const Gameboard = (() => {
    let gameboard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];

    const patterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let winner = false;

    const clearGameboard = () => {
        gameboard = [
            "", "", "",
            "", "", "",
            "", "", "",
        ];

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.textContent = "";
        });

        document.querySelector(".gameover").textContent = "";
        winner = false;
    }

    // Checks for a winner
    const checkForWinner = (piece) => {
        for (let i = 0; i <  patterns.length; i++)
            if (gameboard[patterns[i][0]]===piece && gameboard[patterns[i][1]]===piece && gameboard[patterns[i][2]]===piece) 
                return true;
        return false;
    };

    // Checks for draw
    const checkForDraw = () => {

    };


    // displays the board to screen
    const display = () => {
        const board = document.createElement("div");
        board.classList.add("board");
        for (let i = 0; i < gameboard.length; i++) {
            const square = document.createElement("p");
            square.classList.add("square");
            square.dataset.index = i;
            square.textContent = gameboard[i];

            board.appendChild(square);
        }
        document.querySelector(".container").appendChild(board);
        console.log("Board is displayed");
    }

    // Updates the board when a piece is placed
    const updateGameBoard = (square, piece, index) => {

        if (!winner) {
            if (checkBoard(index)) return "invalid";
            console.log(piece);
            square.textContent = piece;
            gameboard[index] = piece;
        } else return "win";

        if(checkForWinner(piece)) {
            winner = true;
            return "win";
        }
        return "next";
    }

    // Checks if a piece is already in the square the user is clicking
    const checkBoard  = (index) => {
        if (gameboard[index] !== "") {
            console.log("You can't place that here");
            return true;
        }
        return false;
    }

    return {
        display,
        updateGameBoard,
        checkForWinner,
        clearGameboard
    }
})();


// User
const User = (name, piece) => {
    let numWins = 0;

    return {
        piece,
        name,
        numWins
    }
}

// Game
const Game = (() => {
    const user1 = User("User1", "X");
    const user2 = User("User2", "O");

    Gameboard.display();

    const displyGameOver = (player, message) => {
        document.querySelector(".gameover").textContent = message;
    }

    const reset = () => {
        playerTurn = false;
        count = 0;
        gameOver = false;
        Gameboard.clearGameboard();
    }

    let playerTurn = false;
    let count = 0;
    let gameOver = false;
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("click", () => {

            if (!gameOver) {
                let player;
                playerTurn === false ?  player = user1 : player = user2;
                const gameStatus = Gameboard.updateGameBoard(square, player.piece, square.dataset.index)

                if (gameStatus === "win" || count === 9) {
                    if (count === 9) // checks for draw
                        displyGameOver(player, `Draw Everyone wins!`);
                    else {
                        displyGameOver(player, `Winner is ${player.name} using ${player.piece}`);
                        console.log(`Winner is ${player.name} using ${player.piece}`)
                        player.numWins += 1;
                        document.getElementById(`${String(player.piece)}-value`).textContent = player.numWins;
                        gameOver = true;
                    }
                } 
                else if (gameStatus === "next" || gameStatus === "invalid") {
                    playerTurn = !playerTurn; // changes to the other player
                    console.log("Count : ", count);

                    if (!(gameStatus === "invalid")) count++;
                }
            }
        });
    });

    return {
        reset
    }
})();


document.querySelector(".reset").addEventListener("click", () => {
    Game.reset();
})

