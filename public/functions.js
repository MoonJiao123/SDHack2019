// Read Checkbox @Dillon
function select() {
    var ingredients = []
    var boxes = document.getElementsByName("ingredient-check");
    for (var i = 0; i<boxes.length; i++) {
        if(boxes[i].checked) {
            ingredients.push(boxes[i].value);
        }
    }
    console.log(ingredients);

    $.ajax({
       type: 'post',
       url: '/generate',
       data : {
            ingredient : ingredients
       },
       success: function(data) {
            console.log(data);
       },
       error: function(err) {
            console.log(err);
       }

   });
}

function insertImageSubmit() {
    var data = new FormData();
    jQuery.each(jQuery('#file')[0].files, function(i, file) {
        data.append('filetoupload', file);
    });

    jQuery.ajax({
        url: '/insertImage',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
            console.log(data);
        }
    });
    
}