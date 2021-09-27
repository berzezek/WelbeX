from django.db import models


class Table(models.Model):
    date = models.DateField('Дата')
    title = models.CharField('Название', max_length=127)
    quantity = models.IntegerField('Количество')
    distance = models.FloatField('Расстояние')

    def __str__(self):
        return self.title
