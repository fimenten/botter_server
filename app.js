// Fetch orders data from the backend API
function fetchOrders() {
    fetch('/getActiveOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        strategy_id: 'your_strategy_id' // Replace with the actual strategy ID
      })
    })
    .then(response => response.json())
    .then(data => {
      // Update the table with the orders data
      updateTable(data.order_id_list);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
  }
  
  // Update the table with the orders data
  function updateTable(orderIds) {
    const tableBody = document.querySelector('#orders-table tbody');
    tableBody.innerHTML = '';
  
    orderIds.forEach(orderId => {
      // Create a new row for each order
      const row = document.createElement('tr');
      
      // Add the order details as table cells
      row.innerHTML = `
        <td>${orderId}</td>
        <td>Exchange</td>
        <td>Ticker</td>
        <td>Side</td>
        <td>Size</td>
        <td>Order Type</td>
        <td>Status</td>
        <td>Received Timestamp</td>
        <td>Send Datetime</td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  // Filter orders based on the input values
  function filterOrders() {
    const activeFilter = document.querySelector('#active-filter').checked;
    const exchangeFilter = document.querySelector('#exchange-filter').value.trim();
    const tickerFilter = document.querySelector('#ticker-filter').value.trim();
  
    fetch('/filterOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        strategy_id: 'your_strategy_id', // Replace with the actual strategy ID
        active: activeFilter,
        exchange: exchangeFilter,
        ticker: tickerFilter
      })
    })
    .then(response => response.json())
    .then(data => {
      // Update the table with the filtered orders data
      updateTable(data.filtered_order_ids);
    })
    .catch(error => {
      console.error('Error filtering orders:', error);
    });
  }
  
  // Attach event listeners to the filter button and input fields
  document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.querySelector('#filter-btn');
    filterBtn.addEventListener('click', filterOrders);
  
    // Fetch all orders initially
    fetchOrders();
  });
  