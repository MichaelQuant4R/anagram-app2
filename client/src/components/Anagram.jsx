import React from "react";
import "../css/anagram.css";

const Anagram = props => {
    
    const [inputText, setInputText] = React.useState("");
    const [outputText, setOutputText] = React.useState([]);
    const [inputList, setInputList] = React.useState([]);
     const [inputCount, setInputCount] = React.useState(0);
    const [outputCount, setOutputCount] = React.useState(0);
    
    const text = document.getElementById("anagram-text-input");
    
    
    const handleReset = (e) => {
        
        setInputList([]);
        
        setInputText("");
        setOutputText([]);
        console.log(text.value);
        text.value = "";
        setInputCount(0);
       setOutputCount(0);
    }
    

    
    const handleSubmit = (e) => {
        console.log(inputText);
        e.preventDefault();
        
        let mylist = inputText.split(" ");
       
        setInputList(mylist);
        
        setInputCount(mylist.length);
        
        fetch("https://holistic-anagram.herokuapp.com/anagram_check",{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Access-Allow-Control-Origin":"*"
            },
            
            body:JSON.stringify({
                "words": inputText
            })
            
        })
        .then(resp => {
            
            console.log(resp);
            if(!resp.ok){
                
                throw new Error(resp.status);
            }
            else{
                return resp.json();
            }
            
        })
        .then(json => {
            
            console.log(json);
            
            console.log(json["data"]["anagram"]);
            
            console.log("INPUT TEXT LENGTH", inputText.length);
            console.log(inputText);
//             setInputCount(inputText.length);
            
            let data = json["data"]["anagram"];
//             console.log(setOutputText);
            
            console.log("DATA", data);
            setOutputText(data);
            
            let count = 0;
            for(var i = 0; i < data.length; i++){
                count += data[i].length;
            }
            
            setOutputCount(count);

            
            console.log("OUTPUT TEXT", outputText);

            
            
            console.log("OUTPUT", outputText);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    return (
    
    <>
            <center>
                <h1>Anagram App</h1>
                
                <div>{JSON.stringify({outputText})}</div>
                <br/>
      
        <form onSubmit = {handleSubmit}>
    
            <br/>
            <input id="anagram-text-input" type="text" required placeholder="Enter words to check..."
               onChange = {(e) => setInputText(e.target.value)} />
            <br/>
            
    
            <input type="submit" value="Submit"/>
            <br/>
            <input id="anagram-text-reset" onClick={handleReset} type="button" value="Reset"/>
            <br/>
        </form>
          
                <div id="grid-container">
                
                <div className="text-container">
                    <span className="text-title">Input</span>
                    <br/>
                    <span className="text-count-input">{inputCount}</span>
                    <div className="text-container-list">
                        <br/>
                       
                        <ul>
                        {inputList.map((input, i) => (
                            <li key={i} className="input-li">{input}</li>

                            ))}
                                </ul>
                        
                        </div>
                    </div>
                    
                <div className="text-container">
                <span className="text-title">Output</span>
                    <br/>
                    <span className="text-count-output">{outputCount}</span>
                 <div className="text-container-list">
                    <br/>
        <div>
        {outputText.map((outList,i) => (
        <>
         <ul key={i} className="output-div">{outList.map((out, k) => (

                 <li key={k} className="output-li">{out}</li>

                 ))}</ul>
            <hr/>
            </>
         ))}
        
         </div>
            </div>
                </div>
                    </div>
                
            </center>
    </>
    
    );
};

export default Anagram;






