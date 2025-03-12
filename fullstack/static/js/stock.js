$('#form1').click(function(event){
    event.preventDefault();

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
    let k=true;
    
    
    
    $.ajax({
        type:"POST",
        url:'/crudapp/adddata/',
        data:{
            'productname':productName,
            'price':price,
            'quantity':quantity,
            'date':date
        },
        headers:{
            'x-CSRFToken':csrf_token
        },
        success : function(response){
            console.log(response);
            alert ('data submitteed')
        },
        error : function(){
            alert('data not submitted')
        }
    });
    return false;

});
