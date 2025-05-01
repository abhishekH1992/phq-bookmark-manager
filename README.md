# PhqBookmarkManagerTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building for Production

To build the project for production, run:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/phq-bookmark-manager-test` directory.

## Deployment to Render.com

1. Create a new account on [Render.com](https://render.com) if you haven't already.

2. Connect your GitHub repository to Render:
   - Go to your Render dashboard
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this project

3. Configure the deployment:
   - Name: `phq-bookmark-manager` (or your preferred name)
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx serve -s dist/phq-bookmark-manager-test`
   - Node Version: `18.0.0`

4. Click "Create Web Service"

5. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build the project
   - Deploy it to their servers

6. Once deployment is complete, Render will provide you with a URL where your application is hosted.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Local Storage Note

This application uses browser's localStorage for data persistence. When deployed, each user's browser will maintain their own separate set of bookmarks.
