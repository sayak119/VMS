# from twilio.rest import Client
import configparser
import urllib.parse
import urllib.request

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

config = configparser.ConfigParser()
config.read('Communication.ini')


class Sms:
    def __init__(self):
        # self.text_local_api_key = 'M3O0sUx8HI0-VpyuCWMntVLZ7kqTt8XVrXi58MzwAy'
        self.text_local_api_key = config['DEFAULT']['sms_api']

    def sendSMS(self, numbers, message):
        data = urllib.parse.urlencode({'apikey': self.text_local_api_key, 'numbers': numbers,
                                       'message': message})
        data = data.encode('utf-8')
        request = urllib.request.Request("https://api.textlocal.in/send/?")
        f = urllib.request.urlopen(request, data)
        fr = f.read()
        return fr




class Email:
    def __init__(self):
        # self.api_key = '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'
        self.api_key = config['DEFAULT']['email_api']

    def send_mail(self, reciver, subject, body):
        message = Mail(
            from_email='testmail@testmail.com',
            to_emails=reciver,
            subject=subject,
            html_content=body)

        try:
            sg = SendGridAPIClient(self.api_key)
            response = sg.send(message)
            # print(response.status_code)
            # print(response.body)
            # print(response.headers)
        except Exception as e:
            print('errror')
            print(e.message)
