from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/download_catalog")
def download_catalog():
    return send_from_directory("static/files", "1.pdf", as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True) # Не забыть перед открытием выключить