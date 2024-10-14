from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)

def get_db_connection():
    conn = psycopg2.connect(
        host="db",
        database="demo",
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD']
    )
    return conn

@app.route('/api/data')
def get_data():
    app.logger.warning("HELLO")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM demo_table;')
        rows = cur.fetchall()
        cur.close()
        app.logger.warning("BYE")
        conn.close()
        return jsonify({
            "message": "Hello from the Main API!",
            "db_data": rows
        })
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)