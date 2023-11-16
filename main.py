from API import app
import sys

#para imprimir los endpoint de la funcionalidad
if len(sys.argv) > 1 and sys.argv[1] == "list":
    print(app.url_map)
elif __name__ == "__main__":
    app.run( debug=True, port= 5200)
