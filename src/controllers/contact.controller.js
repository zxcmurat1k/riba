const connectDB = require('../db');

function escape(str) {
    return String(str).replace(/'/g, "''");
}

exports.sendContact = async (req, res) => {
    try {
        const db = await connectDB();

        const { name, email, subject, message } = req.body;

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

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};