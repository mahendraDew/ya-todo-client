import React from 'react';
import Layout from '../Layout';

const About = () => {
    return (
        <Layout>
                
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
                <h1 className="text-5xl font-bold text-gray-600 mb-6">
                    I Got Frustrated While Building a Component
                </h1>
                <p className="text-lg text-gray-700 mb-4 max-w-lg">
                    So there I was, knee-deep in another project, wondering if I even knew 
                    what I was doing. I mean, seriously, "Do I even know this?" was my 
                    existential crisis of the day. 
                    And guess what? In a moment of sheer brilliance (or madness), I decided 
                    to create this Todo app instead. Because who doesn't want more things 
                    to juggle, right?
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Why This App?
                </h2>
                <p className="text-lg text-gray-700 mb-4 max-w-lg">
                    Managing daily tasks shouldn’t feel like preparing for a NASA launch. 
                    Yet, here we are! This app is my humble attempt to simplify the chaos, 
                    making task management feel like a walk in the park—complete with 
                    occasional existential dread.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Features
                </h2>
                <ul className="list-disc list-inside text-gray-700 mb-4 max-w-lg mx-auto">
                    <li>Simple and clean user interface (because who has time for clutter?)</li>
                    <li>Real-time collaboration with other users (misery loves company!)</li>
                    <li>Customizable task priorities and deadlines (good luck keeping up!)</li>
                    <li>Progress tracking to keep you mildly motivated</li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Let's Get Started!
                </h2>
                <p className="text-lg text-gray-700 mb-4 max-w-lg">
                    So, if you’re ready to turn your own frustration into productivity 
                    (or at least a decent distraction), jump on board! 
                    Together, we can tackle the absurdity of life, one todo at a time!
                </p>
            </div>

        </Layout>
    );
};

export default About;
