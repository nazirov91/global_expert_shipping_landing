# Auto Transport Broker Website

## Overview

This is a professional auto transport broker website that connects customers with vehicle shipping services nationwide. The application provides a comprehensive platform for users to get quotes, learn about services, and contact the company for vehicle transportation needs. The site features a modern design with trust-building elements similar to professional service platforms like Airbnb and Booking.com, combined with clean B2B aesthetics for the auto transport industry.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom design system based on professional blue/orange color palette
- **State Management**: TanStack Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for robust form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js for the API server
- **Language**: TypeScript for full-stack type safety
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Design**: RESTful API pattern with /api prefix for all backend routes

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM (currently using Neon serverless)
- **Schema**: User management system with username/password authentication
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Development Storage**: In-memory storage implementation for local development

### Authentication and Authorization
- **Session Management**: Express session handling with PostgreSQL session store (connect-pg-simple)
- **User Model**: Simple username/password system with unique constraints
- **Validation**: Zod schemas for input validation and type safety

### Design System
- **Component Library**: Custom implementation of shadcn/ui components
- **Typography**: Inter font family from Google Fonts
- **Color Scheme**: Professional blue primary colors with orange accents for CTAs
- **Layout**: Responsive grid system using Tailwind CSS utilities
- **Icons**: Lucide React icon library for consistent iconography

### Page Structure
- **Single Page Application**: All content on homepage with smooth scrolling navigation
- **Sections**: Hero with quote form, services overview, trust signals, process explanation, testimonials, FAQ, and contact
- **Quote Form**: Multi-step form with vehicle selection, route planning, and contact information
- **Vehicle Data**: NHTSA API integration for vehicle make/model lookup

## External Dependencies

### Third-Party Services
- **NHTSA API**: Vehicle make and model data for quote form
- **Google Fonts**: Inter font family for typography
- **Replit**: Development environment with specific vite plugins

### Key Libraries
- **UI Framework**: React 18 with TypeScript
- **Form Handling**: React Hook Form with Hookform resolvers
- **Validation**: Zod for schema validation
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icon library
- **Components**: Radix UI primitives for accessible components
- **Carousel**: Embla Carousel for image/content sliders
- **Date Handling**: date-fns for date manipulation

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript compiler for type checking
- **Session Storage**: connect-pg-simple for PostgreSQL session management

### Asset Management
- **Images**: Static assets stored in attached_assets directory
- **Vehicle Data**: JSON file with vehicle makes for form dropdowns
- **Design Guidelines**: Markdown documentation for design system consistency