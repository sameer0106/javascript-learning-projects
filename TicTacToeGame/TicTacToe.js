// step-1 html components ko js me access kiya
let main = document.querySelector("main");
let container = document.querySelector(".container");
let game = document.querySelector(".game");
let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let newBtn = document.querySelector(".new-btn");
let reset = document.querySelector(".reset");
let msg = document.querySelector(".msg");
let scrollBtn = document.querySelector(".scrollDown");

// step-2 initial turn ko "O" set kiya
let turnO = true;

// step-3 all possible win patterns ko define kiya
let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// step-4 both turn x aur o ke liye properties set kari
for (let box of boxes) {
  box.addEventListener("click", () => {
    if (turnO === true) {
      box.innerText = "O";
      box.style.color = "rgb(185, 150, 34)";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "rgba(46, 175, 124, 1)";
      turnO = true;
    }
    box.disabled = true;
    // winning aur draw condition check hua
    if (!checkWinner()) {
      checkDraw();
    }
  });
}

// mideater steps- chhote chhote function block banaye chhote tasks ke liye
let disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};
let enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

let resetBtn = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const drawCondition = () => {
  msg.innerText = "Game Draw";
  msgContainer.classList.remove("hide");

  disableBoxes();
};

// step-7 winner ko screen UI me realtime per show karaya
const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  disableBoxes();
};

// step-5 win condition ko set kiya ki user kon se condition me jitega
const checkWinner = () => {
  for (let patterns of winPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner is", pos1Val);

        showWinner(pos1Val);  //showwinner function call hua
        return true;
      }
    }
  }
  return false;
};

// step-6 draw condition ko set kiya
const checkDraw = () => {
  let isDraw = true;

  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }
  if (isDraw === true) {
    drawCondition();        //draw condition call hua
  }
};

// step-8 reset aur new game ke liye game box ko khali kiya
reset.addEventListener("click", resetBtn);
newBtn.addEventListener("click", resetBtn);

// scrollBtn.addEventListener("click", () => {
//   main.scrollIntoView({ behavior: "smooth" });
// });

scrollBtn.addEventListener("click", () => {
  msgContainer.classList.add("hide");
});
