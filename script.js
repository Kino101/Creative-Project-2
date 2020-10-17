document.getElementById("clearHistory").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("history").innerHTML = "";
})

document.getElementById("clearButton").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML = "";
})

document.getElementById("deleteButton").addEventListener("click", function(event) {
  event.preventDefault();
  let textBox = document.getElementById("equationDisplay").innerHTML;
  document.getElementById("equationDisplay").innerHTML = textBox.slice(0, -1);
})

document.getElementById("0").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "0";
})

document.getElementById("1").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "1";
})

document.getElementById("2").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "2";
})

document.getElementById("3").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "3";
})

document.getElementById("4").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "4";
})

document.getElementById("5").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "5";
})

document.getElementById("6").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "6";
})

document.getElementById("7").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "7";
})

document.getElementById("8").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "8";
})

document.getElementById("9").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "9";
})

document.getElementById(".").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += ".";
})

document.getElementById("(-)").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "-";
})

document.getElementById("division").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += " / ";
})

document.getElementById("multiply").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += " * ";
})

document.getElementById("subtraction").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += " - ";
})

document.getElementById("addition").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += " + ";
})

document.getElementById("leftParn").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "(";
})

document.getElementById("rightParn").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += ")";
})

document.getElementById("sin").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "sin(";
})

document.getElementById("cos").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "cos(";
})

document.getElementById("tan").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += "tan(";
})

document.getElementById("power").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += " ^ ";
})


let variable = "";

document.getElementById("STO").addEventListener("click", function(event) {
  event.preventDefault();
  let equation = document.getElementById("equationDisplay").innerHTML;
  if (equation === "")
    return;
  equation = encodeURIComponent(equation);
  const url = "http://api.mathjs.org/v4/?expr=" + equation;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      variable = json;
      document.getElementById("history").innerHTML +=
        document.getElementById("equationDisplay").innerHTML + " -> Var";
      let breakLine = document.createElement("br");
      document.getElementById("history").appendChild(breakLine);
      document.getElementById("equationDisplay").innerHTML = "";
    })
})

document.getElementById("Var").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("equationDisplay").innerHTML += variable;
})

document.getElementById("enter").addEventListener("click", function(event) {
  event.preventDefault();
  let expression = document.getElementById("equationDisplay").innerHTML;
  if (expression === "")
    return;
  let urlExpression = encodeURIComponent(expression);
  const url = "http://api.mathjs.org/v4/?expr=" + urlExpression;
  fetch(url)
    .then(function(response) {
      if (response.status != 200) {
        return "Error invalid input";
      }
      return response.json();
    })
    .then(function(json) {
      document.getElementById("history").innerHTML += expression + " = " + json;
      let breakLine = document.createElement("br");
      document.getElementById("history").appendChild(breakLine);
      document.getElementById("equationDisplay").innerHTML = json;

      if(document.getElementById("equationDisplay").innerHTML != "Error invalid input") {
        newQuote(JSON.stringify(json));
      }
    })
})

function newQuote(number) {
  let index = number.indexOf('.');  //numbersapi only accepts whole numbers
  if(index != -1){
    number = number.slice(0, index);
  }
  let url = "http://numbersapi.com/" + number + "?json";
  fetch(url)
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.json();
    })
    .then(function(json) {
      document.getElementById("mathQuote").innerHTML = '"' + json.text + '"';
    })
}
