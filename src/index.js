const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 獲取所有價格記錄
app.get('/api/prices', (req, res) => {
    db.all('SELECT * FROM silver_prices ORDER BY date', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 添加新的價格記錄
app.post('/api/prices', (req, res) => {
    const { date, price } = req.body;
    
    if (!date || !price) {
        res.status(400).json({ error: '日期和價格都是必填項' });
        return;
    }

    db.run('INSERT INTO silver_prices (date, price) VALUES (?, ?)', [date, price], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            date,
            price
        });
    });
});

// 搜尋特定日期範圍的價格
app.get('/api/prices/search', (req, res) => {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
        res.status(400).json({ error: '開始日期和結束日期都是必填項' });
        return;
    }

    db.all('SELECT * FROM silver_prices WHERE date BETWEEN ? AND ? ORDER BY date', 
        [startDate, endDate], 
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
});

// 刪除價格記錄
app.delete('/api/prices/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM silver_prices WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: '找不到該筆資料' });
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`伺服器運行在 http://localhost:${port}`);
});
