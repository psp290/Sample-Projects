


var s = '';                                     //String variable s
var verify = /(([0-9.]+)[+-/*])+([0-9.]+)/;     //Pattern to verify valid string
var number = /\d+(\.\d+)?/g;                    //Pattern to get number in string
var operations = /([+-/*])/g;                   //Pattern to get operator in string
var res;





var add = (a) => {
    s = document.getElementById("ip-box").value;    //Take input from input box


    if (a == 'c') {                                 //Condition to clear input string
        s = '';
        document.getElementById("ip-box").value = s;
        document.getElementById("output").innerHTML = "Ans";
        document.getElementById("error").innerHTML = "Invalid Pattern";
        document.getElementById("error").style = "color:red;";
    }

    if (a != '=' && a != 'c') {
        s = s.concat(a);                            //Concat string except '=' and 'c' character
    }

    document.getElementById("ip-box").value = s;    //Show the input string when we click the different buttons


    res = s.match(verify);                          //Match the Pattern and create res array

    print();                                        //Function to print result

}

function print() {


    var numArray = s.match(number);                 //Get string array of number using match
    var opArray = s.match(operations);              //Get string array of operators using match



    //document.getElementById("error").innerHTML = numArray;


    if (res[0] == s) {
        document.getElementById("error").innerHTML = "Valid pattern";       //Print error message
        document.getElementById("error").style = "color:green;";            //To change style
        //document.getElementById("error").innerHTML = numArray;

        var calulation = 0;                                                 //Variable for calculation
        calulation = Number(numArray[0]);                               //Initialize first value of number array
        for (var i = 1; i < numArray.length; i++) {
            if (opArray[i - 1] == '+') {                                    //Check operator between the number
                calulation = calulation + Number(numArray[i]);
                //console.log(numArray[i]);
            }
            else if (opArray[i - 1] == '-') {
                calulation = calulation - parseFloat(numArray[i]);
                //console.log(numArray[i]);
            }
            else if (opArray[i - 1] == '*') {
                calulation = calulation * parseFloat(numArray[i]);
                //console.log(numArray[i]);
            }
            else if (opArray[i - 1] == '/') {
                calulation = calulation / parseFloat(numArray[i]);
                //console.log(numArray[i]);
            }

        }
        //console.log("New");
        document.getElementById("output").innerHTML = calulation.toFixed(3);
    }
    else {
        document.getElementById("error").innerHTML = "Invalid pattern";
        document.getElementById("error").style = "color:red;";
        document.getElementById("output").innerHTML = "Enter valid line";
    }


}







