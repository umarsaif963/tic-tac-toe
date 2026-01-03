let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let option = prompt("Choose an option no.: \n1.Play Game\n2.Exist\nPlease enter your option no: ");
if (option === '1') {
  function pattern() {
    let line = "";
    let outer_line = "* * * * * * * * * *\n";
    for (let i = 0; i < 3; i++) {
      line += outer_line;
      line += "*";
      for (let j = 0; j < 3; j++) {
        line += "  " + num[i * 3 + j] + "  *";
      }
      line += "\n";
    }
    line += outer_line;
    console.log('\n'+ line);
  }
  function win(player) {
    let possibilities = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < possibilities.length; i++) {
      if (num[possibilities[i][0]] === player && num[possibilities[i][1]] === player && num[possibilities[i][2]] === player){
        return true;
      }
    }
    return false;
  }

  function TicTacToe() {
    let count = 9;
    let player = "❌";
    while (count) {
      count--;
      pattern();
      let position = Number(prompt(`Enter position (1-9) for ${player} : `));
      let index = position - 1;
      num[index] = player;
      if (win(player)) {
        pattern();
        console.log(`\nPlayer ${player} wins!`);
        option = prompt("Are you want to play again: \n1.Yes\n2.No\nPlease enter your option no: ");
        if(option === '1'){
            num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            TicTacToe()
        }
        else{
            console.log("Thanks for playing!")
        }
        return;
      }
      if (player === '❌') {
        player = '⭕'
      }
      else if (player === '⭕') {
        player = '❌'
      }
    }
    pattern();
    console.log("Game Draw!");
    option = prompt("Are you want to play again: \n1.Yes\n2.No\nPlease enter your option no: ");
        if(option === '1'){
            num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            TicTacToe()
        }
        else{
            console.log("Thanks for playing!")
        }
    
  }
  TicTacToe();
}

else if (option === '2') {
  console.log("\nExist")
}
else {
  console.log("Enter correct option no.")
}