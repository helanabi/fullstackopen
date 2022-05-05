import { useState } from 'react';

const Button = ({ onClick, text  }) => (
    <button onClick={ onClick }>{ text }</button>
);

const StatisticLine = ({ text, value }) => (
    <tr><td>{ text }</td><td>{ value }</td></tr>
);

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    
    return total === 0 ? (<p>No feedback given</p>) :
        (
            <table>
                <tbody>
                    <StatisticLine text="Good" value={ good } />
                    <StatisticLine text="Neutral" value={ neutral } />
                    <StatisticLine text="Bad" value={ bad } />
                    <StatisticLine text="All" value={ total } />
                    <StatisticLine text="Average" value={ (good - bad) / total } />
                    <StatisticLine text="Positive" value={ `${good*100 / total}%` } />
                </tbody>
            </table>
        );
};

const App = () => {

    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Give feedback</h1>
            
            <Button onClick={ () => setGood(good+1) } text="Good" />
            <Button onClick={ () => setNeutral(neutral+1) } text="Neutral" />
            <Button onClick={ () => setBad(bad+1) } text="Bad" />

            <h2>Statistics</h2>
            <Statistics {...{ good, neutral, bad }} />
        </div>
    );
};

export default App;
