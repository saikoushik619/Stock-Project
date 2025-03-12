from django.http import HttpResponse
from django import forms
from django.core.exceptions import ValidationError

class insert_form(forms.Form):
    productname=forms.CharField(max_length=22)
    price=forms.CharField()
    quantity=forms.CharField()
    date=forms.DateField()
    
    
class Update_form(forms.Form):
    productname=forms.CharField()
    price=forms.DecimalField(max_digits=5,decimal_places=2)
    quantity=forms.CharField()
    period=forms.DateField()

    def clean_productname(self):
        name = self.cleaned_data.get("productname")
        print(20,name)
        if not name.isalpha():
            raise ValidationError('field should be alphabets and not empty')
        return name
