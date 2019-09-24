from flask import Flask
from redis import Redis
import os
import socket

app = Flask(__name__)
redis = Redis(host=os.environ.get('REDIS_HOST', '127.0.0.1'), port=6379)

@app.route('/')
def hello():
    redis.incr('hits')
    return 'Hello container world, I have been seen %s times and my hostname is %s.\n'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)