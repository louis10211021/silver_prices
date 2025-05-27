const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../silver_prices.db'), (err) => {
    if (err) {
        console.error('資料庫連接錯誤:', err.message);
    } else {
        console.log('已成功連接到 SQLite 資料庫');
        // 初始化資料庫
        initDatabase();
    }
});

function initDatabase() {
    // 創建表格
    db.run(`CREATE TABLE IF NOT EXISTS silver_prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        price REAL NOT NULL
    )`, (err) => {
        if (err) {
            console.error('創建表格錯誤:', err.message);
        } else {
            console.log('表格創建成功或已存在');
            // 檢查是否有數據
            db.get('SELECT COUNT(*) as count FROM silver_prices', (err, row) => {
                if (err) {
                    console.error('檢查數據錯誤:', err.message);
                } else if (row.count === 0) {
                    // 插入初始數據
                    const initialData = [
                        ['2015-01-01', 15.50],
                        ['2016-01-01', 14.00],
                        ['2017-01-01', 16.30],
                        ['2018-01-01', 17.00],
                        ['2019-01-01', 15.80],
                        ['2020-01-01', 18.50],
                        ['2021-01-01', 26.40],
                        ['2022-01-01', 22.10],
                        ['2023-01-01', 24.30],
                        ['2024-01-01', 30.80],
                        ['2025-01-01', 34.00]
                    ];

                    const stmt = db.prepare('INSERT INTO silver_prices (date, price) VALUES (?, ?)');
                    initialData.forEach(([date, price]) => {
                        stmt.run(date, price);
                    });
                    stmt.finalize();
                    console.log('初始數據插入成功');
                }
            });
        }
    });
}

module.exports = db;
