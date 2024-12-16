from flask import Flask, render_template, redirect, request, flash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import secrets

load_dotenv()

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')


mail = Mail(app)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route('/send-form', methods=['POST'])
def send_form():
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    details = request.form.get('details')

    if not name or not email or not phone or not details:
        flash("Все поля обязательны для заполнения!")
        return redirect('/')
    
    try:
        msg = Message(
            subject='Новая заявка с сайта',
            sender=app.config['MAIL_USERNAME'],
            recipients=['hot-hix@mail.ru']
        )
        msg.body = f"""
        Имя: {name}
        Email: {email}
        Телефон: {phone}
        Детали заказа: {details}
        """

        mail.send(msg)
        flash("Ваша заявка успешно отправлена!")
    except Exception as e:
        flash(f"Ошибка при отправке: {e}")

    return redirect('/')
    

if __name__ == "__main__":
    app.run(debug=True)  # Не забыть перед открытием выключить