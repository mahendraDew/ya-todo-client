
# YA Todo App - Frontend

This is the frontend repository for the YA Todo App, a simple yet powerful task management application. Built using React and Tailwind CSS, it allows users to manage their todos efficiently with a clean and responsive user interface.

## Features

- **User Authentication**: Login and signup functionality to create a personalized user experience.
- **Task Management**: Add, edit, and delete todos.
- **Responsive Design**: Adaptable UI for different devices using Tailwind CSS.
- **Interactive UI**: Dropdown menus, hover effects, and animations for an enhanced user experience.

## Tech Stack

- **Frontend**: React, Tailwind CSS, JavaScript
- **Routing**: React Router for navigation
- **State Management**: useState and useEffect hooks for managing state
- **Icons**: [Lucide-React](https://lucide.dev) for consistent iconography

## Getting Started

Follow these steps to get a copy of the frontend running on your local machine.

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ya-todo-frontend.git
   cd ya-todo-frontend
   ```

2. **Install dependencies**:
   ````bash
   npm install
   ````
   or if you use yarn:
   ````bash
   yarn install
   ````

3. **Start the development server**:
   ````bash
   npm start
   ````
   or if you use yarn:
   ````bash
   yarn start
   ````

   The app will run at \`http://localhost:3000\`.

### Environment Variables

Create a \`.env\` file in the root directory and add the following environment variables:

````
REACT_APP_API_URL=http://localhost:5000
````

Replace the value of \`REACT_APP_API_URL\` with the backend server URL if it differs.

## Project Structure

````
├── public
├── src
│   ├── components
│   ├── pages
│   ├── styles
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── README.md
├── package.json
└── ...
````

- ```src/components```: Reusable UI components.
- ```src/pages```: Page components corresponding to routes.
- ```src/styles```: Tailwind CSS and custom styles.
- ```App.js```: Main application component.
- ```index.js```: Entry point of the React app.

## Usage

- **Home Page**: Displays the list of todos.
- **Add Todo**: Click the "Add" button to create a new task.
- **Edit/Delete Todo**: Hover over a task to reveal the edit and delete options.
- **User Menu**: Access user settings and logout options by clicking on the user avatar.

## Deployment

To deploy the frontend to a hosting service like Vercel or Netlify:

1. Build the app:
```bash
   npm run build
```
2. Follow the hosting service instructions for deploying a React app.

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Acknowledgments

- Thanks to [Lucide-React](https://lucide.dev) for the icons.
- Built with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/).

## Contact

For any questions or feedback, please reach out me [here](mahendrdadewangan195@gmail.com).