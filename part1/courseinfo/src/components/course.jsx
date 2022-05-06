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

export default Course;
