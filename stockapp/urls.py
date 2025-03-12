from django.urls import path
from.import views
urlpatterns=[
    path('addproduct/',views.add_product,name='addproduct'), # call
    path('saveproduct/',views.save_product, name='saveproduct'),
    path('update/<int:id>',views.update_stock),
    path('display/',views.display_stock),
    path('displayhtml/',views.display_html,name='displayhtml'),
    path('delete/<int:id>',views.delete_stock,name='delete'),
    path('insertproduct/',views.insert_form)
]