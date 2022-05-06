function Header(props) {
    return (
        <h1>{props.course}</h1>
    );     
}

function Part(props) {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
}

function Content({parts}) {
    return (
        <div>
            {parts.map(part => <Part key={part.id} {...part} />)}
        </div>
    );        
}

function Course({ course }) {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    );  
}

function App() {
    const course = {
        id: 1,
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3
            }
        ]
    };

    return <Course course={course} />;
}

export default App;
