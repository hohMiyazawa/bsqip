#include <stdio.h>
#include <string.h>

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
	
	return 0;
}
