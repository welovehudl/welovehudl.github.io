const colors = ['cyan', 'magenta', '#FF6C0A', 'cyan', 'magenta', '#FF6C0A'];
const numBlobs = 6;
const blobs = [];

for (let i = 0; i < numBlobs; i++) {
  const blob = document.createElement('div');
  blob.className = 'blob';
  blob.style.backgroundColor = colors[i % colors.length];

  // Random initial position
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  blob.style.left = `${x}px`;
  blob.style.top = `${y}px`;

  document.getElementById('background').appendChild(blob);

  blobs.push({
    el: blob,
    x,
    y,
    // Randomized direction and speed
    dx: (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
    dy: (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1)
  });
}

function animate() {
  const blobSize = window.innerWidth * 0.20; // 20vw in px

  for (let blob of blobs) {
    blob.x += blob.dx;
    blob.y += blob.dy;

    // Bounce off horizontal edges
    if (blob.x <= 0) {
      blob.x = 0;
      blob.dx *= -1;
    } else if (blob.x >= window.innerWidth - blobSize) {
      blob.x = window.innerWidth - blobSize;
      blob.dx *= -1;
    }

    // Bounce off vertical edges
    if (blob.y <= 0) {
      blob.y = 0;
      blob.dy *= -1;
    } else if (blob.y >= window.innerHeight - blobSize) {
      blob.y = window.innerHeight - blobSize;
      blob.dy *= -1;
    }

    blob.el.style.left = `${blob.x}px`;
    blob.el.style.top = `${blob.y}px`;
  }

  requestAnimationFrame(animate);
}

animate();

function createTechLines() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("style", "position: absolute; top: 0; left: 0; z-index: 0; pointer-events: none;");

  const numLines = 60;
  const spacing = window.innerHeight / numLines;
  const width = window.innerWidth;
  const minX = width * 0.25; // 75% from right (25% of width)
  const maxX = width * 0.5;  // 50% from right (50% of width)

  for (let i = 0; i < numLines; i++) {
    const y = i * spacing;

    const lineEndX = Math.random() * (maxX - minX) + minX;

    // Create horizontal line from right to somewhere between 1/2 and 3/4
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", width);
    line.setAttribute("y1", y);
    line.setAttribute("x2", lineEndX);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "rgba(255, 255, 255, 0.05)");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);

    // Add small circles along the line
    const numCircles = Math.floor(Math.random() * 4) + 1;
    for (let j = 0; j < numCircles; j++) {
      const cx = lineEndX + Math.random() * (width - lineEndX);
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", Math.random() * 2 + 1); // radius between 1–3
      circle.setAttribute("fill", "rgba(255, 255, 255, 0.1)");
      svg.appendChild(circle);
    }
  }

  document.getElementById('background').appendChild(svg);
}

createTechLines();
