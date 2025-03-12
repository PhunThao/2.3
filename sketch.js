//Defining variables
let balloons = []; // Create balloons
let distractionChance = 0.4; // %change distract- pop up links will appear 
let distractionLinks = [
  "https://archive.org/details/the-pillow-book/page/n4/mode/1up",
  "https://www.crescentmall.com.vn/tenants/ovs",
  "https://s3.amazonaws.com/giin-web-assets/iris/assets/files/guidance/2019-12-12_IRIS-HT-Data%20Collection_R5.pdf",
  "https://genius.com/Lola-young-messy-lyrics",
  "https://nhipcaudautu.vn/phong-cach-song/di-tim-gia-tri-cho-cong-dong-lgbt-3357185/",
  "https://matca.vn/khoa-hoc-nhiep-anh-nang-cao-cung-jamie-maxtone-graham/",
  "https://tuoitre.vn/co-gi-o-mang-den-thien-duong-hong-ma-ca-ngan-du-khach-ve-tham-20231231183607197.htm" ,
  "https://thienvu.com.vn/tuyen-tap-100-bai-hat-karaoke-nhac-tre-hay-thinh-hanh-nhat", 
  "https://www.vinmec.com/vie/bai-viet/dau-day-kinh-chan-phai-dieu-tri-nao-vi", 
  "https://www.vinmec.com/vie/bai-viet/dau-day-kinh-chan-phai-dieu-tri-nao-vi", 
  "https://www.google.com/search?kgmid=/m/07ydljn&hl=vi-VN&q=L%C6%B0+M%E1%BA%ABn+San&shndl=17&source=sh/x/kp/osrp/m5/4&kgs=a6e07bbf100b0670",
  "https://saveourseas.com/worldofsharks", "http://www.designishistory.com", 
  "https://wnfdiary.com/black-and-white-photography-vol-1/", 
  "https://afends.com/collections/fyb25-womens-jeans-pants/products/afends-womens-moss-hemp-denim-workwear-jean-authentic-blue-1", 
  "https://matca.vn/khoa-hoc-nhiep-anh-nang-cao-cung-jamie-maxtone-graham/", 
  "https://nhipcaudautu.vn/phong-cach-song/di-tim-gia-tri-cho-cong-dong-lgbt-3357185/", "https://tuoitre.vn/nha-trang-ong-trump-da-dat-ong-zelensky-vao-dung-vi-tri-20250312150728003.htm", 
  "https://vinwonders.com/vi/wonderpedia/news/mi-quang-ngon-o-sai-gon/", 
  "https://g.co/kgs/56W8u5M", 
  "https://vnexpress.net/dau-dau-mung-cuoi-500-000-dong-thi-it-mot-trieu-lai-nhieu-4812764.html", 
  //input the distract link that we want it to appear, to simulate how distractions work on certain websites.
];

function setup() { //runs once at the beginning of the program
    createCanvas(windowWidth, windowHeight); // Fullscreen canvas, fills the entire screen include browser window,...
    background(0); // Set background to black

    for (let i = 0; i < 10; i++) {   //A loop that runs 10 times, finish set up, will start with 10 balloons 
        balloons.push(new Balloon(random(width), random(height), random(-2, 2), random(-2, 2))); //Random initial positions, Random movement speeds
    }

    setInterval(addBalloon, 2000); // Add a new balloon every 2 seconds
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Adjust canvas when window resizes
    background(0); // Redraw background to avoid graphical glitches
}

function draw() {  //keeps running over and over,  runs at 60 FPS, it allows smooth movement
  background(0); // Keep the background black
  for (let balloon of balloons) { //loop processes each balloon, move and draw
    balloon.move(); // makes the balloon change position
    balloon.display(); // draw the balloon on the screen.
  }
}

function mousePressed() { //automatically called when the user clicks the mouse 
  for (let i = balloons.length - 1; i >= 0; i--) { // Check balloons from Last to First. Ensuring All Balloons Are Checked Properly, make sure no balloon skipped) 
    if (balloons[i].isClicked(mouseX, mouseY)) { //Checking if a balloon was clicked
      if (random() < distractionChance) {
        let selectedLinks = [];
        for (let j = 0; j < 3; j++) {  // picks 3 random link
          selectedLinks.push(random(distractionLinks));
        }
        
        // Open links in a new tab if pop-ups are allowed
        selectedLinks.forEach(link => {
          let newTab = window.open(link, "_blank");
          if (!newTab) {
            window.open(link, "_blank");
          }
        });
      }
      balloons.splice(i, 1); // Remove balloon when clicked
      break; //ensures only one balloon is removed per click
    }
  }
}

function addBalloon() {
  balloons.push(new Balloon(random(width), random(height), random(-2, 2), random(-2, 2))); // Continuously add balloons
}

class Balloon { // defines the properties of each balloon.
  constructor(x, y, speedX, speedY) {
    this.x = x; // X position
    this.y = y; // Y position
    this.speedX = speedX; // Horizontal speed
    this.speedY = speedY; // Vertical speed
    this.size = 50; // Balloon size
    this.color = color(255, 255, 255, 200); // White balloon, 200 at the end makes the balloon partially transparent.
  }

  move() { //Defines how it moves
    this.x += this.speedX; // Move horizontally
    this.y += this.speedY; // Move vertically
    if (this.x > width || this.x < 0) { // checks if the balloon reaches the right edge or the left edge.
      this.speedX *= -1; // if bounce off horizontal edges, making the balloon move in the opposite direction.
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1; // Bounce off vertical edges
    }
  }

  display() {  // How the balloon look like 
    fill(this.color); // Set fill color
    stroke(255); // White stroke to enhance visibility
    strokeWeight(2); 
    ellipse(this.x, this.y, this.size, this.size); // Draw the balloon
    
    // Add a subtle highlight effect for a realistic look
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(this.x - this.size / 4, this.y - this.size / 4, this.size / 4, this.size / 4); //smaller ellipse offset slightly from the center,creates the effect of light reflecting on the balloon.
  }

  isClicked(px, py) { //Calculating Distance from Click to Balloon Center
    let d = dist(px, py, this.x, this.y); // Calculate distance from click to balloon
    return d < this.size / 2; // Check if inside balloon, balloon’s radius is this.size / 2.
  }
}