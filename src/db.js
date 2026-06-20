const odbc = require('odbc');

const dbPath = "C:\\Users\\Q\\Videos\\fishing-guide-local-edit\\data\\FishingGuide1.accdb";

async function connectDB() {
    return await odbc.connect(
        `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=${dbPath};`
    );
}

module.exports = connectDB;