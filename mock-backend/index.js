
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { WebSocketServer } = require('ws');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Simple in-memory storages
const history = [];
const agents = [
  { id: 'a1', name: 'Research Bot', description: 'Search & summarize.' },
  { id: 'a2', name: 'Emotion Agent', description: 'Detect sentiment.' }
];

app.post('/v1/chat', (req, res) => {
  const { input } = req.body;
  const reply = { role: 'assistant', text: `Echo: ${input}` };
  history.push({ role: 'user', text: input });
  history.push(reply);
  res.json({ success: true, reply });
});

// File upload
const upload = multer({ dest: 'uploads/' });
app.post('/v1/files/upload', upload.single('file'), (req, res) => {
  res.json({ success: true, file: { originalname: req.file.originalname, mimetype: req.file.mimetype } });
});

// Agents
app.get('/v1/agents', (req, res) => res.json(agents));
app.post('/v1/agents/run', (req, res) => {
  const { agentId, input } = req.body;
  res.json({ started: true, agentId, result: `Ran ${agentId} on ${JSON.stringify(input)}` });
});

// Vision analyze (placeholder)
app.post('/v1/vision/analyze', (req, res) => {
  res.json({ labels: ['object', 'placeholder'], confidence: 0.8 });
});

// Billing/status placeholder
app.get('/v1/billing/status', (req, res) => res.json({ tier: 'free', usage: 0 }));

// History
app.get('/v1/history', (req, res) => res.json(history));

const server = app.listen(8080, () => console.log('Mock backend listening on http://localhost:8080'));

// Simple WebSocket for /v1/chat/stream and /v1/audio/stt/stream
const wss = new WebSocketServer({ server });
wss.on('connection', (ws, req) => {
  const url = req.url || '';
  if (url.includes('/v1/chat/stream')) {
    ws.on('message', (msg) => {
      try {
        const d = JSON.parse(msg.toString());
        if (d.type === 'user_message') {
          // Simulate streaming: send parts
          const text = d.text || '';
          let i = 0;
          const interval = setInterval(() => {
            i++;
            ws.send(JSON.stringify({ role: 'assistant', text: text.split('').slice(0, i).join('') }));
            if (i > Math.min(50, text.length)) { clearInterval(interval); ws.send(JSON.stringify({ role: 'assistant', text: '\n[END]' })); }
          }, 40);
        }
      } catch (e) {}
    });
  } else if (url.includes('/v1/audio/stt/stream')) {
    ws.on('message', (msg) => {
      // Echo mock transcript
      ws.send(JSON.stringify({ transcript: 'mock transcript (server)' }));
    });
  } else {
    ws.send(JSON.stringify({ message: 'connected' }));
  }
});
