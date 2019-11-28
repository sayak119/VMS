from django.db import models

# Create your models here.
WALK_TYPE = [
    ('I', 'CheckIn'),
    ('O', 'CheckOut'),
]


class Host(models.Model):
    name = models.CharField(max_length=52)
    email = models.EmailField()
    phone = models.CharField(max_length=12)
    address = models.TextField()


class Guest(models.Model):
    host = models.ForeignKey(Host, on_delete=models.SET_NULL, null=True, blank=False)
    name = models.CharField(max_length=52)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=12)


class Visit(models.Model):
    host = models.ForeignKey(Host, on_delete=models.SET_NULL, null=True, blank=False)
    guest = models.ForeignKey(Guest, on_delete=models.SET_NULL, null=True, blank=False)
    check_in_time = models.DateTimeField(auto_created=True)
    check_out_time_temp = models.DateTimeField(auto_created=False, null=True, blank=True)
    token = models.CharField(max_length=20)

    @property
    def check_out_time(self):
        if self.check_out_time_temp:
            return self.check_out_time_temp
        else:
            return "Not Checked Out Yet."
