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
        patientName: 'bob dylan',
        laborantName: 'Alice Smith',
        diagnosis: 'baş ağrısı',
        details: '3.derece tramva.',
        date: '2024-06-15',
        image: 'https://th.bing.com/th/id/R.ca3e8fe040aa335a0a8d252ac2fb69ae?rik=9QuLnOQ%2bYfp03A&pid=ImgRaw&r=0',
        tcNumber: '45220034172', // Örnek bir TCK numarası
    },
    {
        id: 2,
        patientName: 'eric getret',
        laborantName: 'Bob Johnson',
        diagnosis: 'ayak bileği çatlağı',
        details: 'yukarı üst bağ-kemik zorlaması ',
        date: '2024-06-14',
        image: 'https://th.bing.com/th/id/OIP.z2vlDGfvpHd1BvHq6R8UZQHaKZ?rs=1&pid=ImgDetMain',
        tcNumber: '76584323491', // Örnek bir TCK numarası
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
