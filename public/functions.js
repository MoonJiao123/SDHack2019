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
            $("#dymhtml").html("");
            for (var i = 0; i<data.length && i<9; i++){
                var recipe = data[i];
                console.log(recipe);
                // console.log(recipe);
                var name = recipe.name;
                var url = recipe.url;
                var image = recipe.image;
                if(image == "https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public?itok=Y6-bwmRb"){
                    image = "./images/egg.jpg";
                }
                let html = " <div class=\"col-lg-4 col-md-6 col-sm-12 icon-slide-container addPadding\"> <a href=\"";
                html += url+"\">";
                html += "<div class=\"image-container image\" style=\"background-image:url('";
                html += image;
                html += "')\"></div><h4>";
                html += name;
                html += "</h4></a></div>";
                $(html).insertAfter($("#dymhtml"));
                console.log(html);      
            }
       },
       error: function(err) {
            console.log(err);
       }

   });
}