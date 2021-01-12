// takes an SVG
// returns a an array of bytes
function bsqip_encode(SVG,options){
	let bsqip = [];
	let lines = SVG.split("\n");
	const width = parseInt(lines[0].match(/width="(\d+)"/)[1]) - 1;
	const height = parseInt(lines[0].match(/height="(\d+)"/)[1]) - 1;
	bsqip.push(width >> 8);
	bsqip.push(width % 256);
	bsqip.push(height >> 8);
	bsqip.push(height % 256);
	let colourModes = {
		"rgb": 3,
		"16bit": 2,
		"8bit": 1,
		"grey": 0
	}
	let shapeModes = {
		"triangles": 0,
		"rectangles": 1,
		"circles": 2
	};
	bsqip.push((shapeModes[options.shape] << 2) + colourModes[options.colour]);
	let opacity = parseFloat(lines[3].match(/fill\-opacity="([0-9.]+)"/)[1]);
	let opacityInt = Math.max(0,Math.round(opacity*256) - 1);
	bsqip.push(opacityInt);
	let hexToBytes = function(hexvalue){
		let channels = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexvalue);
		let R = parseInt(channels[1],16);
		let G = parseInt(channels[2],16);
		let B = parseInt(channels[3],16);
		if(options.colour === "rgb"){
			return [R,G,B]
		}
		else if(options.colour === "16bit"){
			let reduced_R = Math.round(R/(255/31));
			let reduced_G = Math.round(G/(255/63));
			let reduced_B = Math.round(B/(255/31));
			return [(reduced_R << 3) + (reduced_G >> 3),((reduced_G << 5) % 256) + reduced_B]
		}
		else if(options.colour === "8bit"){
			//TODO
		}
		else{
			return [Math.round((R+G+B)/3)]
		}
	}
	bsqip.push(...hexToBytes(lines[1].match("#[a-f0-9]+")[0]));
	if(options.shape === "triangles"){
		for(let i=3;i<lines.length;i++){
			let lineMatch = lines[i].match(/fill="#([a-f\d]+)".*points="(.*)"/);
			if(lineMatch){
				bsqip.push(...hexToBytes(lineMatch[1]));
				lineMatch[2].split(" ").flatMap(pair => pair.split(",")).forEach(num => {
					bsqip.push(parseInt(num) + 64)
				})
			}
			else{
				break
			}
		}
	}
	return bsqip
}
