#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

void printUsage(){
	printf("bsqip [options] -e -i infile.svg -o outfile.bsqip\n");
	printf("bsqip -d -i infile.bsqip -o outfile.svg\n");
	printf("\n");
	printf("-c int  Colour type. 0=8bit greyscale, 1=8bit colour, 2=16bit truecolour (default), 3=24bit rgb\n");
	printf("-m int  Shape primitive. 0=triangles (default), 1=rectangles, 2=circles\n");
}

int main(int argc,char *argv[]){
	for(int i=0;i<argc;i++){
		printf("argv[%2d]: %s\n",i,argv[i]);
	}
	if(
		argc == 1
		|| (
			argc == 2 && (
				strcmp("-h",argv[1]) == 0
				|| strcmp("-help",argv[1]) == 0
				|| strcmp("--help",argv[1]) == 0
			)
		)
	){
		printUsage();
		return 1;
	}
	bool hasD = false;
	bool hasE = false;
	bool hasI = false;
	bool hasO = false;
	bool hasC = false;
	bool hasM = false;
	char *infile;
	char *outfile;
	int colourType = 2;//default truecolour
	int shapeType  = 0;//default triangles
	for(int i=1;i<argc;i++){
		if(strcmp("-e",argv[i]) == 0){
			if(hasD || hasE){
				printUsage();
				return 2;
			}
			hasE = true;
		}
		else if(strcmp("-d",argv[i]) == 0){
			if(hasD || hasE){
				printUsage();
				return 2;
			}
			hasD = true;
		}
		else if(strcmp("-c",argv[i]) == 0){
			i++;
			if(hasD || hasC || i == argc){
				printUsage();
				return 2;
			}
			hasC = true;
			colourType = atoi(argv[i]);
		}
		else if(strcmp("-m",argv[i]) == 0){
			i++;
			if(hasD || hasM || i == argc){
				printUsage();
				return 2;
			}
			hasM = true;
			shapeType = atoi(argv[i]);
		}
		else if(strcmp("-i",argv[i]) == 0){
			i++;
			if(hasI || i == argc){
				printUsage();
				return 2;
			}
			hasI = true;
			infile = argv[i];
		}
		else if(strcmp("-o",argv[i]) == 0){
			i++;
			if(hasO || i == argc){
				printUsage();
				return 2;
			}
			hasO = true;
			outfile = argv[i];
		}
		else{
			printUsage();
			return 2;
		}
	}
	
	return 0;
}
