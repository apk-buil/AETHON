import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [agents, setAgents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [systemStatus, setSystemStatus] = useState('Running');

    React.useEffect(() => {
        fetch('/api/agents')
            .then(res => res.json())
            .then(data => setAgents(data))
            .catch(err => console.error('Error fetching agents:', err));
    }, []);

    return (
        <div className="dashboard-container">
            <h1>AETHON Dashboard</h1>
            <div className="status-section">
                <h2>System Status</h2>
                <p>Status: <span className="status-badge">{systemStatus}</span></p>
            </div>
            <div className="agents-section">
                <h2>Active Agents</h2>
                <ul>
                    {agents.map((agent, idx) => (
                        <li key={idx}>{agent.name} - {agent.status}</li>
                    ))}
                </ul>
            </div>
            <div className="tasks-section">
                <h2>Running Tasks</h2>
                <ul>
                    {tasks.map((task, idx) => (
                        <li key={idx}>{task.name} - {task.progress}%</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;