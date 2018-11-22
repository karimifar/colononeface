var fontArray = [
    "Verdana",
    "Georgia",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial",
    "Arial Black",
    "Impact",
    "Avenir",
    "Times New Roman",
    "Courier New",
    "Helvetica",
    "Palatino",
    "Garamond",
    "Calibri",
    "Lucida Sans",
    "Lucida Console",
    "Tahoma",
    "Trebuchet MS",
    "Gill",
    "Gill Sans",
    "Gill Sans MT",
    "Franklin Gothic",
    "Charter",
    "Athelas",
    "Bell MT",
    "Book Antiqua",
    "Californian FB",
    "Calisto MT",
    "Century",
    "Century Schoolbook",
    "Hoefler Text",
    "Optima",
    "Seravek",
    "Futura",
    "Geneva",
    "Agency FB",
    "Big Caslon",
    "Adobe Caslon",
    "Caslon",
    "Bodoni",
    "Candara",
    "Cantaur",
    "Constantia",
    "Corbel",
    "High Tower Text",
    "Perpetua",
    "Rockwell",
    "Segoe UI",
    "TW Cen MT",
    "Andale Mono",
    "Baskerville",
    "Berlin Sans FB",
    "Bernard MT Condensed",
    "Cambria",
    "Castellar",
    "Cochin",
    "Consolas",
    "Cooper Black",
    "Didot",
    "Elephant",
    "Engravers MT",
    "Eras ITC",
    "Felix Tilting",
    "Haettenschweiler",
    "Maiandra GD",
    "Menlo",
    "Onyx",
    "Plantagenet Cherokee",
    "Skia",
    "Algerian",
    "American Typewriter",
    "Apple Casual",
    "Apple Chancery",
    "Blackadder",
    "ITC Bradley Hand",
    "ITC Britannic Bold",
    "Broadway",
    "Brush Script MT",
    "Bookman Old Style",
    "Chalkboard",
    "Chalkduster",
    "Chiller",
    "Colonna MT",
    "Copperplate",
    "Curlz MT",
    "Edwardian Sctipt ITC",
    "Footlight MT Light",
    "Forte",
    "Freestyle Script",
    "French Script MT",
    "Gabriola",
    "Gigi",
    "Goudy Stout",
    "Harlow Solid Italic",
    "Harrington",
    "Herculanum",
    "Imprint MT Shadow",
    "Informan Roman",
    "Jokerman",
    "Juice ITC",
    "Kristen ITC",
    "Kunstler Script",
    "Luminari",
    "Magneto",
    "Marker Felt",
    "Matura MT Script Capitals",
    "Mistral",
    "Monaco",
    "Monotype Corsiva",
    "Noteworthy",
    "OCR A Extended",
    "Old English Text MT",
    "Palace Script MT",
    "Papyrus",
    "Parchment",
    "Paybill",
    "Phosphate",
    "Poor Richard",
    "Pristina",
    "Rage Italic",
    "Ravie",
    "Savoye",
    "Script MT Bold",
    "Segoe Print",
    "Segoe Script",
    "SignPainter",
    "Snap ITC",
    "Snell Round",
    "Stencil",
    "Showcard Gothic",
    "Tempus Sans ITC",
    "Trattatello",
    "Viner Hand ITC",
    "Vivaldi",
    "Vladimir Script",
    "Wide Latin",
    "Zapfino",
    "Merriweather"
]

var availableFonts= []
var Detector = function() {
// a font will be compared against all the three default fonts.
// and if it doesn't match all 3 then that font is not available.
var baseFonts = ['monospace', 'sans-serif', 'serif'];

//we use m or w because these two characters take up the maximum width.
// And we use a LLi so that the same matching fonts can get separated
var testString = "mmmmmmmmmmlli";

//we test using 72px font size, we may use any size. I guess larger the better.
var testSize = '72px';

var h = document.getElementsByTagName("body")[0];

// create a SPAN in the document to get the width of the text we use to test
var s = document.createElement("span");
s.style.fontSize = testSize;
s.innerHTML = testString;
var defaultWidth = {};
var defaultHeight = {};
for (var index in baseFonts) {
    //get the default width for the three base fonts
    s.style.fontFamily = baseFonts[index];
    h.appendChild(s);
    defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
    defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
    h.removeChild(s);
}

function detect(font) {
    var detected = false;
    for (var index in baseFonts) {
        s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
        h.appendChild(s);
        var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
        h.removeChild(s);
        detected = detected || matched;
    }
    console.log(font,detected, fontCount)
    return detected;
}

this.detect = detect;
};

Detector();

var fontCount = 0;
function detectAppendListen(){
    for(var i = 0; i<fontArray.length; i++){
        if (detect(fontArray[i])){
                fontCount++;
                availableFonts.push(fontArray[i])
                createOption(fontArray[i], i+3)
        }
    }
}
detectAppendListen();

// $(document).on("click" , ".font-option" ,function(){
//     alert("hi")
//     var selectedFont = $(this).val();
//     console.log(selectedFont);
//     console.log("hover")

// });



function createOption(font, i){
    var option = $("<li tabindex=" + i +" class='font-option' data-value='"+font+"'>"+font +"</li>");
    $("#selectFont").append(option)
}



// $(".font-option").on("mouseover" ,function(){
//     var selectedFont = $(this).val();
//     console.log(selectedFont);
//     console.log("hover")
// });


$("ul").on("click", ".init", function() {
    $(this).closest("ul").children('li:not(.init)').toggle();
    $("#selectFont").addClass("openlist")

});

var allOptions = $("ul").children('li:not(.init)');
$("ul").on("click", "li:not(.init)", function() {
    allOptions.removeClass('selected');
    $(this).addClass('selected');
    $("ul").children('.init').html($(this).html());
    allOptions.toggle();
    $("#selectFont").removeClass("openlist")
});
// Check this click evnet - 
$("body").on("mouseover", "#selectFont li", function() {
    var selectedFont = $(this).attr('data-value')
    $(".type").css("font-family", selectedFont)
});


$(document).mouseup(function(e) 
{
    var container = $("#selectFont").children('li:not(.init)');

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
        $("#selectFont").removeClass("openlist")
    }
});
var colon = document.querySelector("#colon");
var one = document.querySelector("#one");
var face = document.querySelector("#face");

var maxX = window.innerWidth;
var maxY = window.innerHeight;

var startX= 130;
var startY= 195;

var oneX= 125;
var oneY= 240;

TweenLite.set(colon, {
  transformOrigin: "center",
  rotation: 90,
  x: startX,
  y:startY
});
TweenLite.set(one, {
  transformOrigin: "center",
  rotation: 90,
  x: oneX,
  y: oneY
});
$(document).mousemove(function(event){
    var svgW = document.getElementById("svgDiv").offsetWidth;
    var svgH = document.getElementById("svgDiv").offsetHeight;
    maxX = window.innerWidth;
    maxY = window.innerHeight;
    var colonX = 0.15*maxX + 0.1*svgW + 0.59*0.8*svgW
    var colonY = 0.15*maxX + 0.57*svgH 

    console.log(colonX,colonY)
    var x = event.clientX;
    var y = event.clientY;
    console.log(x,y)

    var moveX = (x-colonX)/15
    var moveY = (y-colonY)/10
    if(moveY<= -18){
        moveY= -18
    }
    if(moveY >= 30){
        moveY=30
    }
    if(moveX<= -30){
        moveX= -30
    }
    if(moveX >= 45){
        moveX=45
    }
    console.log("YOOO",moveX, moveY)
    // $("#colon").css({
    //     transform:" matrix(0, 1, -1, 0,"+ 112.8842+moveX +","+ 134.6087+moveY+")"
    // });
    // var offset = translate($("#colon"), {top:moveX, y:moveY})
    // TweenMax.set("#colon", {attr:{x:0, y:0}})
    TweenLite.to(colon, 0.1, {
        x: startX+moveX,
        y: startY+moveY
    });
    TweenLite.to(one, 0.1,{
        x: oneX+moveX/1.5,
        y: oneY+moveY/1.5
     })
    TweenLite.to(face, 0.1, {x:moveX/4, y:moveY/4})

})


var tl = new TimelineMax({repeat: -1});
tl.to(colon, 0.1, {scaleX:0, transformOrigin: "50% 50%"}, "+=3.5")
.to(colon, 0.1, {scaleX:1, transformOrigin: "50% 50%"})
.to(colon, 0.1, {scaleX:0, transformOrigin: "50% 50%"}, "+=6")
.to(colon, 0.1, {scaleX:1, transformOrigin: "50% 50%"})