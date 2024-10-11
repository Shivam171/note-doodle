![Note Doodle](https://github.com/user-attachments/assets/be7f117c-7a2e-4a3d-a743-b1b697ba1fc3)

# 🧽 Note Doodle

A web app built using **Next.js** and **Convex** that allows users to create and manage teams with files that include both an editor (powered by **Editor.js**) and a canvas (powered by **Excalidraw**). Authentication is handled via **Kinde Auth**, and users can create up to 5 teams for free, with each team containing up to 5 files.

## ✨ Features

- 🔐 **Secure Authentication**: Handled by Kinde Auth, ensuring all user data is safe and secure.
- 📝 **Rich Text Editing**: Each file comes with an editor powered by [Editor.js](https://editorjs.io/), offering a modular, block-based content editing experience.
- 🎨 **Canvas Drawing**: Use [Excalidraw](https://excalidraw.com/) for a fun and intuitive drawing experience within your files.
- 👥 **Teams**: Users can create up to 5 teams, each containing 5 files. If user want to create more teams and add more files, he will have to upgrade his plan.
- 📂 **File Management**: Manage files within teams, switch between editors and canvases seamlessly.
- 🛡️ **Protected Routes**: Routes are secured, ensuring only authenticated users can access their teams and files.

## 🛠️ Tech Stack

- ⚛️ **Next.js** - Fast React framework for server-side rendering and static site generation.
- 🔄 **Convex** - Backend service for handling database and serverless functions.
- 🔐 **Kinde Auth** - Authentication service for handling user login and session management.
- 📝 **Editor.js** - Rich text editor for file content.
- 🎨 **Excalidraw** - Canvas-based drawing tool for creative collaboration.

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repo

```bash
git clone https://github.com/Shivam171/note-doodle
cd note-doodle
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of the project, use the .env.example for reference.

### 4. Run the development server

```bash
npm run dev # for frontend
npx convex dev # for backend api
```

Navigate to http://localhost:3000 to see the app in action.

## 🛡️ Authentication

Authentication is managed by **Kinde Auth**. Users must log in to create teams and manage their files. You can set up your Kinde Auth credentials and domains via their [documentation](https://kinde.com/docs).

## 🗃️ Teams & Files

- 🏢 **Teams**: Users can create up to 5 teams for free.
- 📂 **Files**: Each team can contain up to 5 files.
- 🔄 **Editor & Canvas**: Each file consists of two views – an Editor (via **Editor.js**) and a Canvas (via **Excalidraw**).

## 🛡️ Protected Routes

All routes are protected by authentication middleware. Unauthorized users will be redirected to the login page when attempting to access protected routes like team or file management pages.

## 🤝 Contributing

Feel free to fork this project, open an issue, or submit a pull request for any improvements or bug fixes!

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy coding! 🚀
