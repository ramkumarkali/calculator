import { useState } from "react";

function Calculator(){
    const [Text, settext] = useState("");
    const [Output , setOutput] = useState(0);

    function calculate(expression){
        const operators = ["+","-","*","/"];
        const stack = [];
        const output = [];

        const getprecedence = (operator) =>{
            switch (operator){
                case "+":
                case "-":
                    return 1;
                case "*":
                case "/":
                    return 2;
                default:
                    return 0;
            }
        };



        for(let i=0;i<expression.length;i++){
            const char = expression[i];

            if(!isNaN(char)|| char ==="."){
                let number = char;
                while(!isNaN(expression[i+1])||expression[i+1]==="."){
                    number +=expression[++i];
                }
                output.push(parseFloat(number));
            }
            else if(char ==="("){
                stack.push(char);
            }else if(char === ")"){
                while(stack.length &&stack[stack.length - 1]!=="("){
                    output.push(stack.pop());
                }
                stack.pop();
            }else if(operators.includes(char)){
                while(stack.length && getprecedence(char)<= getprecedence(stack[stack.length - 1])){
                    output.push(stack.pop());
                }
                stack.push(char);
            }
        }

        while(stack.length){
            output.push(stack.pop());
        }

        const resultstack = [];
        output.forEach((token)=>{
            if(!isNaN(token)){
                resultstack.push(token);
            }else{
                const b = resultstack.pop();
                const a = resultstack.pop();
                switch (token){
                    case "+":
                        resultstack.push(a +b);
                        break;
                    case "-":
                        resultstack.push(a - b);
                        break;
                    case "*":
                        resultstack.push(a*b);
                        break;
                    case "/":
                        resultstack.push(a/b);
                        break;
                    default:
                        break;
                }
            }
        });
        return resultstack.pop();
    }

    const handleinput = (e) =>{
        let char  = e.target.textContent;
        settext((prev) => prev+char);
    };

    const handleCompute = (e) =>{
        let char = e.target.textContent;
        settext((prev)=>prev+char);
    };
    const clearinput = () =>{
        settext("");
        setOutput(null);
    };

    const equalsresult = () =>{
        if(Text === ""){
            setOutput("Error");
            return
        }else if(Text.includes("0/0")){
            setOutput(NaN);
        }else if(Text.includes("/0")){
            setOutput(Infinity);
        }
        setOutput(calculate(Text));
    };

    return(
        <div className="App">
            <h1>React Calculator</h1>
            <input type="text" value={Text} readOnly/>
            <h3>Output: {Output}</h3>
            <div className="card">
                <div>
                    {" "}
                    <button onClick={(e)=> handleinput(e)}>7</button>
                    <button onClick={(e)=> handleinput(e)}>8</button>
                    <button onClick={(e)=> handleinput(e)}>9</button>
                    <button onClick={(e)=> handleCompute(e)}>+</button>
                </div>
                <div>
                    <button onClick={(e)=> handleinput(e)}>4</button>
                    <button onClick={(e)=> handleinput(e)}>5</button>
                    <button onClick={(e)=> handleinput(e)}>6</button>
                    <button onClick={(e)=> handleCompute(e)}>-</button>
                </div>
                <div>
                    <button onClick={(e)=> handleinput(e)}>1</button>
                    <button onClick={(e)=> handleinput(e)}>2</button>
                    <button onClick={(e)=> handleinput(e)}>3</button>
                    <button onClick={(e)=> handleCompute(e)}>*</button>
                </div>
                <div>
                    <button onClick={(e)=> clearinput(e)}>C</button>
                    <button onClick={(e)=> handleinput(e)}>0</button>
                    <button onClick={(e)=> equalsresult(e)}>=</button>
                    <button onClick={(e)=> handleCompute(e)}>/</button>
                </div>
            </div>
        </div>

    );
}



export default Calculator