$('#btn').click(function(event){
    //event.preDefault();


    let productid=document.getElementById('id').value;
    let productName = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    let date = document.getElementById('date').value;
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;
    console.log(productName);
    console.log(price);
    console.log(quantity);
    console.log(date);
    console.log(csrf_token);
    url='crudapp/update/'+productid
    console.log(url)
    $.ajax({
        type:'POST',
        url:'/crudapp/update/'+productid,
        data:{
            'productname':productName,
            'price':price,
            'quantity':quantity,
            'date':date
        },
        headers:{
            'x-CSRFToken':csrf_token
        },
        success:function(response){
            console.log(response)
            alert('data updated')
        },
        error : function(){
            alert('data not updated')
        }


    });
    return false;
});