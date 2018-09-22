#!/usr/bin/env python3

from flask import Flask, render_template, request, jsonify
from pprint import pprint
import sys, textwrap

app = Flask(__name__)

LIST_MATCHING = list()

INST_WEB_SOCK = None

@app.route("/")
def index():
    # return "Hello World!"
    return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/search")
def search():
    return render_template("search.html")

@app.route("/api/search", methods=["GET", "POST"])
def post_search():
    json_response = {
        "users": [
            {
                "number": "4",
                "position": "後ろ"
            },
            {
                "number": "4",
                "position": "中央"
            },
            {
                "number": "5",
                "position": "後ろ"
            },
        ]
    }
    return jsonify(json_response)

@app.route("/api/register", methods=["POST"])
def post_register():
    global LIST_MATCHING

    print("==== HEADER ====")
    print(request.headers)
    print("===== BODY =====")
    print(request.form)
    print("=====  END =====")

    request_query = dict()
    for k, v in request.form.items():
        print(k, v)
        request_query[k] = v

    LIST_MATCHING.append(request_query)

    pprint(LIST_MATCHING)

    return jsonify(request_query)

        
if __name__ == '__main__':
    print(textwrap.dedent('''\
        Flask server for deploy web-pages
        
        usage: python3 app.py [-h host-addr] [-p port-number]

        options 
            -h   set host address of server   (default: localhost(127.0.0.1))
            -p   set port number of server    (default: 5500)
    '''))

    args = sys.argv[1:]

    server_host_addr = "127.0.0.1" 
    if '-h' in args:
        server_host_addr = args[ args.index('-h') + 1 ]
    
    server_host_port = 5500
    if '-p' in args:
        server_host_port = args[ args.index('-p') + 1 ]

    app.run(host=server_host_addr, port=server_host_port)



