const pool = require("../config/db");

exports.createRecord = async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  const record = await pool.query(
    `INSERT INTO financial_records
     (user_id, amount, type, category, date, notes)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [req.user.id, amount, type, category, date, notes]
  );

  res.status(201).json(record.rows[0]);
};

exports.getRecords = async (req, res) => {
  const { type, category, startDate, endDate, page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  let query =
    "SELECT * FROM financial_records WHERE is_deleted=false";
  let values = [];

  if (type) {
    values.push(type);
    query += ` AND type=$${values.length}`;
  }

  if (category) {
    values.push(category);
    query += ` AND category=$${values.length}`;
  }

  query += ` LIMIT ${limit} OFFSET ${offset}`;

  const records = await pool.query(query, values);
  res.json(records.rows);
};

exports.updateRecord = async (req, res) => {
  const { id } = req.params;
  const { amount, type, category, date, notes } = req.body;

  await pool.query(
    `UPDATE financial_records
     SET amount=$1,type=$2,category=$3,date=$4,notes=$5
     WHERE id=$6`,
    [amount, type, category, date, notes, id]
  );

  res.json({ message: "Updated" });
};

exports.deleteRecord = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "UPDATE financial_records SET is_deleted=true WHERE id=$1",
    [id]
  );

  res.json({ message: "Deleted" });
};