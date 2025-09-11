# Tea Garden Explorer

## Overview
Tea Garden Explorer is a 3D exploration application built using Three.js and Next.js. Users can navigate through a beautifully rendered tea garden, interact with the environment, and experience a unique virtual space.

## Features
- 3D rendering of a tea garden environment.
- User controls for movement and interaction.
- Pointer lock functionality for immersive navigation.
- Customizable settings for user preferences.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd tea-garden-explorer
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
npm run dev
```
Open your browser and go to `http://localhost:3000` to view the application.

## Components
- **app/layout.tsx**: Defines the layout structure for the application.
- **app/page.tsx**: Main entry point rendering the primary content.
- **src/components/TeaGardenExplorer.tsx**: Implements the 3D tea garden exploration experience.
- **src/hooks/usePointerLock.ts**: Custom hook for managing pointer lock state.
- **src/utils/threeHelpers.ts**: Utility functions for Three.js operations.
- **src/styles/globals.css**: Global CSS styles for the application.

## Models
- **public/models/character.glb**: 3D character model used in the exploration.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.