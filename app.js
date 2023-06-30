const apiUrl = 'http://localhost:893';

// Function to fetch active orders from the API
async function fetchActiveOrders(strategyId) {
  try {
    const response = await fetch(`${apiUrl}/getActiveOrders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ strategy_id: strategyId })
    });
    const data = await response.json();
    return data.order_id_list;
  } catch (error) {
    console.error('Error fetching active orders:', error);
    return [];
  }
}

// Function to filter orders based on conditions
async function filterOrders(strategyId, filterOptions) {
  try {
    const response = await fetch(`${apiUrl}/filterOrders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        strategy_id: strategyId,
        active: filterOptions.active,
        exchange: filterOptions.exchange,
        ticker: filterOptions.ticker
      })
    });
    const data = await response.json();
    return data.filtered_order_ids;
  } catch (error) {
    console.error('Error filtering orders:', error);
    return [];
  }
}

// Function to render orders table
function renderOrdersTable(orderIds) {
  const tableBody = document.getElementById('orders-table-body');
  tableBody.innerHTML = '';

  orderIds.forEach(orderId => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${orderId}</td>`;
    tableBody.appendChild(row);
  });
}

// Function to handle filter form submission
function handleFilterSubmit(event) {
  event.preventDefault();

  const strategyId = document.getElementById('strategy-id-input').value;
  const activeFilter = document.getElementById('active-filter').checked;
  const exchangeFilter = document.getElementById('exchange-filter').value;
  const tickerFilter = document.getElementById('ticker-filter').value;

  const filterOptions = {
    active: activeFilter,
    exchange: exchangeFilter,
    ticker: tickerFilter
  };

  filterOrders(strategyId, filterOptions)
    .then(filteredOrderIds => renderOrdersTable(filteredOrderIds))
    .catch(error => console.error('Error filtering orders:', error));
}

// Function to initialize the app
function init() {
  const filterForm = document.getElementById('filter-form');
  filterForm.addEventListener('submit', handleFilterSubmit);
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
