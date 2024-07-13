const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let reports = [
    {
        id: 1,
        patientName: 'John Doe',
        laborantName: 'Alice Smith',
        diagnosis: 'Lorem ipsum dolor sit amet',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '2024-06-15',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg',
        tcNumber: '12345678901', // Örnek bir TCK numarası
    },
    {
        id: 2,
        patientName: 'Jane Doe',
        laborantName: 'Bob Johnson',
        diagnosis: 'Lorem ipsum dolor sit amet',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '2024-06-14',
        image: 'https://example.com/image2.jpg',
        tcNumber: '12345678901', // Örnek bir TCK numarası
    },
];

app.get('/api/reports/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const report = reports.find((r) => r.id === id);
    if (report) {
        res.json(report);
    } else {
        res.status(404).json({ message: 'Report not found' });
    }
});

app.get('/api/all/reports', (req, res) => {
    res.json(reports);
});

app.post('/api/reports', (req, res) => {
    const newReport = req.body;
    newReport.id = reports.length + 1;
    reports.push(newReport);
    res.status(201).json(newReport);
});

app.put('/api/reports/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateReportIndex = reports.findIndex((r) => r.id === id);
    if (updateReportIndex !== -1) {
        reports[updateReportIndex] = { ...req.body, id };
        res.json(reports[updateReportIndex]);
    } else {
        res.status(404).json({ message: 'Report not found' });
    }
});

app.delete('/api/reports/:id', (req, res) => {
    const id = parseInt(req.params.id);
    reports = reports.filter((r) => r.id !== id);
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
});
