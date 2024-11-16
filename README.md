# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Structure

The project directory structure is as follows:

```
/frontend
    ├── public
    ├── src
    │   ├── components
    │   ├── pages
    │   │   ├── Admin_Login.jsx
    │   │   ├── Admin_Page.jsx
    │   │   ├── Management.jsx
    │   │   └── Package.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    ├── index.html
    ├── package.json
    └── README.md
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the necessary dependencies.

### `npm run dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run serve`

Serves the production build from the `dist` folder.

## Routes

The following routes are available in the application:

- `/admin-login` - Renders the `AdminLogin` component.
- `/admin-page` - Renders the `AdminPage` component.
  - `/admin-page/management` - Renders the `Management` component.
  - `/admin-page/package` - Renders the `Package` component.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
