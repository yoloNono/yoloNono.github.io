//Declare a const to get the display Value
const h1El = document.getElementById("h1");
//Declare a const for the maxlength of the display
const maxLength = 9;
//Declare const for the Grand Total text to appear
const gt = document.getElementById("grand-total");
//Declar const for AC button
const acBtn = document.getElementById("AC");
//Declar a const for the character '.'
const char = '.';

//Declare 2 let variables to keep track of the process
let tracker = [];
let symbol = [];
//Declare a variable to false for the track function
let value = false;

/*Main function so you can re-use code with different values
as long you place a value inside the number perameter*/
function main(number) {
  let dispVal = h1El.textContent;
  if (dispVal === "0") {
    h1El.textContent = number;
  } else {
    let newVal = dispVal + number;
    if (newVal.length > maxLength) {
      h1El.textContent = newVal.slice(0, maxLength);
    } else {
      h1El.textContent = newVal;
    }
  }
}

//Function that keeps track of the total by updatign tracker
function track(sign) {
  let dispVal = h1El.textContent;
  tracker.push(dispVal);
  symbol.push(sign);
  h1El.textContent = "";

  if (tracker.length > 1 && symbol.length >= 2) {
    let sgn = symbol[1];
    if (symbol[0] === "+") {
      let total = Number(tracker[0]) + Number(tracker[1]);
      tracker = [total.toFixed(3)];
      symbol = [sgn];
    } else if (symbol[0] === "-") {
      
      let total = Number(tracker[0]) - Number(tracker[1]);
      tracker = [total.toFixed(3)];
      symbol = [sgn];
    } else if (symbol[0] === "*") {
      
      let total = Number(tracker[0]) * Number(tracker[1]);
      tracker = [total.toFixed(3)];
      symbol = [sgn];
    } else if (symbol[0] === "/") {
      let total = Number(tracker[0]) / Number(tracker[1]);
      tracker = [total.toFixed(3)];
      symbol = [sgn];
    }
  }

  
  
}

//Function to show final value when eq btn is clicked
function final() {
    let zero = String(tracker[0]);
  if (zero.length > maxLength) {
      h1El.textContent = 'ERROR';
      gt.textContent = 'ERROR';
      alert('Calculator Error (Total is too long), Clear calculator or refresh page');
      document.querySelectorAll("button").forEach((button) => {button.disabled = true;});
      document.getElementById('AC').disabled = false;
  } else {
  h1El.textContent = tracker[0];
  gt.textContent = "Grand Total";
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  document.getElementById("AC").disabled = false;
  }
}

//Function if tracker[0] has a decimal number for the final answer
function check() {
    str = String(tracker[0]);
    index = str.indexOf(char);
    strb = index ? str.substring(0, index) : undefined;
    stra = index ? str.substring(index + 1) : undefined;
    function inside() {
        tracker = str.charAt(char) ? [tracker[0].toFixed(2)] : [tracker[0]];
        let x = String(tracker[0]);
        if (x.length > maxLength) {
      h1El.textContent = 'ERROR';
      gt.textContent = 'ERROR';
      alert('Calculator Error (Total is too long), Clear calculator or refresh page');
      document.querySelectorAll("button").forEach((button) => {button.disabled = true;});
      document.getElementById('AC').disabled = false;
        } else {
            final();
        }
    } inside();
}
//Functions that add numbers to the display value
function btn1() {
  main(1);
}

function btn2() {
  main(2);
}

function btn3() {
  main(3);
}

function btn4() {
  main(4);
}

function btn5() {
  main(5);
}

function btn6() {
  main(6);
}

function btn7() {
  main(7);
}

function btn8() {
  main(8);
}

function btn9() {
  main(9);
}

function btnP() {
  main(".");
}

function btn0() {
  main(0);
}

//Function to clear the calculator
function ac() {
  h1El.textContent = "0";
  gt.textContent = "";
  tracker = [];
  value = false;
  symbol = [];
  console.clear();
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
}

//Functions to keep tracker updated
function divide() {
  track("/");
}

function add() {
  track("+");
}

function minus() {
  track("-");
}

function mult() {
  track("*");
}

//Function to get the total
function btnEq() {
  if (tracker.length === 1 && symbol.length === 1 && h1El.textContent !== "") {
    tracker.push(h1El.textContent);
    if (symbol[0] === "+") {
      let total = Number(tracker[0]) + Number(tracker[1]);
      tracker = [total];
      symbol = [];
      check();
    } else if (symbol[0] === "-") {
      let total = Number(tracker[0]) - Number(tracker[1]);
      tracker = [total];
      symbol = [];
      check();
    } else if (symbol[0] === "/") {
      let total = Number(tracker[0]) / Number(tracker[1]);
      tracker = [total];
      symbol = [];
      check();
    } else if (symbol[0] === "*") {
      let total = Number(tracker[0]) * Number(tracker[1]);
      tracker = [total];
      symbol = [];
      check();
    } else {
      console.log("TROLL");
    }
  } else {
    check();
  }
}


//The console.log's in the program are just a way to make sure it worked, didn't feel like taking them out once I finished to project

