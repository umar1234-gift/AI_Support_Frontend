# AI Customer Support Frontend

A React + TypeScript dashboard for managing a business-scoped AI customer-support SaaS.

This frontend allows businesses to manage their support setup, knowledge-base content, conversations, analytics, AI settings, and public support widget configuration.

## What Problem Does This Solve?

Customer-support teams need a clean interface to configure their AI assistant, manage knowledge, review conversations, and manage support settings without working in backend-only tools.

This frontend brings that workflow into a usable dashboard.

## Core Features

- Business dashboard and overview
- AI settings configuration
- Knowledge base document management
- FAQ management
- Conversation monitoring
- Support analytics
- Widget configuration
- Public support chat experience
- Protected routes for authenticated business users
- Reusable dashboard and chat components

## Application Flow

```text
Business user
    |
    v
Frontend Dashboard
    |
    +--> Configure AI settings
    +--> Upload documents / FAQs
    +--> Review conversations
    +--> Manage widget settings
    +--> Monitor analytics
    |
    v
NestJS API
    |
    v
FastAPI AI Service
    |
    v
RAG + retrieval + LLM responses
```

## Technology Stack

- **Frontend:** React
- **Language:** TypeScript
- **Build tool:** Vite
- **Data fetching:** TanStack React Query
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **UI utilities:** Base UI, class-variance-authority, clsx, and utility helpers
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP client:** Axios

## Project Structure

```text
src/
├── api/
│   ├── analytics.ts
│   ├── auth.ts
│   ├── axios.ts
│   ├── business.ts
│   ├── chat.ts
│   ├── conversations.ts
│   ├── documents.ts
│   ├── faqs.ts
│   └── widget.ts
├── components/
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   ├── ProtectedRoute.tsx
│   ├── Sidebar.tsx
│   ├── TypingIndicator.tsx
│   └── ...
├── pages/
│   ├── Dashboard/
│   ├── DashboardLayout.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── VerifyEmail.tsx
│   ├── VerifyOtp.tsx
│   └── ...
├── assets/
├── lib/
├── App.tsx
├── index.css
└── main.tsx
```

## Key Features by Area

### Authentication

- Login
- Signup
- Email verification
- OTP verification
- Protected route access

### Business and AI Settings

- Business configuration
- AI settings management
- Widget configuration
- SaaS dashboard workflow

### Knowledge and Support

- Knowledge-base management
- FAQ management
- Public chat interaction
- Conversation viewing and status handling

### Analytics and Dashboard

- Dashboard overview
- Business analytics
- Conversation and support metrics
- AI usage and support views

## Getting Started

### Prerequisites

- Node.js
- npm
- Access to the NestJS API and FastAPI AI service for full functionality

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build the production bundle

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run the linter

```bash
npm run lint
```

## Environment Setup

The frontend communicates with backend services through the API layer in `src/api/`.

Before running the application, configure the API base URL and any deployment-specific frontend settings required by the project.

Do not commit secrets, tokens, or private service credentials.

## Related Repositories

- [AI Support NestJS API](https://github.com/umar1234-gift/AI_Support_NestJs_Api)
- [AI Support FastAPI RAG Service](https://github.com/umar1234-gift/AI_Support_FastApi_AI)

## Current Scope and Limitations

This frontend is the user-facing layer for the AI customer-support SaaS. It depends on the backend API and AI service for authentication, business data, document processing, retrieval, and generated responses.

Production deployment, deployment-specific environment configuration, and advanced monitoring may require additional setup.

## Future Improvements

- Expand analytics dashboards
- Improve loading, error, and empty states
- Add more reusable dashboard components
- Add stronger tests for key user workflows
- Improve accessibility and responsive behavior
- Add deployment and environment setup documentation
