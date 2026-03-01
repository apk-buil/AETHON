import React, { useState, useRef } from 'react';
import './Terminal.css';

function Terminal() {
    const [output, setOutput] = useState('');
    const [command, setCommand] = useState('');
    const outputRef = useRef(null);

    const executeCommand = async () => {
        if (command.trim() === '') return;
        setOutput(prev => prev + `\n$ ${command}\n`);
        try {
            const response = await fetch('/api/terminal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command })
            });
            const data = await response.json();
            setOutput(prev => prev + data.output + (data.error ? `\nError: ${data.error}` : '') + '\n');
            outputRef.current?.scrollTop = outputRef.current?.scrollHeight;
        } catch (error) {
            setOutput(prev => prev + `Error: ${error.message}\n`);
        }
        setCommand('');
    };

    return (
        <div className="terminal-container">
            <div className="terminal-output" ref={outputRef}> {output} </div>
            <div className="terminal-input-area">
                <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && executeCommand()} placeholder="Enter command..." className="terminal-input" />
                <button onClick={executeCommand} className="execute-btn">Execute</button>
            </div>
        </div>
    );
}

export default Terminal;