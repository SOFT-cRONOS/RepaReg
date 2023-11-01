from flask import Flask, render_template, request, jsonify, after_this_request

app = Flask(__name__)

# Configura el directorios por defecto
app.static_folder = 'app/static'
app.template_folder = 'app/templates'

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/login')
# def login():
#     return render_template('user/login.html')

# @app.route('/nitem')
# def nitem():
#     return render_template('items/new_item.html')


@app.route('/hello', methods=['GET'])
def hello():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    jsonResp = {'jack': 4098, 'sape': 4139}
    print(jsonResp)
    return jsonify(jsonResp)


if __name__ == "__main__":
    app.run(debug=True)
