var calculateNo = [];
answer = [];

$(window).on("load", function () {

    $(".history").css("display", "none");

    var question = document.getElementsByClassName("question");
    var answer1 = document.getElementsByClassName("answer");
    var elements = document.getElementsByClassName("number");
    var screen = document.querySelectorAll(' p')[1];
    var history = document.querySelectorAll(' p')[0];

    for (var i = 0; i < elements.length; i += 1) {
        if (elements[i].innerHTML === '=') {
            elements[i].addEventListener("click", calculate(i));
        } else {
            elements[i].addEventListener("click", addtocurrentvalue(i));
        }
    }

    back.onclick = function () {
        $("#keyboard").show();
        $(".history").css("display", "none");
    }

    function addtocurrentvalue(i) {

        return function () {

            if (elements[i].innerHTML === "÷" || elements[i].innerHTML === "x" || elements[i].innerHTML === "+" || elements[i].innerHTML === "-") {
                screen.innerHTML = "";
            } else {
                screen.innerHTML += elements[i].innerHTML;
            }

            var output = screen.innerHTML.length;
            if (output > 12) {
                var res = screen.innerHTML.substr(0, 12);
                screen.innerHTML = res;
                history.innerHTML = screen.innerHTML;
            }

            if (elements[i].innerHTML === "÷") {
                history.innerHTML += "/ ";
            } else if (elements[i].innerHTML === "x") {
                history.innerHTML += "*";
            } else {
                history.innerHTML += elements[i].innerHTML;
            }

        };
    }

    sqrt.onclick = function () {
        var calcu = screen.innerHTML;
        if (calcu === "" || calcu === "NaN") {
            alert("Enter the value");
        } else {
            var b = "√" + screen.innerHTML;
            var a = Math.sqrt(eval(screen.innerHTML));
            screen.innerHTML = parseFloat(a.toFixed(2));
            history.innerHTML = screen.innerHTML;
            calculateNo.push(b);
            answer.push(screen.innerHTML);
            console.log(calculateNo);
            console.log(answer);
        }

    };

    pii.onclick = function () {

        var calcu = screen.innerHTML;
        var c = Math.PI;
        if (calcu == "") {
            screen.innerHTML = c;
            history.innerHTML = c;
        } else {
            screen.innerHTML = eval(calcu * c).toFixed(2);
            history.innerHTML = eval(calcu * c).toFixed(2);
        }

    };
    clear.onclick = function () {
        screen.innerHTML = '';
        history.innerHTML = '';
    };
    del.onclick = function () {
        screen.innerHTML = screen.innerHTML.toString().slice(0, -1);
        history.innerHTML = screen.innerHTML;
    };
    delMemory.onclick = function () {
        $("#keyboard").show();
        $(".history").hide();
        while (calculateNo.length > 0) {
            calculateNo.pop();
            answer.pop();
        }
        document.getElementById("result-past").innerHTML = "";
        console.log(calculateNo);
        screen.innerHTML = '';
        history.innerHTML = '';

    };

    his.onclick = function () {
        $("#keyboard").hide();
        $(".history").show();
        var q = "",
            a = "";
        for (var i = 0; i < calculateNo.length; i++) {
            q += calculateNo[i] + " = " + answer[i] + "<hr/>";
            console.log(calculateNo.length);
        }
        document.getElementById("result-past").innerHTML = q;

    };

    function calculate(i) {

        return function () {
            var a = history.innerHTML;
            var b = eval(a).toFixed(2);
            calculateNo.push(a);
            answer.push(b);
            screen.innerHTML = parseFloat(b);
            history.innerHTML = screen.innerHTML;
            if (Number.isInteger(parseFloat(b))) {
                if (screen.innerHTML.length > 9) {
                    var a = Number(b);
                    console.log(a.toExponential(8));
                    screen.innerHTML = a.toExponential(8);
                }

            } else {

                screen.innerHTML = parseFloat(b);
            }

        };
    }

});