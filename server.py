import http.server
import socketserver

# Define the port number
PORT = 8000

# Create a simple HTTP server to host the files
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Server running at http://0.0.0.0:{}".format(PORT))
    httpd.serve_forever()
