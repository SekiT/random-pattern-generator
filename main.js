var $ = function(s) { return document.getElementById(s) || document.getElementsByClassName(s) }

var PatternSize = [100, 100],
    Colors = [[240, 240, 255], [187, 221, 255]]

var delete_color = function(color_span) {
  var parent = color_span.parentNode,
      index  = Array.prototype.indexOf.call(parent.children, color_span)

  Colors.splice(index, 1)
  parent.removeChild(color_span)
}

var add_color = function(){
  var elm   = document.createElement("span"),
      index = Colors.length

  $("colors").appendChild(elm)
  elm.outerHTML = '<span class="color"><input class="color_picker" type="color" value="#ffffff"><button onclick="delete_color(this.parentNode)">x</button></span>'
  Colors.push([255, 255, 255])
}

var generate_pattern = function() {
  var w = PatternSize[0],
      h = PatternSize[1],
      Cells  = [],
      hashes = {},
      hash   = ""

  setColors()
  seed(Cells, w, h)
  while(!hashes[hash]) {
    hashes[hash] = true
    hash = calc_hash(Cells, w, h)
    Cells = alternate_generation(Cells, w, h)
  }
  fill_canvas(Cells, w, h)
}

var setColors = function() {
  color_pickers = $("color_picker")
  for(var l = color_pickers.length, i = 0; i < l; i++) {
    var color_string = color_pickers[i].value
    Colors[i] = [
      parseInt(color_string.substring(1, 3), 16),
      parseInt(color_string.substring(3, 5), 16),
      parseInt(color_string.substring(5, 7), 16)
    ]
  }
  return Colors
}

var seed = function(Cells, w, h) {
  var len = Colors.length

  for(var i = 0, j; i < h; i++) {
    Cells[i] = []
    for(j = 0; j < w; j++) {
      Cells[i][j] = Math.floor(Math.random()*len)
    }
  }
  return Cells
}

var calc_hash = function(Cells, w, h) {
  var hash = ""

  for(var i = 0, j; i < h; i++) {
    for(j = 0; j < w; j++) {
      hash += Cells[i][j]
    }
  }
  return hash
}

var alternate_generation = function(Cells, w, h) {
  var len = Colors.length
  var NextCells = []

  for(var i = 0,j; i < h; i++) {
    NextCells[i] = []
    for(j = 0; j < w; j++) {
      var votes = new Array(len).fill(0)
      for(var k = -1, l; k <= 1; k++) {
        for(l = -1; l <= 1; l++) {
          votes[Cells[(k + i + h) % h][(l + j + w) % w]]++
        }
      }

      var len = votes.length,
          cand = [],
          max = 0
      for(var k = 0; k < len; k++) {
        if(votes[k] == max) {
          cand.push[k]
        }
        else if(votes[k] > max) {
          cand = [k]
          max = votes[k]
        }
      }
      NextCells[i][j] = cand[Math.floor(Math.random() * cand.length)]
    }
  }
  return NextCells
}

var fill_canvas = function(Cells, w, h) {
  var canvas  = $("canvas"),
      context = canvas.getContext("2d"),
      image   = context.createImageData(w, h)
      data    = image.data

  for(var i = 0, j; i < h; i++) {
    for(j = 0; j < w; j++) {
      var p = (i * w + j) * 4,
          color_index = Cells[i][j]
      data[p    ] = Colors[color_index][0]
      data[p + 1] = Colors[color_index][1]
      data[p + 2] = Colors[color_index][2]
      data[p + 3] = 255
    }
  }

  var image_canvas = $("image_canvas"),
      image_context = image_canvas.getContext("2d")
  image_canvas.width = w
  image_canvas.height = h
  image_context.putImageData(image, 0, 0);

  var pattern = context.createPattern(image_canvas, "")
  context.fillStyle = pattern
  context.fillRect(0, 0, canvas.width, canvas.height)
}
