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
    const total = course
          .parts
          .map(part => part.exercises)
          .reduce((x, y) => x+y);
    
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <p><b>Total of {total} exercises</b></p>
        </div>
    );  
}

function App() {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        }, 
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            <h1>Web Development Curriculum</h1>
            {
                courses.map(
                    course =>
                    <Course key={course.id} course={course} />
                )
            }
        </div>
    );
}

export default App;
