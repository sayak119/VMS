import json
import random

from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from .Communication import Email, Sms
from .models import Host, Guest, Visit

email = Email()
sms = Sms()


@csrf_exempt
def check_in(request):
    data = (json.loads(request.body.decode('utf-8')))
    host = get_object_or_404(Host, email=data['hostemail'])

    if host:
        guest = Guest.objects.create(host=host,
                                     name=data['name'],
                                     email=data['guestemail'],
                                     phone=data['phone'],
                                     )
        email.send_mail(host.email,
                        subject=f"{guest.name} is here for you.",
                        body=f"{guest.name} is here for you. You can contact {guest.name} on {guest.email} or {guest.phone}"
                             f" Check In time : {timezone.now()}")
        token = random.randint(100000, 999999)
        Visit.objects.create(host=host, guest=guest, token=token, check_in_time=timezone.now())
        email.send_mail(guest.email,
                        subject=f"Your Checkin Token.",
                        body=f"Your Checkout Token in {token}")
        sms.sendSMS(guest.phone, f'Your Token for check out is {token}.')
        return HttpResponse(status=200)


@csrf_exempt
def checkout(request):
    data = (json.loads(request.body.decode('utf-8')))
    visit = get_object_or_404(Visit, token=data['token'])
    if visit:
        visit.check_out_time_temp = timezone.now()
        guest = visit.guest
        visit.save()
        table = f'''<table>
                        <tr>
                            <td>Phone Number </td>
                            <td>{guest.phone}</td>
                        </tr>
                        <tr>
                            <td>Check In time </td>
                            <td>{visit.check_in_time}</td>
                        </tr><tr>
                            <td>Checkout Time </td>
                            <td>{visit.check_out_time}</td>
                        </tr><tr>
                            <td>Host Name </td>
                            <td>{visit.host.name}</td>
                        </tr>
                        <tr>
                            <td>Address Visited </td>
                            <td>{visit.host.address}</td>
                        </tr>
                    </table>'''
        email.send_mail(guest.email,
                        subject=f"Thanks for visiting.",
                        body=f"Hello {guest.name}, Thanks for Visiting, " + table)

        return HttpResponse(status=200)


@csrf_exempt
def host(request):
    data = (json.loads(request.body.decode('utf-8')))
    Host.objects.create(name=data['name'], email=data['email'], phone=data['phone'], address=data['address'])
    return HttpResponse(status=200)


def admin(request):
    visits = Visit.objects.all()
    main_data = {}
    main_data['data'] = []
    for visit in visits:
        data = {}
        data['Token'] = visit.token
        data['guestname'] = visit.guest.name
        data['guestphone'] = visit.guest.phone
        data['guestemail'] = visit.guest.email
        data['checintime'] = visit.check_in_time
        data['checkouttime'] = visit.check_out_time
        data['hostname'] = visit.host.name
        data['hostemail'] = visit.host.email
        data['hostphone'] = visit.host.phone
        data['address'] = visit.host.address
        main_data['data'].append(data)
    return JsonResponse(main_data, safe=False)


def admin_dajngo(request):
    visits = Visit.objects.all()
    visit_count = Visit.objects.filter(check_out_time_temp=None).count()
    context = {'visits': visits, 'visit_count': visit_count}
    return render(request, 'admin.html', context=context)
