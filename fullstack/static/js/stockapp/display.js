$(document).ready(function() {
    $.ajax({
        type:'GET',
        url:'/stockapp/display/',

    
        // headers:{
        //     'x-CSRFToken':csrf_token
        // },
        success:function(response){
            console.log(response)
            let rec;
            for (rec of response.available_stock){
                let row = '<tr>' +
                    '<td >' + rec['product_name'] + '</td>' +
                    '<td >' + rec['quantity'] + '</td>' + 
                    '<td >' + rec['price'] + '</td>' +
                    '<td >' + rec['period'] + '</td>' +
                    '<td style="display:none;">' + rec['id'] + '</td>' +
                    '<td><button class="u-sbtn" >Update</button>&nbsp;<button style="display:none;" class="s-btn" >save</button></td>' +
                    '<td><button class="del-btn"> Delete</button></td>'
                    '</tr>';
      
                 $('#table').append(row)
            }
        },
        error : function(){
            alert('data not updated')
        }


    });
});




// update editable
$(document).on('click', '.u-sbtn',function(event) {
    event.preventDefault();
    
    let current_row=$(this).closest('tr')
    console.log('Update button clicked');
    current_row.find('.u-sbtn').hide();
    current_row.find('.s-btn').show();

    current_row.find('td').each(function() {
            $(this).attr('contenteditable', true);
        });
    

    // update record
    
    $('.s-btn').click(function(event){
        
        event.preventDefault()
        let productName = current_row.find('td').eq(0).text();
        let quantity = parseInt(current_row.find('td').eq(1).text());
        let price = parseFloat(current_row.find('td').eq(2).text());
        let period = new Date(current_row.find('td').eq(3).text()).toISOString().split('T')[0];;
        let productid = current_row.find('td').eq(4).text();
        let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        console.log('Product Name:', productName);
        console.log('Quantity:', quantity);
        console.log('Price:', price);
        console.log('Period:', period);
        console.log(productid)
        if (!productName || !price || !quantity || !period) {
            alert('Please fill all the fields');
            return false;  // Stop the form submission if any required field is empty
        }
        
        if (productName.length>20){
            alert('length of the product is more decrese the length')
            return false;
        }
        if (isNaN(price)) {
            alert('Price must be a valid number');
            return false;
        }
        if (isNaN(quantity)) {
            alert('Quantity must be a valid number');
            return false;
        }
        if (isNaN(new Date(period).getTime())) {
            alert('Period must be a valid date');
            return false;
        }
        
        
    
        $.ajax({
            type:'POST',
            url:`/stockapp/update/${productid}`,
            data:{
                'productname':productName,
                'price':price,
                'quantity':quantity,
                'period':period
    
            },
            headers:{
                'x-CSRFToken':csrf_token
            },
            
            success : function(){
                alert('data updated');
                window.location.reload();
            },
            error : function(){
                alert('data not updated')
            }
    })
    
   
    })
    
});


$(document).on('click', '.del-btn', function(event) {
    event.preventDefault();
    
    recordDelete = confirm("R u sure u want to del this rec?")

    if (recordDelete){
        let present_row=$(this).closest('tr');
        let productid = present_row.find('td').eq(4).text();
        let productName = present_row.find('td').eq(0).text();

        // get csrf_token value
        let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;

        $.ajax({
            type:'POST',
            url:`/stockapp/delete/${productid}`,
            data:{
                'id':productid
            },
            headers:{
                'x-CSRFToken':csrf_token,
            },
            success : function(response){
                alert (`${productName} deleted successfully`)
                window.location.reload()
            },
           
            error: function(error){
                alert(`${productName} not deleted`)
            }
        }) 
    }
    else{
    console.log('not deleted')
    }
});