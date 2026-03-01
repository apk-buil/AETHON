// agent management routes

const express = require('express');
const router = express.Router();

// Mock database for agents
let agents = [];

// GET /api/agents - Retrieve all agents
router.get('/', (req, res) => {
    res.json(agents);
});

// POST /api/agents - Create a new agent
router.post('/', (req, res) => {
    const newAgent = req.body;
    agents.push(newAgent);
    res.status(201).json(newAgent);
});

// PUT /api/agents/:id - Update an existing agent
router.put('/:id', (req, res) => {
    const agentId = req.params.id;
    const index = agents.findIndex(agent => agent.id === agentId);
    if (index !== -1) {
        agents[index] = { ...agents[index], ...req.body };
        res.json(agents[index]);
    } else {
        res.status(404).send('Agent not found');
    }
});

// DELETE /api/agents/:id - Delete an agent
router.delete('/:id', (req, res) => {
    const agentId = req.params.id;
    agents = agents.filter(agent => agent.id !== agentId);
    res.status(204).send();
});

module.exports = router;
