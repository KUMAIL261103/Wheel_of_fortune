// 1. Deposit  some money
// 2. determine the number of the lines to bett on
// 3. collect the bet amount
// 4. spin the slot machine 
// 5. check if the user won
// 6. give the user their reward
// 7. play again

// function deposit(){
// }
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "⚔":2,
    "🎠":4,
    "♥":6,
    "🎈":8

};
const SYMBOL_VALUE = {
    "⚔":5,
    "🎠":4,
    "♥":3,
    "🎈":2
};




const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter the deposit amount: ")
    const numberDepositAmount = parseFloat(depositAmount);
    if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("Invalid deposit Amount, try again");
    }else{
        return numberDepositAmount;
    }
}
};
const getNumberOfLines = () => {
    while(true){
    const lines = prompt("Enter the number of  lines (1-3): ")
    const NumberOfLines = parseFloat(lines);
    if(isNaN(NumberOfLines) || NumberOfLines<=0 || NumberOfLines>3){
        console.log("Invalid number of lines, try again");
    }else{
        return NumberOfLines;
    }

}
};
const getBet = (balance,lines) =>{
    while(true){
    const bet = prompt("Enter the  bet per line : ")
    const numberBet= parseFloat(bet);
    if(isNaN(numberBet) || numberBet<=0 || numberBet>balance/lines){
        console.log("Invalid bet, try again");
    }else{
        return numberBet;
    }

}};
const spin = () =>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
            // console.log(symbol,count);
            for(let i=0;i<count;i++){
                symbols.push(symbol);
            }
    }
   const reels = [];
   for(let i=0;i<COLS;i++){
    reels.push([]);
    const reelSymbol =[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random()*reelSymbol.length);
            const selectSymbol = reelSymbol[randomIndex];
            reels[i].push(selectSymbol);
            reelSymbol.splice(randomIndex,1);

        }

   }
   return reels;
};
const transpose = (reels) =>{
    const rows =[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printRows = (rows) =>{
    for(const row of rows){
        let row_string = "";
        for(const[i,symbol] of row.entries()){
            row_string+=symbol;
            if(i!=row.length-1){
                row_string += " | ";
            }
        }
        console.log(row_string);
    }
};
const getWinning = (rows,bet,lines)=>{
    let winning = 0;
    for(let row=0;row<lines;row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            winning += bet*SYMBOL_VALUE[symbols[0]]
            
    }
}
return winning;
};
const game = () =>{
let balance =deposit();
while(true){
    const valueSymbol = {
       
    "⚔":"5x your bet",
    "🎠":"4x your bet",
    "♥":"3x your bet",
    "🎈":"2x your bet"
    };
    for (const [symbol,value] of Object.entries(valueSymbol)){
            console.log(symbol,value);
    }
    const numnberofLines = getNumberOfLines();
    const bet = getBet(balance,numnberofLines);
        balance -= bet * numnberofLines;
        const  reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const win=getWinning(rows,bet,numnberofLines);
        balance+=win;
        console.log("You won ,$" + win.toString());
        if(balance<=0){
            console.log("You run out of money!");
            break;
        }
        let chk = false;
        while(true){
            const playagain = prompt("do you want to play again (y/n)?");
            if(playagain =="y"){
                chk=false;
                break;
            }else if(playagain =="n"){
                chk=true;
                break;
            }else{
                console.log("Answer only in 'y' or 'n'");
            }
        }
        if(chk){
            break;
        }
        console.log("You have a balance of $" + balance);
    }
};

game();





