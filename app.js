let add = function (a, b) {
    return a + b;
};

let subtract = function (a, b) {
    return a - b;
};

let multiply = function (a, b) {
    return a * b;
};

let divide = function (a, b) {
    return a / b;
};

let operate = function (a, c, b) {
    return c(a, b);
};

let display = document.querySelector(".problem");

const numbers = document.querySelectorAll(".numbers");

const operators = document.querySelectorAll(".operators");
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
const backspace = document.querySelector(".backspace");

let num1 = "";
let operation = "";
let num2 = "";
let c = "";
let decimal = "";
let result = ""

let AC = document.querySelector(".AC");

let id = setInterval(() => {
    display.classList.toggle("disappear");
}, 500);


let allClear = () => {
    clearInterval(id);
    display.classList.remove("disappear");

    num1 = "";
    num2 = "";
    operation = "";
    c = "";
    display.textContent = "|";
    dot.disabled = false;
    backspace.disabled = false;

    id = setInterval(() => {
        display.classList.toggle("disappear");
    }, 500);
}

AC.addEventListener("click", allClear);



numbers.forEach((number) => {
    number.addEventListener("click", () => {
        clearInterval(id);
        display.classList.remove("disappear");
        dot.disabled = false;

        if (num1 === result && operation === "") {
            allClear()
            clearInterval(id);
        }

        if (operation === "") {
            num1 += number.textContent;
            display.textContent = num1;

            if (num1.includes(".")) {
                dot.disabled = true;
            }
        } else {
            num2 += number.textContent;
            display.textContent = `${num1}${operation}${num2}`;

            if (num2.includes(".")) {
                dot.disabled = true;
            }
        }

    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        clearInterval(id);
        display.classList.remove("disappear");
        c = operator.id;
        dot.disabled = false;

        operation += `${" "}${operator.textContent}${" "}`;

        display.textContent = `${num1}${operation}`;
        if (operator.id === "divide") {
            c = divide;
        } else if (operator.id === "multiply") {
            c = multiply;
        } else if (operator.id === "subtract") {
            c = subtract;
        } else if (operator.id === "add") {
            c = add;
        }
    });
});

equal.addEventListener("click", () => {
    backspace.disabled = true;
    result = operate(Number(num1), c, Number(num2));
    if (result.toString().length > 14) {
        if (Math.round(result).toString().length > 14) {
            display.textContent = `${result.toString()[0]}.${result
                .toString()
                .slice(1, 3)}e+${result.toString().length - 1}`;
        } else {
            display.textContent = result.toString().slice(0, 6);
        }
    } else {
        display.textContent = result;
    }
    num1 = result
    num2 = ""
    operation = "";
    c = "";

});

dot.addEventListener("click", () => {

    if (operation === "") {
        num1 += ".";
        display.textContent = num1;
    } else {
        num2 += ".";
        display.textContent = `${num1}${operation}${num2}`;
    }

    if (num1.includes(".")) {
        dot.disabled = true;
    }

    if (num2.includes(".")) {
        dot.disabled = true;
    }
});

// if (Number.isInteger(Number(num1)) === false) {
//     dot.disabled = true;
// }

/* + es \53 
    - es \u2212
    multiply es \327
    divide es 	\367
    */

backspace.addEventListener("click", () => {
    if (operation === "") {
        let newNum1 = num1.slice(0, num1.length - 1);
        num1 = newNum1;
        display.textContent = newNum1;
    } else {
        let newNum2 = num2.slice(0, num2.length - 1);
        num2 = newNum2;
        display.textContent = `${num1}${operation}${num2}`;
    }
});

