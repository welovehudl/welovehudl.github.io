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
