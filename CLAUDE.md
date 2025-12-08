# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` - Run development server at localhost:3000
- `npm test` - Run tests in watch mode
- `npm run build` - Production build to `build/` folder

## Architecture

This is a personal portfolio site built with Create React App, featuring interactive 3D graphics.

**Tech Stack:**
- React 18 with react-three-fiber for 3D WebGL rendering
- Three.js with @react-three/drei for 3D components (MeshTransmissionMaterial, MeshDistortMaterial, Float, OrbitControls)
- Tailwind CSS for styling with custom font families (Inter, Unbounded, La Belle Aurore) and font sizes

**Structure:**
- `src/App.js` - Single-page application with all components inline (Block, Sphere, App)
- 3D components use react-three-fiber's `useFrame` for animations and `useMemo` for performance
- Contact form submits via axios POST with querystring encoding

**Tailwind Configuration:**
- Custom font sizes: `header` (4rem), `subheader` (2rem)
- Custom fonts: `font-inter`, `font-unbound`, `font-labelle`
