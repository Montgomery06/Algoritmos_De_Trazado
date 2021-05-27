const p1 = {x: 0, y: 0};
const p2 = {x: 200, y: 200};

const p3 = {x: 500, y: 0};
const p4 = {x: 700, y: 200};

const p5 = {x: 1000, y: 0};
const p6 = {x: 1200, y: 200};

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

	stroke("RED");
	line(500,0,500,500);
	line(1000,0,1000,500);
	line(0,500,1400,500);
	push();
	stroke("green");
	ecuPP(p1,p2);
	DDA(p3,p4);
	bresenham(p5,p6);
	pop();
	stroke("black");
	circPM(300,600,50);
	elipsePM(600,600,50,50);
	
}

function ecuPP(p1,p2){
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;
	const m = dy / dx;
	const b = p1.y - (m + p1.x);

	let x = p1.x;
	let y = p1.y;

	while(x<=p2.x){
		point(x,y);
		x++;
		y = m * x + b; 
	}
}

function DDA(p1,p2){
	
	const x = p2.x - p1.x;
	const y = p2.y - p1.y;
	
	let m = p1.x;
	let n = p1.y;
	let pp = 0;


	if(x>y)
		pp=1/x;
	else pp=1/y;
	while(m<=p2.x && n<= p2.y){
		m=m+pp*x;
		n=n+pp*y;
		point((m+0.5),(n+0.5));
		x1=m;
		y1=n;
	}
}


function bresenham(p1,p2) {
   var dx = Math.abs(p2.x - p1.x);
   var dy = Math.abs(p2.y - p1.y);
   var sx = (p1.x < p2.x) ? 1 : -1;
   var sy = (p1.y < p2.y) ? 1 : -1;
   var err = dx - dy;

   let x = p1.x;
   let y = p1.y;

   while(true) {
      point(x, y);

      if (Math.abs(x - p2.x) < 0.0001 && Math.abs(y - p2.y) < 0.0001) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x  += sx; }
      if (e2 < dx) { err += dx; y  += sy; }
   }
}

function circPM(xc,yc,r){
let p = Math.round(5/4 -r);
let x = 0;
let y = r;
point(xc+x,yc+y);

while(x<y){
	x++;
	if(p<0){
		p = p + 2 + x + 1;
	}else{
		y--;
		p = p + 2 + (x-y) + 1;
	}
	point(xc+x,yc+y);
	point(xc-x,yc+y);
	point(xc-x,yc-y);
	point(xc+x,yc-y);
	point(xc+y,yc+x);
	point(xc+y,yc-x);
	point(xc-y,yc+x);
	point(xc-y,yc-x);
}

}

function elipsePM(xc,yc,rx,ry){
  let ry2 = ry*ry;
  let rx2 = rx*rx;
  let twory2 = 2 * ry2;
  let tworx2 = 2 * rx2;


  let x = 0;
  let y = ry;

  point(xc+x,yc+y);

  let p = ry2 - rx2*ry + 0.25*rx2;
  let px = 0;
  let py = tworx2*y;

  while (px < py) { 
    x = x + 1;
    px = px + twory2;
    if (p < 0)
      p = p + ry2 + px;
    else {
      y = y - 1;
      py = py - tworx2;
      p = p + ry2 + px - py;
    }
    point(xc+x,yc+y);
    point(xc-x,yc+y);
    point(xc+x,yc-y);
    point(xc-x,yc-y);

  }


  p = ry2*(x+0.5)*(x+0.5) + rx2*(y-1)*(y-1) - rx2*ry2;
  px = 0;
  py = tworx2*y;
  while (y > 0) { 
    y = y - 1;
    py = py - tworx2;
    if (p > 0)
      p = p + rx2 - py;
    else {
      x = x + 1;
      px = px + twory2;
      p = p + rx2 + py + px;
    }
    
    point(xc+x,yc+y);
    point(xc-x,yc+y);
    point(xc+x,yc-y);
    point(xc-x,yc-y);
  }

}