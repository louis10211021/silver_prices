document.addEventListener('DOMContentLoaded', () => {
    // 載入所有價格記錄
    loadPrices();

    // 新增價格表單提交
    document.getElementById('priceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const price = document.getElementById('price').value;

        try {
            const response = await fetch('/api/prices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, price })
            });

            if (!response.ok) {
                throw new Error('新增記錄失敗');
            }

            // 清空表單並重新載入價格列表
            e.target.reset();
            loadPrices();
            alert('新增記錄成功！');
        } catch (error) {
            alert(error.message);
        }
    });

    // 搜尋表單提交
    document.getElementById('searchForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        try {
            const response = await fetch(`/api/prices/search?startDate=${startDate}&endDate=${endDate}`);
            if (!response.ok) {
                throw new Error('搜尋失敗');
            }
            const data = await response.json();
            displayPrices(data);
        } catch (error) {
            alert(error.message);
        }
    });
});

// 載入所有價格記錄
async function loadPrices() {
    try {
        const response = await fetch('/api/prices');
        if (!response.ok) {
            throw new Error('載入價格記錄失敗');
        }
        const data = await response.json();
        displayPrices(data);
    } catch (error) {
        alert(error.message);
    }
}

// 顯示價格列表
function displayPrices(prices) {
    const priceList = document.getElementById('priceList');
    priceList.innerHTML = '';

    prices.forEach(price => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(price.date)}</td>
            <td>$${price.price.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deletePrice(${price.id})">刪除</button></td>
        `;
        priceList.appendChild(row);
    });
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 刪除價格記錄
window.deletePrice = async function(id) {
    if (!confirm('確定要刪除這筆記錄嗎？')) return;
    try {
        const response = await fetch(`/api/prices/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('刪除失敗');
        }
        loadPrices();
    } catch (error) {
        alert(error.message);
    }
}
