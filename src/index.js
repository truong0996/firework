document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    let c = canvas.getContext("2d");

    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const colorArr = [
        "#FF6633",
        "#FFB399",
        "#FF33FF",
        "#FFFF99",
        "#00B3E6",
        "#E6B333",
        "#3366E6",
        "#999966",
        "#99FF99",
        "#B34D4D",
        "#80B300",
        "#809900",
        "#E6B3B3",
        "#6680B3",
        "#66991A",
        "#FF99E6",
        "#CCFF1A",
        "#FF1A66",
        "#E6331A",
        "#33FFCC",
        "#66994D",
        "#B366CC",
        "#4D8000",
        "#B33300",
        "#CC80CC",
        "#66664D",
        "#991AFF",
        "#E666FF",
        "#4DB3FF",
        "#1AB399",
        "#E666B3",
        "#33991A",
        "#CC9999",
        "#B3B31A",
        "#00E680",
        "#4D8066",
        "#809980",
        "#E6FF80",
        "#1AFF33",
        "#999933",
        "#FF3380",
        "#CCCC00",
        "#66E64D",
        "#4D80CC",
        "#9900B3",
        "#E64D66",
        "#4DB380",
        "#FF4D4D",
        "#99E6E6",
        "#6666FF"
    ];

    // FireWork
    //---------------------------------------------------
    class FireWork {
        constructor() {
            this.radius = 3;
            this.x = canvas.width / 2;
            this.y = canvas.height + this.radius;
            this.color = "#fff";
            this.velocity = {
                x: Math.random() * 4 - 2,
                y: Math.random() * 4 + 4
            };
            this.maxY = (Math.random() * canvas.height) / 2 + canvas.height / 10;
            this.life = false;
        }

        draw(c) {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }

        dead() {
            if (this.y < this.maxY) {
                this.life = true;
                for (let i = 0; i < Math.random() * 4 + 4; i++) {
                    sparkArr.push(new Spark(this.x, this.y, this.radius, this.color));
                }
            }
        }

        update(c) {
            this.x += this.velocity.x;
            this.y -= this.velocity.y;
            this.dead();
            this.draw(c);
        }
    }
    //---------------------------------------------------
    class Spark {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius * 0.5;
            this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
            this.velocity = {
                x: Math.random() * 6 - 3,
                y: Math.random() * -4
            };
            this.friction = 0.07;
            this.life = 100;
        }
        draw(c) {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }

        update(c) {
            this.velocity.y += this.friction;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.life--;
            this.draw(c);
        }
    }

    let fireWorkArr = [];
    let sparkArr = [];

    function init() {
        if (fireWorkArr.length < 7) {
            fireWorkArr.push(new FireWork());
        }
    }

    //let img = document.getElementById("image");

    function animation() {
        window.requestAnimationFrame(animation);

        c.fillStyle = "rgba(0, 0, 0, .5)";
        c.fillRect(0, 0, canvas.width, canvas.height);
        //c.drawImage(img, 0, 0, canvas.width, canvas.height);

        fireWorkArr.forEach((fw, index) => {
            if (fw.life) {
                fireWorkArr.splice(index, 1);
            }
            fw.update(c);
        });

        sparkArr.forEach((sp, index) => {
            if (sp.life <= 0) {
                sparkArr.splice(index, 1);
            }
            sp.update(c);
        });

        init();
    }
    animation();
});
