# Verticurl Frontend Test

## Overview

This project is a frontend test for a role at Verticurl. The objective is to replicate a provided design using **HTML**, **SASS**, and **VanillaJS**, while ensuring the page is responsive, interactive, and optimized for different screen sizes.

### Technologies:
- **Markup**: Pug
- **Styles**: SASS (CSS preprocessor)
- **JavaScript**: Vanilla JavaScript
- **CSS Methodology**: BEM (Block-Element-Modifier)
- **Tools**: Webpack, webpack-dev-server

## Features

- Responsive design, adaptable to desktop, tablet, and mobile screens
- Interactive animations for decorative elements
- Modal popup for speaker descriptions with dynamic content
- BEM methodology for consistent and maintainable CSS

## Requirements

- **Browsers**: The project must work on the latest versions of **Google Chrome**, **Firefox**, **Safari**, **Edge**, and **Opera**.
- **Devices**: Ensure the page is responsive and looks great on any device with a screen width greater than or equal to 320px.

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

If you're working with a GitHub repository, first clone it:

```
git clone https://github.com/thiagohiguchi/verticurl-frontend-test.git
cd verticurl-frontend-test
```

### 2. Install dependencies

Install the required npm dependencies:

```
npm install
```

### 3. Run the Development Server

To start the development server and preview the site locally, run:

```
npm start
```

This command will:
- Start the webpack-dev-server in **development mode**
- Open the site in your default web browser

### 4. Build the Project

To generate production-ready static files (minified and optimized), run:

```
npm run build
```

This will create the bundled files in the `dist/` directory.

### 5. Deploy to GitHub Pages

To deploy the project to GitHub Pages, run:

```
npm run deploy
```

This will:
- Build the project
- Deploy the contents of the `dist/` folder to the `gh-test` branch of your GitHub repository

## Project Structure

The project is organized as follows:

```
.
├── README.md                # Project overview and setup guide
├── package-lock.json        # Auto-generated lock file for npm
├── package.json             # Project dependencies and scripts
├── src/
│   ├── assets/              # Static files (e.g., fonts, SVGs)
│   ├── css/                 # Global or third-party CSS files
│   ├── images/              # Image files (JPG, PNG, GIF, etc.)
│   ├── js/                  # JavaScript entry point and other custom scripts
│   ├── pug/                 # Pug templates and layouts
│   └── sass/                # Sass files (includes styles for layout, components)
└── webpack.config.js        # Webpack configuration for bundling assets
```

### Folder Breakdown

- **`assets/`**: Contains static files like fonts, SVGs, etc.
- **`images/`**: Stores image files (JPG, PNG, GIF, etc.).
- **`css/`**: Global styles or third-party CSS files.
- **`js/`**: Custom JavaScript files, including the main entry point (`index.js`).
- **`sass/`**: Styles using the **SASS** preprocessor, following the **BEM** (Block-Element-Modifier) methodology for CSS organization.
- **`pug/`**: Pug templates and layout files.

### Webpack Configuration

The project uses **Webpack 5.x** for compiling **SASS** and **Pug** into production-ready files. The configuration is located in `webpack.config.js`. Webpack is set up to use:

- **`sass-loader`** to process SASS into CSS
- **`pug-html-loader`** to compile Pug templates into HTML
- **`webpack-dev-server`** for live reloading during development
