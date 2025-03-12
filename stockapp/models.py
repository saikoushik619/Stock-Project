from django.db import models

# Create your models here.
class stock_table(models.Model):
    productname=models.CharField(max_length=22,null=True)
    product_price=models.DecimalField(default=0,max_digits=5,decimal_places=2)
    product_quantity=models.PositiveIntegerField(default=0,null=True)
    product_period=models.DateField(auto_now=True)
    def __str__(self):
       return ('{},{},{},{}'.format(self.productname,self.product_price,self.product_quantity,self.product_period))