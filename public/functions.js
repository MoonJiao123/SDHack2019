// Read Checkbox @Dillon
function readCheckbox() {
    var ingredients = []
    var boxes = document.getElementsByName("ingredienit-check");
    for (var i = 0; i<boxes.length; i++) {
        if(boxes[i].checked) {
            ingredients.push(boxes[i].value);
        }
    }
    console.log(ingredients);
    return ingredients;
}