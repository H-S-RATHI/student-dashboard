# Student Dashboard

A modern, responsive web application for managing student information, built with Next.js, TypeScript, and Tailwind CSS.

![Student Dashboard](public/dashboard-preview.png)

## Features

- **Authentication System**: Secure login and signup functionality using Firebase Authentication
- **Dashboard Overview**: Visual representation of student data with charts and statistics
- **Student Management**: Add, view, edit, and delete student records
- **Search & Filtering**: Find students by name, email, or course
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Theme toggle for user preference

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with custom styling
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/H-S-RATHI/student-dashboard.git
   cd student-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
student-dashboard/
├── app/                  # Next.js app directory
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── students/         # Student management pages
│   │   ├── [id]/         # Student details and edit pages
│   │   └── add/          # Add student page
│   └── page.tsx          # Dashboard home page
├── components/           # Reusable components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── ...               # Feature-specific components
├── contexts/             # React contexts
│   └── auth-context.tsx  # Authentication context
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Features in Detail

### Authentication

The application uses Firebase Authentication for user management. Users can:
- Create a new account with email and password
- Log in with existing credentials
- Log out from the application

### Dashboard

The main dashboard provides an overview of:
- Total number of students
- Active courses
- Completion rates
- New enrollments
- Student enrollment trends over time
- Course distribution visualization
- Recently added students

### Student Management

Users can perform CRUD operations on student records:
- View a list of all students with search and filter capabilities
- Add new students with validation
- View detailed information for each student
- Edit student information
- Delete students from the system

## Customization

### Theming

The application supports both light and dark modes. The theme can be customized in the `tailwind.config.ts` file.

### Adding New Features

To add new features:
1. Create new components in the `components` directory
2. Add new pages in the `app` directory
3. Update API functions in the `lib/api.ts` file
4. Add new types in the `types` directory as needed

## Deployment

This application can be deployed to Vercel with minimal configuration:

```bash
npm run build
# or
pnpm build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Shadcn UI](https://ui.shadcn.com/) - UI component inspiration
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)