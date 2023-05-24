# Crypto Exchange API Documentation

The Crypto Exchange API allows you to interact with the crypto exchange platform to post orders, cancel orders, and retrieve active orders for a specific strategy.

## Table of Contents

- [Endpoints](#endpoints)
- [Request Format](#request-format)
- [Response Format](#response-format)
- [Error Handling](#error-handling)

## Endpoints

The following are the available endpoints of the Crypto Exchange API:

- `POST /postOrder`: Post a new order.
- `POST /cancelOrder`: Cancel an existing order.
- `POST /getActiveOrders`: Retrieve active orders for a specific strategy.

## Request Format

### POST /postOrder

Post a new order.

Request Body:
```json
{
  "exchange": "exchange_name",
  "ticker": "ticker_symbol",
  "side": "buy/sell",
  "size": 0.5,
  "orderType": "limit/market",
  "strategy_id": "strategy_identifier",
  "send_datetime": "yyyy-mm-dd hh:mm:ss"
}
```

# Crypto Exchange API Documentation

The Crypto Exchange API allows you to interact with the crypto exchange platform to post orders, cancel orders, and retrieve active orders for a specific strategy.

## Table of Contents

- [Endpoints](#endpoints)
- [Request Format](#request-format)
- [Response Format](#response-format)
- [Error Handling](#error-handling)

## Endpoints

The following are the available endpoints of the Crypto Exchange API:

- `POST /postOrder`: Post a new order.
- `POST /cancelOrder`: Cancel an existing order.
- `POST /getActiveOrders`: Retrieve active orders for a specific strategy.

## Request Format

### POST /postOrder

Post a new order.

Request Body:
```json
{
  "exchange": "exchange_name",
  "ticker": "ticker_symbol",
  "side": "buy/sell",
  "size": 0.5,
  "orderType": "limit/market",
  "strategy_id": "strategy_identifier",
  "send_datetime": "yyyy-mm-dd hh:mm:ss"
}
```
- `exchange` (string, required): Name of the exchange.
- `ticker` (string, required): Ticker symbol of the cryptocurrency.
- `side` (string, required): Order side, either "buy" or "sell".
- `size` (float, required): Order size.
- `orderType` (string, required): Order type, either "limit" or "market".
- `strategy_id` (string, required): Identifier of the strategy associated with the order.
- `send_datetime` (string, optional): Date and time when the order will be sent.

### POST /cancelOrder

Cancel an existing order.

Request Body:

{
"order_id": "order_identifier"
}


- `order_id` (string, required): Identifier of the order to be canceled.

### POST /getActiveOrders

Retrieve active orders for a specific strategy.

Request Body:
{
"strategy_id": "strategy_identifier"
}

- `strategy_id` (string, required): Identifier of the strategy to retrieve active orders.

## Response Format

The API responses are returned in JSON format. The response object contains a `success` flag indicating whether the request was successful, along with relevant data or error messages.

Sample success response:
{
"success": true,
"orderId": "order_identifier"
}

Sample error response:
{
"success": false,
"message": "Error message"
}


## Error Handling

If an error occurs during the API request, an error response will be returned with the appropriate HTTP status code and an error message describing the issue.

Here are some possible error scenarios:

- Invalid or missing request parameters.
- Failed database operations.
- Internal server errors.