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

let num1 = "";
let operation = "";
let num2 = "";
let c = "";
let decimal = "";

let AC = document.querySelector(".AC");

let id = setInterval(() => {
    display.classList.toggle("disappear");
}, 500);

AC.addEventListener("click", () => {
    clearInterval(id);
    display.classList.remove("disappear");

    num1 = "";
    num2 = "";
    operation = "";
    c = "";
    display.textContent = "|";
    dot.disabled = false;

    id = setInterval(() => {
        display.classList.toggle("disappear");
    }, 500);
});

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        clearInterval(id);
        display.classList.remove("disappear");
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
    let result = operate(num1, c, num2);
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
});

dot.addEventListener("click", () => {
    if (operation === "") {
        num1 += ".";
        display.textContent = num1;
    } else {
        num2 += ".";
        display.textContent = `${num1}${operation}${num2}`;
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
