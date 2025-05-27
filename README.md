# 白銀價格追蹤系統

這是一個用於追蹤白銀價格的網頁應用程式，可以記錄和查詢白銀的歷史價格數據。

## 功能特點

- 新增白銀價格記錄
- 查看所有歷史價格記錄
- 按日期範圍搜尋價格記錄
- 響應式設計，支援各種裝置

## 技術棧

- 前端：HTML, CSS, JavaScript (Bootstrap 5)
- 後端：Node.js, Express.js
- 資料庫：SQLite

## 安裝步驟

1. 確保已安裝 Node.js
2. 克隆此專案
3. 安裝依賴：
   ```bash
   npm install
   ```
4. 啟動伺服器：
   ```bash
   npm start
   ```
5. 在瀏覽器中訪問：`http://localhost:3000`

## 資料庫結構

資料庫使用 SQLite，包含以下表格：

```sql
CREATE TABLE IF NOT EXISTS silver_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,         -- 價格記錄的日期 (例如 2024-05-01)
    price REAL NOT NULL         -- 白銀價格 (以每盎司美元計)
);
```

## API 端點

- GET `/api/prices` - 獲取所有價格記錄
- POST `/api/prices` - 新增價格記錄
- GET `/api/prices/search` - 搜尋特定日期範圍的價格記錄

## 開發者

陳心樺

## 授權

ISC
