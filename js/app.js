$(document).ready(function () {

  const designCanvas = $("#pixel-canvas");
  let  color, gridHeight, gridWidth;

  color = $(".color-box");
  gridHeight = $("#input-height");
  gridWidth = $("#input-width");

  //make grid
  function makeGrid() {

      designCanvas.html("");
      designCanvas.css("background-color", document.body.style.backgroundColor);

      //make markup for a row in the table
      let strRow = "<tr>";
      for (let i = 0; i < gridWidth.val(); i++) {
          strRow += "<td></td>";
      }
      strRow += "</tr>";

      //append #gridHeight rows in the table
      for (let j = 0; j < gridHeight.val(); j++) {
          designCanvas.append(strRow);
      }
  }

  //handler for submit button mouseclick
  $("form").submit(function (e) {
      e.preventDefault();
      $(".helper").css("display", "none");
      $(".canvas-title").css("display", "block");

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
      $(evt.target).css("background-color", color.css("backgroundColor"));
      console.log(color, color.css("backgroundColor"));
  });

  //continuously drawing by moving the mouse
  designCanvas.on("mouseover", "td", function (evt) {
      evt.preventDefault();
      if (evt.buttons === 1) {
          $(this).css("background-color", color.css("backgroundColor"));
      }
  });

  var picker = $.farbtastic("#colorpicker");
  picker.setColor("#fff");
  picker.linkTo(function onColorChange(colorValue) {
    color.css("background-color", colorValue);
  });
});