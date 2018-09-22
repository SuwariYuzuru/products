#!/usr/bin/env python3

import logging, json, textwrap, sys
from websocket_server import WebsocketServer

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter(
	' %(module)s -  %(asctime)s - %(levelname)s - %(message)s'))
logger.addHandler(handler)

# Callback functions


def new_client(client, server):
	logger.info('New client {}:{} has joined.'.format(
		client['address'][0], client['address'][1]))


def client_left(client, server):
	logger.info('Client {}:{} has left.'.format(
		client['address'][0], client['address'][1]))


def message_received(client, server, message):
	logger.info('Message "{}" has been received from {}:{}'.format( message, client['address'][0], client['address'][1]))
	server.send_message_to_all("matched")
	
#   reply_message = 'Hi! ' + message
	
	# server.send_message(client, reply_message)
	
#   logger.info('Message "{}" has been sent to {}:{}'.format(
	#   reply_message, client['address'][0], client['address'][1]))


# Main
if __name__ == "__main__":
	print(textwrap.dedent('''\
		Websocket server 

		usage: python3 wsock_server.py [-h host-addr] [-p port-number]

		options
			-h   set host address of server   (default: localhost(127.0.0.1))
			-p   set port number of server    (default: 12345)
	'''))

	args = sys.argv[1:]

	server_host_addr = "127.0.0.1" 
	if '-h' in args:
		server_host_addr = args[ args.index('-h') + 1 ]
	
	server_host_port = 12345
	if '-p' in args:
		server_host_port = args[ args.index('-p') + 1 ]

	server = WebsocketServer(host=server_host_addr, port=server_host_port, loglevel=logging.INFO)
	server.set_fn_new_client(new_client)
	server.set_fn_client_left(client_left)
	server.set_fn_message_received(message_received)
	server.run_forever()
