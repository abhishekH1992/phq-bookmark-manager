# Bookmark Manager

A web application for managing bookmarks built with Angular 19.

## System Requirements

- Node.js version 18.0.0 or higher
- npm version 9.0.0 or higher
- Angular CLI version 19.2.9
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/abhishekH1992/phq-bookmark-manager.git
cd phq-bookmark-manager
```

### Install Dependencies

```bash
npm install
```

### Development Server

Run the development server:
```bash
npm start
```
Navigate to `http://localhost:4200` in your browser.

### Production Build

Build for production:
```bash
npm build
```

### Running Production Build Locally

After building, serve the production build:
```bash
npx serve -s dist/phq-bookmark-manager-test/browser
```

## Live Demo

The application is deployed at [Render](https://phq-bookmark-manager.onrender.com)

## Repository

For more information, visit the [GitHub repository](https://github.com/abhishekH1992/phq-bookmark-manager)

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Local Storage Note

This application uses browser's localStorage for data persistence. When deployed, each user's browser will maintain their own separate set of bookmarks.
