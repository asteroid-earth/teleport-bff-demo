from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/analytics/data')
def get_analytics_data():
    app.logger.warning("HELLO FROM ANALYTICS API")
    return jsonify({
        "daily_active_users": random.randint(1000, 5000),
        "weekly_active_users": random.randint(5000, 20000),
        "monthly_active_users": random.randint(20000, 100000),
        "average_session_duration": round(random.uniform(1, 30), 2)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)