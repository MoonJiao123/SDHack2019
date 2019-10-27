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
            for(recipe in data){
                var name = recipe.name;
                var url = recipe.url;
                var image = recipe.image;
                html = " <div class=\"col-lg-4 col-md-6 col-sm-12 icon-slide-container addPadding\"> <a href="
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