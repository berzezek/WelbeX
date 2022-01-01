from django.test import TestCase
import string
import random
from .models import Table


# Create your tests here.

class ProfileCase(TestCase):

    def test_databaseCreate(self):
        
        for _ in range(100):
            word = ''
            for _ in range(5):
                letter = random.choice(string.ascii_letters)
                word += letter
            print(word)
            t, _ = Table.objects.get_or_create(
                date=f'20{str(random.randint(10, 21))}-{str(random.randint(1,12))}-{str(random.randint(1, 28))}', 
                title=word,
                quantity=random.randint(1, 100),
                distance=random.randint(1, 500),
            )
