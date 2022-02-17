const db = require('../repository/database');

module.exports = async (req, res) => {
    const sql = "select * from conversions where unit_from = ? and unit_to = ?"
    const params = [req.body.unit_from, req.body.unit_to];
    const to_convert = req.body.convert;

    db.get(sql, params, (err, row) => {
        let response = {};
        if (err) {
            res.status(400).json({ "error": err.message });
        }
        if (row && Object.keys(row).length) {
            const answer = parseFloat(to_convert) * parseFloat(row.is_to);
            res.status(200).json({
                "message": "success",
                "data": row,
                answer
            });

        } else {
            res.status(400).json({ "error": "Conversion error" });
        }
    });
}
