const express = require('express');
const path = require('path');
const odbc = require('odbc');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// путь к базе Access
const dbPath = "C:\\Users\\Q\\Videos\\fishing-guide-local-edit\\data\\FishingGuide1.accdb";

// подключение к Access
async function connectDB() {
    return await odbc.connect(
        `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=${dbPath};`
    );
}

// --- отправка формы ---
app.post('/api/contact', async (req, res) => {
    try {
        const db = await connectDB();

        const { name, email, subject, message } = req.body;

        function escape(str) {
            return String(str).replace(/'/g, "''");
        }

        const query = `
            INSERT INTO Requests (Name, Email, Subject, Message, CreatedAt)
            VALUES (
                '${escape(name)}',
                '${escape(email)}',
                '${escape(subject)}',
                '${escape(message)}',
                NOW()
            )
        `;

        await db.query(query);

        await db.close();

        res.redirect('/');

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- получить заявки ---
app.get('/api/requests', async (req, res) => {
    try {
        const db = await connectDB();

        const rows = await db.query("SELECT * FROM Requests");

        await db.close();

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});