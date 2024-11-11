function addRow() {
    var table = document.getElementById("data");
    var newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = "<td><input type='number' class='x'></td><td><input type='number' class='fx'></td>";
  }
  
  function calculate() {
    var xInputs = document.querySelectorAll(".x");
    var fxInputs = document.querySelectorAll(".fx");
    var missingX = parseFloat(document.getElementById("missingX").value);
  
    var hasEmptyInput = false;
    for (var i = 0; i < xInputs.length; i++) {
      if (xInputs[i].value === "" || fxInputs[i].value === "") {
        hasEmptyInput = true;
        shakeElement(xInputs[i]);
        shakeElement(fxInputs[i]);
      }
    }
  
    if (missingX === "" || isNaN(missingX)) {
      hasEmptyInput = true;
      shakeElement(document.getElementById("missingX"));
    }
  
    if (hasEmptyInput) {
        showErrorPopup();
        return;
      }

  var n = xInputs.length;
  var x = [];
  var fx = [];

  for (var i = 0; i < n; i++) {
    x.push(parseFloat(xInputs[i].value));
    fx.push(parseFloat(fxInputs[i].value));
  }

  var dividedDifference = [];
  for (var i = 0; i < n; i++) {
    dividedDifference.push([]);
    dividedDifference[i].push(fx[i]);
  }

  for (var j = 1; j < n; j++) {
    for (var i = 0; i < n - j; i++) {
      dividedDifference[i].push((dividedDifference[i + 1][j - 1] - dividedDifference[i][j - 1]) / (x[i + j] - x[i]));
    }
  }

  var result = "<h3>Solution:</h3>";
  result += "<p>The value of table for x and f(x)</p><table><tr><th>x</th>";
  for (var i = 0; i < n; i++) {
    result += "<td>" + x[i] + "</td>";
  }
  result += "</tr><tr><th>f(x)</th>";
  for (var i = 0; i < n; i++) {
    result += "<td>" + fx[i] + "</td>";
  }
  result += "</tr></table>";

  result += "<p>Newton's divided difference table is</p><table><tr><th>x</th><th>f(x)</th>";
  for (var i = 1; i < n; i++) {
    result += "<th>" + i + "st order</th>";
  }
  result += "</tr>";
  for (var i = 0; i < n; i++) {
    result += "<tr><td>" + x[i] + "</td>";
    for (var j = 0; j < dividedDifference[i].length; j++) {
      result += "<td>" + dividedDifference[i][j].toFixed(6) + "</td>";
    }
    for (var j = dividedDifference[i].length; j < n; j++) {
      result += "<td></td>";
    }
    result += "</tr>";
  }
  result += "</table>";

  result += "<p>The value of x you want to find the f(x): x = " + missingX + "</p>";
  result += "<p>Newton's divided difference interpolation formula is</p>";
  result += "<p>f(x) = " + fx[0].toFixed(6);
  for (var i = 1; i < n; i++) {
    result += " + ";
    var term = dividedDifference[0][i];
    result += "(" + term.toFixed(6) + ")";
    for (var j = 0; j < i; j++) {
      result += " * (x - " + x[j] + ")";
    }
  }
  result += "</p>";


  var finalAnswer = fx[0]; 
  for (var i = 1; i < n; i++) {
    var term = dividedDifference[0][i];
    for (var j = 0; j < i; j++) {
      term *= (missingX - x[j]);
    }
    finalAnswer += term;
  }

  result += "<p>Final answer: f(" + missingX + ") = " + finalAnswer.toFixed(6) + "</p>";

  document.getElementById("result").innerHTML = result;
}

function shakeElement(element) {
    var originalPosition = element.style.position;
    var originalLeft = element.style.left;
  
    element.style.position = 'relative';
    element.style.left = '-5px';
  
    setTimeout(function() {
      element.style.left = '5px';
    }, 10);
  
    setTimeout(function() {
      element.style.left = '0px';
      element.style.position = originalPosition;
      if (originalLeft) {
        element.style.left = originalLeft;
      }
    }, 20);
  }