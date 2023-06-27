import React, { useEffect, useState } from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Replace the URL with the actual URL where your Django app is running.
        // Here, 'projects' is the endpoint that you defined in your Django app.
        fetch('http://localhost:8000/projects')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;
