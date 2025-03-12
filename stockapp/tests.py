from django.test import TestCase
from . models import stock_table

# Create your tests here.'''
class create_product_Tests(TestCase):
    def setUp(self):
        self.dummy=stock_table.objects.create(productname='blackcurrant',
                                         product_price=897,
                                         product_quantity=430,
                                         product_period='2023-09-06')
    def tests_create_product(self):
        url='/stockapp/saveproduct/'
        data={
                'productname':self.dummy.productname,
                'price':self.dummy.product_price,
                'quantity':self.dummy.product_quantity,
                'date':self.dummy.product_period
        }
        resp=self.client.post(url,data)
        p=resp.json()
        print(8,resp.json())
        #p=resp.json()
       # print(45,p)
        self.assertEqual(resp.status_code,200)

        self.assertNotIsInstance(p['created_Data']['product_name'],str)



class fetch_product_Tests(TestCase):
    def setUp(self):
        self.dummy=stock_table.objects.create(productname='blackcurranty',
                                         product_price=897,
                                         product_quantity=430,
                                         product_period='2023-09-06')
    def tests_get(self):
        url='/stockapp/display/'
        resp=self.client.get(url)
        p=resp.json()
        print(56,p)
        self.assertEqual(self.dummy.productname,p['available_stock'][0]['product_name'])
        with self.assertRaises(AssertionError):

            self.assertEqual(self.dummy.productname,'')



            
class update_product_Tests(TestCase):
    def setUp(self):
        self.dummy=stock_table.objects.create(productname='blackcurranty',
                                         product_price=897,
                                         product_quantity=430,
                                         product_period='2023-09-06')
    def tests_update(self):
        url='/stockapp/update/1'
        data={
            'productname':self.dummy.productname,
            'price':self.dummy.product_price,
            'quantity':self.dummy.product_quantity,
            'period':self.dummy.product_period,

        }
        resp=self.client.post(url,data)
        p=resp.json()
        print(11,p)
        self.assertEqual(resp.status_code,200)
        self.assertNotEqual(self.dummy.productname,p['data']['productname'])
       
class delete_products_Tests(TestCase):
    def setUp(self):
        self.dummy=stock_table.objects.create(productname='blackcurranty',
                                         product_price=897,
                                         product_quantity=430,
                                         product_period='2023-09-06')
    def tests_delete(self):
        url='/stockapp/delete/1'
        data={
            'id':1
        }
        resp=self.client.post(url,data)
        print(12,resp)
        #p=resp.json()
        #print(11,p)
        self.assertEqual(resp.status_code,200)
        self.assertEqual(data['id'],self.dummy.id)