// Select the box element
const box = document.querySelector('.box');
const container = document.querySelector('.container');

// Rotation variables
let currentXRotation = 0;
let currentYRotation = 0;
let targetXRotation = 0;
let targetYRotation = 0;
let mouseX = 0;
let mouseY = 0;

// Particle container
const particleContainer = document.createElement('div');
particleContainer.classList.add('particles');
document.body.appendChild(particleContainer);

// Sound effects with updated reliable WAV URLs
const beepAudio = new Audio('/'); // Beep sound for hover
beepAudio.volume = 0.1; // Adjust volume

const yayAudio = new Audio('/Voicy_Woo-hoo.mp3'); // "Yay!" sound for hover
yayAudio.volume = 0.2; // Adjust volume

const popAudio = new Audio('/Voicy_Oof! - Roblox Death Sound .mp3'); // "Pop!" sound for click
popAudio.volume = 0.2; // Adjust volume

// Mouse movement event
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  // Calculate target rotation based on mouse position
  targetXRotation = (mouseY / window.innerHeight) * 180 - 90; // X-axis (up-down)
  targetYRotation = (mouseX / window.innerWidth) * 360 - 180; // Y-axis (left-right)

  // Add particles on mouse move
  createParticles(mouseX, mouseY);
});

// Create particles at mouse position
function createParticles(x, y) {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x + (Math.random() - 0.5) * 30}px`;
    particle.style.top = `${y + (Math.random() - 0.5) * 30}px`;
    particleContainer.appendChild(particle);

    // Remove particles after animation completes
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// Play sound effects when interacting with the box
box.addEventListener('mouseenter', () => {
  yayAudio.play(); // Play the "Yay!" sound on hover (alternative to beep)
});

// Play the "Pop!" sound when the box is clicked
box.addEventListener('click', () => {
  console.log('Box clicked'); // Check if the click event is firing
  popAudio.play(); // Play the "Pop!" sound when clicked
});

// Smoothly update rotation using requestAnimationFrame
function animate() {
  // Smoothly interpolate rotation towards target rotation
  currentXRotation += (targetXRotation - currentXRotation) * 0.1;
  currentYRotation += (targetYRotation - currentYRotation) * 0.1;

  // Apply rotation to the box
  box.style.transform = `rotateX(${currentXRotation}deg) rotateY(${currentYRotation}deg)`;

  // Continue animation loop for continuous rotation update
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();
