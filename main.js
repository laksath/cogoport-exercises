number = document.querySelectorAll('.number');
symbol = document.querySelectorAll('.symbol');

reset = document.getElementById('reset');
pop = document.getElementById('pop');
solution = document.getElementById('solution');

solution_screen = document.getElementById('ans');
type_screen = document.getElementById('screen');

var calculator = [];
var operators = ['+', '-', '/', '*'];

function display_screen() {
    var str = '';
    for (var i = 0; i < calculator.length; i++) {
        str += calculator[i] + ' ';
    }
    console.log(str);
    // if (str.length > 0) str = str.slice(0, str.length - 1);
    return str;
}

for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
        var num = e.target.textContent;
        if (calculator.length == 0 || operators.includes(calculator[calculator.length - 1])) {
            calculator.push(num);
        } else {
            calculator[calculator.length - 1] = `${calculator[calculator.length - 1]}${num}`;
        }
        type_screen.textContent = display_screen();
    });
}

for (var i = 0; i < symbol.length; i++) {
    symbol[i].addEventListener("click", function (e) {
        var operation = e.target.textContent;
        calculator.push(operation);
        type_screen.textContent = display_screen();
    });
}

reset.addEventListener("click", function (e) {
    calculator = [];
    solution_screen.textContent = "";
    type_screen.textContent = "";
});

pop.addEventListener("click", function (e) {
    calculator.pop();
    type_screen.textContent = display_screen();
});

var val1;
var val2;
var tmp_opr;


function operation(a, b, op) {
    var soln;
    if (op == '-') {
        soln = a - b;
    } else if (op == '+') {
        soln = a + b;
    } else if (op == '*') {
        soln = a * b;
    } else {
        soln = a / b;
    }

    return soln;
}


solution.addEventListener("click", function (e) {

    console.log(calculator);

    if (calculator.length == 0) {
        console.log("Empty");
        solution_screen.textContent = "Empty";
    } else if (operators.includes(calculator[calculator.length - 1]) || calculator.length == 2) {
        console.log("Error 1");
        solution_screen.textContent = "Error";
    } else {
        var checker = 1;
        var tmp;

        while (calculator.length > 1) {
            var len = calculator.length;
            if (checker == 1) {
                checker = 0;
                tmp = calculator[len - 1];
                calculator.pop();
            } else {
                checker = 1;
                if (len > 1 && operators.includes(calculator[len - 2])) {
                    break;
                } else {
                    var soln = operation(calculator[len - 2], tmp, calculator[len - 1]);
                    if (soln == -Infinity || soln == Infinity) {
                        break;
                    }
                    calculator.pop();
                    calculator.pop();
                    calculator.push(soln.toString());
                }
            }
        }

        if (calculator.length > 1) {
            console.log("Error");
            solution_screen.textContent = "Error";

        } else {
            //display
            console.log(calculator[0]);
            solution_screen.textContent = calculator[0];
        }
    }

    calculator = [];
});