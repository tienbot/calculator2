let buttons = Array.from(document.querySelectorAll(".btn"));
const textContainer = document.querySelector('.calc-screen');
let screen = document.querySelector(".calc-screen p");
let delLastBtn = document.querySelector(".arrow");
let delAllbtn = document.querySelector(".AC");
let a = "";
let b = "";
let sign = "";
let finish = false;
let firstResult = true;

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "x", "/", "%"];

function resizeFont() {
  console.log(screen);
  let fontSize = parseInt(window.getComputedStyle(screen).fontSize, 10);
  
  function adjustFontSize() {
      // Проверяем, помещается ли текст в контейнер
      while (textContainer.scrollWidth > textContainer.clientWidth && fontSize > 10) {
          fontSize--;
          screen.style.fontSize = fontSize + 'px';
      }
  }

  adjustFontSize();

  // При изменении размера окна также пересчитываем шрифт
  window.addEventListener('resize', adjustFontSize);
};

function clearAll() {
  a = ""; 
  b = ""; 
  sign = ""; 
  finish = false; //флаг
  screen.textContent = 0;
}

function count(){
  if(firstResult){
    //вычисления
    // if (b === "") b = a;
    switch (sign) {
      case "+":
        a = +a + +b;
        console.log('test');
        break;
      case "-":
        a = +a - +b;
        console.log(a);
        break;
      case "x":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          screen.textContent = "Ошибка";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = (a / b);
        break;
      case "%":
        a = (a * b) / 100;
        break;
      default:
        return;
    }
    finish = true;
    screen.textContent = a;
    console.table(a, sign, b);
    firstResult = false
  } else {
    screen.textContent = a;
  }
}

delAllbtn.addEventListener("click", function () {
  clearAll();
});

buttons.map((button) => {
  button.addEventListener("click", (event) => {
    // нажата не кнопка
    if (!event.target.classList.contains("btn")) return;
    // нажата кнопка clearAll AC
    if (event.target.classList.contains("ac")) return;

    screen.textContent = "";
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .
    if (numbers.includes(key)) {
      if (b === "" && sign === "") {
        if (key === "." && a.includes(".")) {
          //проверка на .
          return;
        }
        if (a == "" && key == ".") {
          a = "0" + a.slice(0); //вставляю 0, если нажать сразу .
          a += key;
        } else {
          a += key;
        }
        screen.textContent = a;
      } else if (a !== "" && b !== "" && finish) {
        b = key;
        finish = false;
        screen.textContent = b;
      } else {
        if (key === "." && b.includes(".")) {
          //проверка на .
          return;
        }
        if (b == "" && key == ".") {
          b = "0" + b.slice(0); //вставляю 0, если нажать сразу .
          b += key;
        } else {
          b += key;
        }
        screen.textContent = b;
      }
      console.table(`a=${a}, sign, b=${b}`);
      // console.log(a.length<8);
      
      firstResult = true;
      resizeFont();
      return;
    } else {
      screen.textContent = a;
    }

    // если нажата клавиша + - / *
    if (action.includes(key)) {
      if(!b){
        sign = key;
        screen.textContent = sign;
        console.table(a, sign, b);
        return;
      } else {
        count()
      }
    }

    //удаление последнего элемента
    if (event.target.classList.contains("arrow")) {
        if (a && !sign && !b) {
          a = a.slice(0, -1);
          screen.textContent = a;
          console.log(a);
          return a;
        }
          if (a && sign && !b) {
            sign = sign.slice(0, -1);
            screen.textContent = sign;
            console.log(sign);
            return sign;
          }
          if (a && sign && b) {
            b = b.slice(0, -1);
            screen.textContent = b;
            console.log(b);
            return b;
          }
          return a, sign, b; 
    }

    if (key === "=" || key === "-") {
      count()
    }
  });
});
