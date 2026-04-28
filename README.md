
<div align="center">

  <!-- You can create a simple logo like this to make your project stand out -->
  <!-- <br/>
  <img src="https://raw.githubusercontent.com/sh1v-max/BiteSwift/main/public/biteswift-logo.png" alt="BiteSwift Logo" width="150">
  <br/> -->

  <h1>BiteSwift 🍽️</h1>
  
  <p>A high-fidelity, responsive Swiggy clone built with a modern React stack. BiteSwift delivers a seamless user experience for browsing restaurants, creating orders, and managing a shopping cart, all powered by a robust and scalable frontend architecture.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react" alt="React">
    <img src="https://img.shields.io/badge/Redux_Toolkit-2.0.0-764ABC?logo=redux" alt="Redux Toolkit">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?logo=tailwind-css" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/React_Router-6.20.0-CA4245?logo=react-router" alt="React Router">
    <img src="https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite" alt="Vite">
    <img src="https://img.shields.io/github/license/sh1v-max/BiteSwift" alt="License">
    <img src="https://img.shields.io/github/stars/sh1v-max/BiteSwift?style=social" alt="GitHub Stars">
  </p>

</div>


**BiteSwift** is a front-end showcase project demonstrating best practices in modern web development. It meticulously recreates the core functionality of a food delivery application, focusing on state management, component architecture, and performance.

## ✨ Key Features

- **Dynamic Restaurant Listings:** Fetches and displays a grid of restaurants from a live API, with client-side filtering for instant search results.
- **Interactive Restaurant Menus:** Dynamic routing to individual restaurant pages, presenting detailed menus fetched on-demand.
- **Robust Cart Functionality:** A fully-featured shopping cart managed by Redux Toolkit, allowing users to add items, view their order, and clear the cart. All state changes are instantly reflected across the UI.
- **Responsive First Design:** A mobile-first, fully responsive UI crafted with Tailwind CSS ensures a seamless experience on any device, from a smartphone to a widescreen monitor.
- **Shimmer UI for Loading States:** Implements a sophisticated "Shimmer UI" effect while data is being fetched, providing a better user experience than traditional spinners.
- **Custom Hooks for Clean Code:** Business logic is abstracted into custom hooks (e.g., `useRestaurantMenu`, `useOnlineStatus`), keeping UI components lean, declarative, and easy to read.


## 🚀 Live Demo

A live version of the application is deployed and available for you to experience:

**[https://biteswift.vercel.app/](https://yourbiteswift.netlify.app/)**  <!-- Replace with your actual deployment URL -->

<!-- A GIF is highly recommended to immediately show off your project's functionality -->
<div align="center">
  <img src="https://raw.githubusercontent.com/sh1v-max/BiteSwift/main/public/biteswift-demo.gif" alt="BiteSwift Application Demo" width="800"/>
</div>


## 🛠️ Technology Stack

This project leverages a curated stack of modern, industry-leading technologies to build a high-performance and maintainable application.

| Category             | Technology                                                                                                    | Rationale                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **UI Library**       | [React.js](https://reactjs.org/)                                                                              | Component-based architecture for building a reusable and scalable UI.            |
| **Build Tool**       | [Vite](https://vitejs.dev/)                                                                                   | Next-generation frontend tooling for an insanely fast development experience.    |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)                                                                      | A utility-first framework for rapid, responsive, and consistent UI development.  |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/)                                                                | For managing complex, global state like the shopping cart in a predictable way.  |
| **Routing**          | [React Router](https://reactrouter.com/)                                                                      | Standard library for handling client-side routing and dynamic page navigation.   |
| **API Calls**        | [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)                                       | Native browser API for making network requests to fetch restaurant data.         |
| **Deployment**       | [Vercel](https://vercel.com/)                                                                                 | For seamless, fast, and reliable deployment of the frontend application.         |


## 🏁 Getting Started

To set up and run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or newer)
- [npm](https://www.npmjs.com/) (or another package manager like yarn/pnpm)

### Local Development Setup

1.  **Clone the Repository:**
    ```
    git clone https://github.com/sh1v-max/BiteSwift.git
    cd BiteSwift
    ```

2.  **Install Dependencies:**
    ```
    npm install
    ```
    This will install all the necessary packages defined in `package.json`.

3.  **Start the Development Server:**
    ```
    npm run dev
    ```
    The application will start in development mode, accessible at `http://localhost:5173`. The server features Hot Module Replacement (HMR) for instant feedback on your changes.

4.  **Build for Production:**
    To create an optimized production build, run:
    ```
    npm run build
    ```
    This command bundles the application into static files in the `/dist` directory, ready for deployment.


## 🏗️ Architectural Insights

This project's architecture was designed with maintainability, scalability, and performance as top priorities.

1.  **Separation of Concerns via Custom Hooks:**
    A core principle of this project is to keep UI components as "dumb" as possible. All complex logic, especially side effects like API calls, is extracted into custom hooks.
    -   **`useRestaurantMenu(resId)`:** This hook encapsulates the entire logic for fetching a specific restaurant's menu. It takes a `resId`, manages the API call, handles loading/error states, and returns the formatted data. The `RestaurantMenu` component is thus freed from this complexity and can focus solely on rendering the UI.
    - **`useOnlineStatus()`**: This utility hook listens to browser online/offline events, providing a boolean value that can be used application-wide to inform the user of their connectivity status.

2.  **Strategic State Management:**
    The application makes a clear distinction between local and global state.
    -   **Global State (Redux Toolkit):** The shopping cart is managed globally because its state needs to be accessed and modified by multiple, disconnected components (`Header`, `RestaurantMenu`, `CartPage`). Redux Toolkit provides a robust, predictable, and debuggable solution for this cross-cutting concern.
    -   **Local State (`useState`):** UI-specific state that is not needed elsewhere, such as the `searchText` in the main body, is managed locally within its component. This avoids cluttering the global store and keeps state management efficient.

3.  **Performance Optimization:**
    -   **Client-Side Filtering:** The search/filter functionality operates on a master list of restaurants stored in state, providing an instantaneous user experience without requiring extra API calls.
    -   **Shimmer UI:** Instead of showing a jarring loading spinner, the application displays a content placeholder (Shimmer UI) that mimics the layout of the page. This improves the perceived performance and makes the application feel faster.
    -   **Lazy Loading:** React Router is configured to lazy load components for different routes. This means the code for a specific page (like the Cart page) is only downloaded when the user navigates to it, reducing the initial bundle size and improving initial load time.


## 🛣️ Future Roadmap

BiteSwift is a living project with a clear path for future enhancements:

-   [ ] **Implement a Backend:** Create a Node.js/Express backend to serve the restaurant data, moving away from a hardcoded or external API proxy.
-   [ ] **Persist Cart Data:** Integrate with a database like **Firebase Firestore** or **PostgreSQL** to save a user's cart, so it persists between sessions.
-   [ ] **User Authentication:** Add a full authentication system (e.g., using Firebase Auth) to support user accounts, saved addresses, and order history.
-   [ ] **Checkout and Payments:** Integrate with a payment gateway like **Stripe** to simulate a complete checkout flow.
-   [ ] **End-to-End Testing:** Write a suite of integration and end-to-end tests using a framework like **Cypress** or **Playwright** to ensure key user flows (like adding to cart and checking out) are always working correctly.


## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please feel free to fork the repository, make changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'feat: Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**


## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.


<div align="center">
  <p>Crafted with ❤️ by Shiv Shankar Singh.</p>
</div>
