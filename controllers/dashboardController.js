const pool = require("../config/db");

exports.summary = async (req, res) => {
  const income = await pool.query(
    `SELECT SUM(amount) 
     FROM financial_records 
     WHERE type='income' AND is_deleted=false AND user_id=$1`,
    [req.user.id]
  );

  const expense = await pool.query(
    `SELECT SUM(amount) 
     FROM financial_records 
     WHERE type='expense' AND is_deleted=false AND user_id=$1`,
    [req.user.id]
  );

  const totalIncome = income.rows[0].sum || 0;
  const totalExpense = expense.rows[0].sum || 0;

  res.json({
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense
  });
};

exports.categorySummary = async (req, res) => {
  const result = await pool.query(
    `SELECT category, SUM(amount)
     FROM financial_records
     WHERE is_deleted=false AND user_id=$1
     GROUP BY category`,
    [req.user.id]
  );

  res.json(result.rows);
};

exports.recentTransactions = async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM financial_records
     WHERE is_deleted=false AND user_id=$1
     ORDER BY date DESC
     LIMIT 5`,
    [req.user.id]
  );

  res.json(result.rows);
};

exports.monthlySummary = async (req, res) => {
  const result = await pool.query(
    `SELECT DATE_TRUNC('month', date) AS month,
            SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
            SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
     FROM financial_records
     WHERE is_deleted=false AND user_id=$1
     GROUP BY month
     ORDER BY month`,
    [req.user.id]
  );

  res.json(result.rows);
};