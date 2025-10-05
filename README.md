# Impact Visualizer 🌎☄️

**Interactive 3D & 2D Asteroid Deflection Simulator**

Live Demo: [https://www.impactvisualizer.earth/](https://www.impactvisualizer.earth/)

---

## Overview

Impact Visualizer is a web-based simulation that demonstrates asteroid deflection strategies in both 3D and 2D. Users can interact with satellites to deflect incoming asteroids using methods such as **Kinetic Impactor** and **Gravity Tractor**, and visualize the effects in real-time.

## Features

- **3D Simulation** using React Three Fiber & Rapier Physics
- **Gravity Tractor & Kinetic Impactor** mechanics
- **2D Map Visualization** using Leaflet
- Real-time satellite controls with keyboard
- Success/Failure messages based on asteroid trajectory
- Interactive and visually immersive experience

### Keyboard Controls (Live Demo)

- **W:** Move forward
- **S:** Move backward
- **A:** Move left
- **D:** Move right
- **E:** Move up
- **Q:** Move down

### Modes

- **Kinetic Impactor:** Launch a satellite to collide with the asteroid and deflect it.
- **Gravity Tractor:** Use a satellite to pull the asteroid gradually away from its path.
- **Coming Soon:** Nuclear Explosion mode

---

## Tech Stack

- **Frontend:** React, React Three Fiber (R3F), Drei
- **Physics:** @react-three/rapier
- **Mapping:** Leaflet
- **Hosting:** Vercel
- **Other Tools:** Three.js, JavaScript, HTML/CSS

---

## Installation & Usage

1. Clone the repository:
   ```
   $ git clone https://github.com/YOUR_USERNAME/impact-visualizer.git
   $ cd impact-visualizer
   ```
2. Install dependencies:
   ```
   $ npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory if needed.
   - Add any required API keys or configuration variables.
4. Run the project locally:
   ```
   npm run dev
   ```

- Open your browser at http://localhost:5173
