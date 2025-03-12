$('#form1').click(function(event) {
    event.preventDefault();

    // Get the input values
    let productName = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;  // Fixed field
    let date = document.getElementById('period').value;  // Fixed field
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Debugging logs
    console.log('Product Name:', productName);
    console.log('Price:', price);
    console.log('Quantity:', quantity);
    console.log('Date:', date);
    console.log('CSRF Token:', csrf_token);

    // Check if all fields are filled
    if (!productName || !price || !quantity || !date) {
        alert('Please fill all the fields');
        return false;  // Stop the form submission if any required field is empty
    }
    
    if (productName.length>20){
        alert('length of the product is more decrese the length')
        return false;
    }
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
    

    $.ajax({
        type: "POST",
        url: '/stockapp/saveproduct/',
        data: {
            'productname': productName,
            'price': price,
            'quantity': quantity,
            'date': date,
            'csrfmiddlewaretoken': csrf_token  // Make sure CSRF token is included in the data
        },
        headers: {
            'X-CSRFToken': csrf_token  // This is also correct
        },
        success: function(response) {
            console.log('Response:', response);
            alert('Data submitted successfully');
        },
        error: function(response) {
            console.log('Error:', response);
            alert('Data submission failed');
        }
    });

    return false;  // Prevent form submission
});
