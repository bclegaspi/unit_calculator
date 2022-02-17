const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        // for users
        db.run(`CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)`,
            (err) => {
                if (err) {
                    // Table already created
                }
            });
        // for conversion look up
        db.run(`CREATE TABLE conversions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                unit_from text,
                unit_to text,
                is_to text
                )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO conversions (unit_from, unit_to, is_to) VALUES (?,?,?)'
                    db.run(insert, ["liter", "barrel", "0.00629"]);
                    db.run(insert, ["barrel", "liter", "158.99"]);
                    db.run(insert, ["liter", "hogshead", "0.0041932072"]);
                    db.run(insert, ["hogshead", "liter", "238.480942392"]);
                    db.run(insert, ["shake", "hour", "2.7777777777778E-12"]);
                    db.run(insert, ["hour", "shake", "360000000000"]);
                }
            });
        // for user record
        db.run(`CREATE TABLE user_conversions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                unit_from text,
                unit_to text,
                convert text,
                answer text,
                )`,
            (err) => {
                if (err) {
                    // Table already created
                }
            });
    }
});


module.exports = db