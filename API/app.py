from flask import Flask

app = Flask(__name__)

app.static_folder = 'app/static'

if __name__ == "__main__":
    app.run(debug=True)
