from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from.models import stock_table
from .forms import insert_form,Update_form

# Create your views here.
def add_product(request):
    return render(request,'stockapp/addproduct.html')

#API CALL
def save_product(request):
    df=insert_form()
    if request.method=='POST':
        c_data=request.POST
        cleaned_form=insert_form(c_data)
        if cleaned_form.is_valid():
          
            product_name=cleaned_form.cleaned_data.get('productname')
            price=cleaned_form.cleaned_data.get('price')
            quantity=cleaned_form.cleaned_data.get('quantity')
            date=cleaned_form.cleaned_data.get('date')
            added_data=stock_table.objects.create(
                productname=product_name,
                product_price=price,
                product_quantity=quantity,
                product_period=date
            )
            print(29,added_data)
            data={
                'productname':added_data.productname,
                'price':added_data.product_price,
                'quantity':added_data.product_quantity,
                'period':added_data.product_period
            }
            print(36,data)
        
            return JsonResponse({'created_Data':data})
        else:
            return HttpResponse(cleaned_form.errors,status=400)
        

#List Html
def display_html(request):
    return render(request,'stockapp/display.html')
    
    
#Api list
def display_stock(request):
    available_records=stock_table.objects.all()
    print(available_records)
    stock_availabilty=[{
            'product_name':available_data.productname,
            'price':available_data.product_price,
            'quantity':available_data.product_quantity,
            'period':available_data.product_period,
            'id': available_data.id
        } for available_data in available_records]
    
    return JsonResponse({'available_stock': stock_availabilty})


#Update stock
def update_stock(request,id):
   

    if request.method=='POST':
        old_data=stock_table.objects.get(id=id)
        print(request.POST)
        cleaned_form=Update_form(request.POST)
        if cleaned_form.is_valid():
            print('ramayaam',cleaned_form.cleaned_data)
            old_data.productname=cleaned_form.cleaned_data['productname']
            old_data.product_price=cleaned_form.cleaned_data['price']
            old_data.product_quantity=cleaned_form.cleaned_data['quantity']
            old_data.product_period=cleaned_form.cleaned_data['period']
            old_data.save()
            new_data={
                'productname':old_data.productname,
                'price':old_data.product_price,
                'quantity':old_data.product_quantity,
                'period':old_data.product_period
            }
            return JsonResponse({'data':new_data})
        else:
            print(cleaned_form.errors)
            return HttpResponse (cleaned_form.errors,status=400)


#delete stock

def delete_stock(request,id):
    
    if request.method=='POST':
        unwanted_data=stock_table.objects.get(id=id)
        unwanted_data.delete()
        return HttpResponse('iam deleted')



    