# Identicon.js
Small Plain Javascript Library to create Username base Identicons using HTML5 canvas &amp; toDataURL property

#Parameters
`Identicon(size, hashCode, shape, amount, bgColor, colors)`
size := Width & Height of the generated image
hashCode := The hashCode to base the generation off of
shape := `any`, `squares`, `diamonds`, `circles` - What type of shapes you want in your generated image
amount := How many shapes to generate (capped by the number of colours passed in)
bgColor:= The background colour of the generated identicon
colors:= An array of colours (rgba/rgb/#) 

Sample Usage:
`new Identicon(125, $('#username').val().hashCode(), 'circles')`
`new Identicon(100, $('#username').val().hashCode(), 'any', 1, '#555555', ['rgba(0,0,0,0.5)'])`

