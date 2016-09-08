var $ = function(s) { return document.getElementById(s) || document.getElementsByClassName(s) }

var
  PatternSize = [40, 20],
  Colors = ["#F0F0FF", "#BBDDFF"]

var delete_color = function(color_span) {
  var
    parent = color_span.parentNode,
    index  = Array.prototype.indexOf.call(parent.children, color_span)

  Colors.splice(index, 1)
  parent.removeChild(color_span)
}

var add_color = function(){
  var
    elm   = document.createElement("span"),
    index = Colors.length

  $("colors").appendChild(elm)
  elm.outerHTML = '<span class="color"><input class="color_picker" type="color" value="#FFFFFF"><button onclick="delete_color(this.parentNode)">x</button></span>'
  Colors.push("#FFFFFF")
}
