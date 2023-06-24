let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 400000; i+=500+getRandomBetweenNegativeOneAndOne()) {
    let angle = i * 137.5;
    let r = sqrt(i) * 2;
    let x = r * cos(angle) + width / 2;
    let y = r * sin(angle) + height / 2;
    if (x > windowWidth || y > windowHeight) {
      continue;
    }
    particles.push(new Particle(x, y));
  }
}


function draw() {
  background(10, 10, 10);
  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function getRandomBetweenNegativeOneAndOne() {
  return Math.random() * 2 - 1;
}


class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = p5.Vector.mult(
        p5.Vector.sub(this.pos,
            createVector(
              (windowWidth/2)+getRandomBetweenNegativeOneAndOne()*windowWidth/2,
              (windowHeight/2)+getRandomBetweenNegativeOneAndOne()*windowHeight/2
            )
        ), 0.001);
    this.r = 2;
    this.color_r = 140+getRandomBetweenNegativeOneAndOne()*110
    this.color_g = 90+getRandomBetweenNegativeOneAndOne()*40
    this.color_b = 160+getRandomBetweenNegativeOneAndOne()*80
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let d = dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
    if (d < 450) {
      let force = p5.Vector.sub(mouse, this.pos);
      force.setMag(0.00002*d);
      this.applyForce(force);
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(this.acc*0.92);
    this.edges();
  }

  show() {
    noStroke();

    fill(this.color_r*0.3, 0, this.color_b*0.3, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 8);
    fill(this.color_r*0.5, 0, this.color_b*0.5, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 4);
    fill(this.color_r*0.75, this.color_g*0.75, this.color_b*0.75, 100)
    ellipse(this.pos.x, this.pos.y, this.r * 2);

    for (let other of particles) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

      if (d < 70) {
        stroke(this.color_r, this.color_g, this.color_b, 100);
        line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      }
    }
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }
}