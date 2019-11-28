import json

from django.test import TestCase
from django.utils import timezone

from .models import Host, Guest, Visit


# Create your tests here.
class ViewTest(TestCase):
    reset_sequences = False
    serialized_rollback = True

    def setUp(self) -> None:
        self.token = 000000
        self.host = Host.objects.create(name="TestMainHost",
                                        email='TestMainHost@gmail.com',
                                        phone='0000000000',
                                        address='500')

        self.guest = Guest.objects.create(host=self.host,
                                          name="TestMainGuest",
                                          email="TestMainGuest@gmail.com",
                                          phone='88888888',
                                          )

        self.visit = Visit.objects.create(host=self.host,
                                          guest=self.guest,
                                          token=self.token,
                                          check_in_time=timezone.now())

    def test_creating_host(self):
        host_len = Host.objects.count()
        res = self.client.post("/host",
                               json.dumps({"name": "testhost",
                                           "email": "host@gmail.com",
                                           "phone": "0000000000",
                                           "address": "test address"}),
                               content_type="application/json")
        assert (res.status_code == 200)
        assert (len(Host.objects.all()) == host_len + 1)

    def test_checkin(self):
        res = self.client.post("/checkin",
                               json.dumps({"hostemail": self.host.email,
                                           "name": "ayush",
                                           "guestemail": "guestemail@fsdfb.com",
                                           "phone": "80000000"}),
                               content_type="application/json")
        assert (res.status_code == 200)

    def test_checkout(self):
        res = self.client.post("/checkout",
                               json.dumps({"token": self.token}),
                               content_type="application/json")
        assert (res.status_code == 200)
