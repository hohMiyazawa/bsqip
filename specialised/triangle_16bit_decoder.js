//only supports truecolour triangles
function bsqip_decode(byteArray){
	let width  = (byteArray[0] << 8) + byteArray[1] + 1;
	let height = (byteArray[2] << 8) + byteArray[3] + 1;
	function bytesToRGB(bytes){
		return "rgb("
			+ ((bytes[0] >> 3) * 255/31) + ","
			+ ((((bytes[0] % 8) << 3) + (bytes[1] >> 5)) * 255/63) + ","
			+ ((bytes[1] % 32) * 255/31) + ")"
	}
	let lines = [];
	for(let i = 8;i + 8 < byteArray.length;i += 8){
		lines.push(`<polygon fill="${bytesToRGB(byteArray.slice(i,i + 2))}" fill-opacity="${(byteArray[5] + 1) / 256}" points="${byteArray[i + 2] - 63},${byteArray[i + 3] - 63} ${byteArray[i + 4] - 63},${byteArray[i + 5] - 63} ${byteArray[i + 6] - 63},${byteArray[i + 7] - 63}" />`)
	}
	return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}"><rect x="0" y="0" width="${width}" height="${height}" fill="${bytesToRGB(byteArray.slice(6,8))}"/><g transform="scale(${width/128}) translate(0.5 0.5)">${lines.join()}</g></svg>`
}
