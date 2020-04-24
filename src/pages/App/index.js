import React, {useState, useEffect} from "react";
import Form from "../../components/Form";
import LabelledInput, {
    LabelledInputTextType,
    LabelledInputSubmitType
} from "../../components/LabelledInput";
import "./App.css";

function App() {


    //Input hook.
    const [maxPrime, setMaxPrime] = useState({
        maxPrime: 1,
    });

    //Prime result hook.
    const [primes, setPrimes] = useState({
        numbers: undefined,
    });

    //Validate input.
    const validatePrimeInput = (value) => {
        const parsedValue = parseInt(value);

        if (isNaN(parsedValue)) {
            setPrimes({
                numbers: "Enter a number."
            });
        } else {
            if (parsedValue < 0) {
                setPrimes({
                    numbers: "Enter a positive value"
                });
            } else if (parsedValue > 21474) {
                setPrimes({
                    numbers: "Enter a value below 21474 (for UI performance reasons)."
                });
            } else {

                //Placeholder while we fetch output.
                setPrimes({
                    numbers: "Calculating..."
                })

                return true;
            }
        }

        return false;
    }

    //Handle form submit.
    const handleSubmit = (event) => {
        //Prevent page from reloading.
        event.preventDefault();

        //Set the maximum prime value based off user input.
        setMaxPrime({
            maxPrime: event.target.maxPrime.value
        });

        //Validate input.
        if (!validatePrimeInput(maxPrime.maxPrime)) {
            return;
        }

        //Fetch the prime result.
        const fetchPrimes = async () => {
            const url = new URL("http://localhost:4567/prime/");
            url.search = "?max-prime-number=" + maxPrime.maxPrime;

            const data = await fetch(url.toString(), {method: 'GET'}).then(res =>
                res.json()
            );

            //Check if the result is an error message.
            if (data instanceof String) {
                console.log(data);
            } else {
                setPrimes({
                    numbers: data,
                });
            }
        };

        //Await call above method.
        fetchPrimes().then(r => {
            //Do other things here.
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Prime Calculator</h1>
                <Form onSubmit={handleSubmit}>
                    <LabelledInput name={"maxPrime"} label={"Maximum Prime Number: "} type={LabelledInputTextType}/>
                    <LabelledInput type={LabelledInputSubmitType} value={"Calculate"}/>
                </Form>
                <h3>Result</h3>
                <textarea id={"primeNumbers"} rows={"4"} cols={"50"} value={primes.numbers}>
                </textarea>
            </header>
        </div>
    );
}

export default App;
