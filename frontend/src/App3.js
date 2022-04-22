import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './CurrencyCalcCSS.css';

function CurrencyCalc() {

    // Initializing all the state variables 
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);

    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])

    // Function to convert the currency
    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }

    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="heading">
                <h1>Currency converter</h1>
            </div>
            <div className="container">
                <div className="left">
                    <h3>Amount</h3>
                    <input type="text"
                        placeholder="Enter the amount"
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setFrom(e.value) }}
                        value={from} placeholder="From" />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }} />
                </div>
                <div className="right">
                    <h3>To</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to} placeholder="To" />
                </div>
            </div>
            <div className="result">
                <button onClick={() => { convert() }}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>

            </div>
        </div>
    );
}

export default App;
Now let’s edit the file named App.css

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  
.CurrencyCalcCSS {
    height: 100vh;
    width: 100 %;
    display: flex;
    align - items: center;
    flex - direction: column;
    padding - top: 120px;
    background - image: linear - gradient(120deg, #fdfbfb 0 %, #ebedee 100 %);
}
.heading{
    font - family: 'Pacifico', cursive;
    font - size: 35px;
}
.container{
    height: 300px;
    width: 800px;
    display: flex;
    justify - content: space - around;
    align - items: center;
}
input{
    padding - left: 5px;
    font - size: 20px;
    height: 36px;
}
.middle,.right{
    width: 120px;
}
.switch{
    padding: 5px;
    margin-top: 25px;
    background-color: rgb(226, 252, 184);
  border-radius: 50%;
    cursor: pointer;
}
    .result{
  box - sizing: border - box;
width: 800px;
padding - left: 30px;
}
button{
    width: 100px;
    height: 30px;
    font - weight: bold;
    font - size: 20px;
    border: 2px solid forestgreen;
    background - color: rgb(226, 252, 184);
    cursor: pointer;
}
p, h3, button, .switch{
    color: forestgreen;
}
p{
    font - size: 30px;
}
