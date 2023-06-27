import React, { useEffect } from 'react';
import p5 from 'p5';

const ParticleBackground = () => {
  useEffect(() => {
    let particles = [];

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (let i = 0; i < 400000; i += 500 + getRandomBetweenNegativeOneAndOne()) {
          let angle = i * 137.5;
          let r = Math.sqrt(i) * 2;
          let x = r * Math.cos(angle) + p.width / 2;
          let y = r * Math.sin(angle) + p.height / 2;
          if (x > p.windowWidth || y > p.windowHeight) {
            continue;
          }
          particles.push(new Particle(p, x, y));
        }
      };

      p.draw = () => {
        p.background(10, 10, 10);
        for (let particle of particles) {
          particle.update();
          particle.show();
        }
      };

      function getRandomBetweenNegativeOneAndOne() {
        return Math.random() * 2 - 1;
      }
    };

    class Particle {
      constructor(p, x, y) {
        this.p = p;
        this.pos = this.p.createVector(x, y);
        this.vel = this.p.createVector(0, 0);
        this.acc = this.p.createVector(0, 0).mult(
          this.p.createVector(
            this.pos.x - ((this.p.windowWidth / 2) + getRandomBetweenNegativeOneAndOne() * this.p.windowWidth / 2),
            this.pos.y - ((this.p.windowHeight / 2) + getRandomBetweenNegativeOneAndOne() * this.p.windowHeight / 2)
          ),
          0.001
        );
        this.r = 2;
        this.color_r = 140 + getRandomBetweenNegativeOneAndOne() * 110;
        this.color_g = 90 + getRandomBetweenNegativeOneAndOne() * 40;
        this.color_b = 160 + getRandomBetweenNegativeOneAndOne() * 80;
      }

      applyForce(force) {
        this.acc.add(force);
      }

      update() {
        let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
        let d = this.p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
        if (d < 450) {
          let force = p5.Vector.sub(mouse, this.pos);
          force.setMag(0.00002 * d);
          this.applyForce(force);
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(this.acc * 0.92);
        this.edges();
      }

      show() {
        this.p.noStroke();

        this.p.fill(this.color_r * 0.3, 0, this.color_b * 0.3, 100);
        this.p.ellipse(this.pos.x, this.pos.y, this.r * 8);
        this.p.fill(this.color_r * 0.5, 0, this.color_b * 0.5, 100);
        this.p.ellipse(this.pos.x, this.pos.y, this.r * 4);
        this.p.fill(this.color_r * 0.75, this.color_g * 0.75, this.color_b * 0.75, 100);
        this.p.ellipse(this.pos.x, this.pos.y, this.r * 2);

        for (let other of particles) {
          let d = this.p.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
          if (d < 70) {
            this.p.stroke(this.color_r, this.color_g, this.color_b, 100);
            this.p.line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
          }
        }
      }

      edges() {
        if (this.pos.x < 0 || this.pos.x > this.p.width) {
          this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > this.p.height) {
          this.vel.y *= -1;
        }
      }
    }

    function getRandomBetweenNegativeOneAndOne() {
      return Math.random() * 2 - 1;
    }

    const particleSketch = new p5(sketch);

    return () => {
      // Cleanup when the component unmounts
      particleSketch.remove();
    };
  }, []);

  return null;
};

export default ParticleBackground;
