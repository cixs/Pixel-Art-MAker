// Select color input
// Select size input
// When size is submitted by the user, call makeGrid()

$(document).ready(function () {

    const designCanvas = $("#pixelCanvas");

    let  color, gridHeight, gridWidth;

    color = $("input[type='color']");
    gridHeight = $("#inputHeight");
    gridWidth = $("#inputWidth");

    //make grid
    function makeGrid() {

        $(".helper").css("display", "none");
        $(".canvas-title").html("Canvas design");

        designCanvas.html("");
        designCanvas.css("background-color", document.body.style.backgroundColor);

        //make markup for a row in the table
        let strRow = "<tr>";
        for (let i = 0; i < gridWidth.val(); i++) {
            strRow += "<td></td>";
        }
        strRow += "</tr>";

        //append gridHeight rows in the table
        for (let j = 0; j < gridHeight.val(); j++) {
            designCanvas.append(strRow);
        }
    }

    //handler for submit button mouseclick
    $("form").submit(function (e) {
        e.preventDefault();

        makeGrid();

        //calculate cellSize based on the grid width
        let cellSize = document.body.clientWidth / gridWidth.val();
        if (cellSize > 20)
            cellSize = 20; //prevent drawing large cells if a small sized grid was chosen

        $("tr").css("height", cellSize);
        $("td").css("width", cellSize);

        //prevent shrinking cells when window is resized
        designCanvas.css("width", cellSize*gridWidth.val());

    });

    //change cell background color when a mouse left button is clicked
    designCanvas.on("mousedown", "td", function (evt) {
        $(evt.target).css("background-color", color.val());
    });

    //continuously drawing by moving the mouse
    designCanvas.on("mouseover", "td", function (evt) {
        evt.preventDefault();
        if (evt.buttons === 1) {
            $(this).css("background-color", color.val());
        }
    });
});