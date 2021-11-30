const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.post('/vote', ({ body }, res) => {
    // Data validation
    const errors = inputCheck(body, 'voter_id', 'candidate_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO votes (voter_id, candidate_id) VALUES (?,?)`;
    const params = [body.voter_id, body.candidate_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
});

router.get('/votes')

router.get('/candidate/:id', (req, res) => {
    const sql =`SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id 
                WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
        res.status(400).json({ error: err.message });
        return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });    
});

module.exports = router;