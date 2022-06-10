const gameboard = [
    "x", "o", "o",
    "x", "", "o",
    "x", "", "x",
];

const checkForWinner = (patterns, piece) => {
    for (let i = 0; i <  patterns.length; i++)
        if (gameboard[patterns[i][0]]===piece && gameboard[patterns[i][1]]===piece && gameboard[patterns[i][2]]===piece) 
            return true;
    return false;
};

checkForWinner([[0,1,2], [3,4,5], [6,7,8]], "x" );
checkForWinner([[0,3,6], [1,4,7], [2,5,8]], "o");
checkForWinner([[0,4,8], [2,4,6]], "x");

console.log("x", checkForWinner([[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]], "x"));
console.log("o", checkForWinner([[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]], "o"));