// takes an array of numbers 0-255, representing bsqip bytes
// returns an SVG
function bsqip_decode(byteArray){
	const width  = (byteArray[0] << 8) + byteArray[1] + 1;
	const height = (byteArray[2] << 8) + byteArray[3] + 1;
	const shapeFormat = (byteArray[4] >> 2) % 4;
	const colourFormat = byteArray[4] % 4;
	const opacity = (byteArray[5] + 1) / 256;
	if(shapeFormat === 3){
		throw "invalid SVG shape"
	};
	const colourLength = colourFormat || 1;
	const bytesToRGB = function(bytes){
		if(colourFormat === 0){
			return "rgb(" + bytes[0] + "," + bytes[0] + "," + bytes[0] + ")"
		}
		else if(colourFormat === 1){
			return "rgb("
				+ ((bytes[0] >> 5) * 255/7) + ","
				+ (((bytes[0] >> 2) % 8) * 255/7) + ","
				+ ((bytes[0] % 4) * 255/3) + ")"
		}
		else if(colourFormat === 2){
			return "rgb("
				+ ((bytes[0] >> 3) * 255/31) + ","
				+ ((((bytes[0] % 8) << 3) + (bytes[1] >> 5)) * 255/63) + ","
				+ ((bytes[1] % 32) * 255/31) + ")"
		}
		else{
			return "rgb(" + bytes[0] + "," + bytes[1] + "," + bytes[2] + ")"
		}
	}
	let lines = [];
	let background = bytesToRGB(byteArray.slice(6,6 + colourLength));
	if(shapeFormat === 0){
		let lineLength = 6 + colourLength;
		for(let i = 6 + colourLength;i + lineLength <= byteArray.length;i += lineLength){
			let colour = bytesToRGB(byteArray.slice(i,i + colourLength));
			lines.push(`<polygon fill="${colour}" fill-opacity="${opacity}" points="${byteArray[i + colourLength] - 64},${byteArray[i + colourLength + 1] - 64} ${byteArray[i + colourLength + 2] - 64},${byteArray[i + colourLength + 3] - 64} ${byteArray[i + colourLength + 4] - 64},${byteArray[i + colourLength + 5] - 64}" />`)
		}
	}
	else if(shapeFormat === 1){
	}
	else if(shapeFormat === 2){
	}
	return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}">
<rect x="0" y="0" width="${width}" height="${height}" fill="${background}" />
<g transform="scale(${shapeFormat ? width/256 : width/128}) translate(0.5 0.5)">
${lines.join("\n")}
</g>
</svg>
`
}
