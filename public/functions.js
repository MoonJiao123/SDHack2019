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
            //for each loop
            // console.log(data[0].name);
            for (var i = 0; i<data.length; i++){
                var recipe = data[i];
                // console.log(recipe.name);
                $(".dymhtml").empty();
                // console.log(recipe);
                var name = recipe.name;
                var url = recipe.url;
                var image = recipe.image;
                html = " <div class=\"col-lg-4 col-md-6 col-sm-12 icon-slide-container addPadding\"> <a href=\""
                html += url+"\">";
                html +=  " <div class=";
                html += "<div class=\"image-container image\" style=\"background-image:url(";
                html += image;
                html += ")></div><h4>";
                html += name;
                html += "</h4></a></div>";
                $(html).insertAfter(".dymhtml");
                console.log(html);      
            }
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