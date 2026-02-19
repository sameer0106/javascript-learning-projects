// step-1 score initially 0 set kiya taki increment kar sake
let userScore = 0;
let compScore = 0;

// step-2 html tag ko js me access kiya
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const user = document.querySelector("#user");
const computer = document.querySelector("#computer");
const userReview = document.querySelector("#userReview");
const compReview = document.querySelector("#compReview");

// step-7 draw condition ko set kiya gya
const drawCondition = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    msg.innerText = "Game Was Draw! \n Play Again";
    msg.style.backgroundColor = "gray";
    console.log("game was draw");
  }
};

// step-8 final me showwinner function se game ke UI me realtime ke liye changes dikhaye gye
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    msg.innerText = `You Win! \n your ${userChoice} beats computer's ${compChoice}`;
    msg.style.backgroundColor = "green";
    console.log("you win");
    user.innerText = userScore;
  } else {
    compScore++;
    msg.innerText = `You Lose! \n your ${userChoice} lose by computer's ${compChoice}`;
    msg.style.backgroundColor = "red";
    console.log("you looose");
    computer.innerText = compScore;
  }
};

// step-6 yaha per win condition ko set aur draw condition ko call kiya gya
const winConditions = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    drawCondition();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      // computer choice will be "paper" or "sciessor" ("rock" nahi ho sakta kyuki draw condition pahle hi check ho chuka hai)
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // computer choice will be "rock" or "sciessor"
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // computer choice will be "rock" or "paper"
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);    //showwinner function call hua
  }
};

// step-4 play game call hua jisme user aur computer dono ki choice ka use kiya
const playGame = (userChoice) => {
  userReview.innerText = `Your Choice : ${ userChoice }`;
  console.log("user choice =", userChoice);
  // compueter choice
  const compChoice = genCompChoice();           //yaha se computerchoice ke liye alg function banakar yaha call kiya
  compReview.innerText = `Computer's Choice : ${ compChoice }`;
  console.log("computer choice =", compChoice);

  winConditions(userChoice, compChoice);      //wincondition function ko yaha call kiya gya
};

// step-3 user ke her ek choice(rock,paper,sciessor) ke liye unke id's ko getAttribute method se fetch kiya
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");

    playGame(userChoice);     //playgame function ko yaha se call kiya
  });
});

// step-5 computer choice ke liye alg function banaya jise playgame me call kiya gya
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};
