from flask import Flask, request, jsonify
import sqlite3
import uuid
import time

app = Flask(__name__)
DATABASE = 'crypto_exchange.db'

def fetch_active_orders(strategy_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    query = '''SELECT id FROM orders WHERE strategy_id = ? AND status = 'active';'''
    cursor.execute(query, (strategy_id,))

    order_id_list = [row[0] for row in cursor.fetchall()]

    cursor.close()
    conn.close()

    return order_id_list

# Function to execute SQL queries on the database
def execute_query(query, params=None, retry=False):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        conn.commit()
        return True
    except sqlite3.OperationalError as e:
        if retry:
            # Retry after a short delay
            time.sleep(0.5)
            return execute_query(query, params, retry=False)
        else:
            return False
    finally:
        cursor.close()
        conn.close()

# Create the orders table if it doesn't exist
def create_orders_table():
    query = '''CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                exchange TEXT,
                ticker TEXT,
                side TEXT,
                size REAL,
                order_type TEXT,
                strategy_id TEXT,
                status TEXT DEFAULT 'active',
                received_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                send_datetime TIMESTAMP
            );'''
    execute_query(query)


# API endpoint to post an order
@app.route('/postOrder', methods=['POST',"GET"])
def post_order():
    try:
        data = request.get_json()
        exchange = data.get('exchange')
        ticker = data.get('ticker')
        side = data.get('side')
        size = data.get('size')
        order_type = data.get('orderType')
        strategy_id = data.get('strategy_id')
        send_datetime = data.get('send_datetime')  # Received send_datetime from client

        # Generate a unique order ID
        order_id = str(uuid.uuid4())

        query = '''INSERT INTO orders (id, exchange, ticker, side, size, order_type, strategy_id, send_datetime)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);'''

        if execute_query(query, (order_id, exchange, ticker, side, size, order_type, strategy_id, send_datetime), retry=True):
            response = {
                'success': True,
                'orderId': order_id
            }
        else:
            response = {
                'success': False,
                'message': 'Failed to post order. Please try again.'
            }

        return jsonify(response)
    except Exception as e:
        response = {
            'success': False,
            'message': str(e)
        }
        return jsonify(response), 500

  # API endpoint to cancel an order
@app.route('/cancelOrder', methods=['POST'])
def cancel_order():
    try:
        data = request.get_json()
        order_id = data.get('order_id')

        query = '''UPDATE orders SET status = 'cancelled' WHERE id = ?;'''

        if execute_query(query, (order_id,)):
            response = {
                'success': True,
                'message': 'Order cancelled successfully.'
            }
        else:
            response = {
                'success': False,
                'message': 'Failed to cancel order. Please try again.'
            }

        return jsonify(response)
    except Exception as e:
        response = {
            'success': False,
            'message': str(e)
        }
        return jsonify(response), 500


# API endpoint to get active orders for a specific strategy
@app.route('/getActiveOrders', methods=['POST'])
def get_active_orders():
    try:
        data = request.get_json()
        strategy_id = data.get('strategy_id')

        order_id_list = fetch_active_orders(strategy_id)

        response = {
            'order_id_list': order_id_list
        }

        return jsonify(response)
    except Exception as e:
        response = {
            'success': False,
            'message': str(e)
        }
        return jsonify(response), 500


if __name__ == '__main__':
    create_orders_table()
    app.run(debug=True)
