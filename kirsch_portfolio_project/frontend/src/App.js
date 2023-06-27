import React from 'react';
import Navbar from './Navbar';
import Introduction from './Introduction';
import Projects from './Projects';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';
import 'bootstrap/dist/css/bootstrap.min.css';
import './yourCustomCSS.css';

const App = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <Introduction />
                {/* ...Other Components such as Projects... */}
            </div>
        </div>
    );
};

export default App;
