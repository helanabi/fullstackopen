import { useState } from 'react';

const App = () => {

    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const total = good + neutral + bad;

    return (
        <div>
            <h1>Give feedback</h1>
            
            <button onClick={ () => setGood(good+1) }>Good</button>
            <button onClick={ () => setNeutral(neutral+1) }>Neutral</button>
            <button onClick={ () => setBad(bad+1) }>Bad</button>

            <h2>Statistics</h2>

            <p>Good { good }</p>
            <p>Neutral { neutral }</p>
            <p>Bad { bad }</p>
            <p>All { total }</p>
            <p>Average { (good - bad) / total }</p>
            <p>Positive { good*100 / total }%</p>
        </div>
    );
};

export default App;
