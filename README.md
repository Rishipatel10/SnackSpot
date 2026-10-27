SnackSpot 🍿

A modern, responsive e-commerce experience for snack lovers. Browse, shop, and manage your cart seamlessly.

Live Demo | Report Bug | Request Feature

🏗 System Architecture

graph TD
    Client[📱 Client / Browser] 
    Vercel[▲ Vercel Hosting]
    GitHub[🐙 GitHub Repository]
    Supabase[(⚡ Supabase)]
    
    Client -->|Serves UI| Vercel
    GitHub -->|CI/CD Pipeline| Vercel
    Client -->|Auth / Session| Supabase
    Client -->|Fetch / Upsert Data| Supabase
    
    subgraph Frontend [React + Vite]
        AuthContext
        DataContext
        CartContext
    end
    
    Client -.-> Frontend


✨ Core Features

🛒 Smart Cart Management: Add items, adjust quantities, and securely persist your cart to the database.

🔐 Secure Authentication: User sign-up, login, and session management powered by Supabase Auth.

📱 Responsive Design: Fully optimized for desktop and mobile navigation using Tailwind CSS.

⚡ Real-time Data: Instant product loading and category filtering.

🛠 Technology Stack

Category

Technology

Purpose

Frontend

React, Vite

Component-based UI and blazing-fast development server.

Styling

Tailwind CSS

Utility-first CSS for responsive, modern layouts.

Backend & Auth

Supabase

PostgreSQL database, Row Level Security (RLS), and user auth.

Deployment

Vercel

Production hosting with automated GitHub deployments.

🚶 User Journey

sequenceDiagram
    actor User
    participant App as SnackSpot (UI)
    participant DB as Supabase (Backend)
    
    User->>App: Browses snacks & categories
    App->>DB: Fetch products
    DB-->>App: Return product data
    User->>App: Creates account / Logs in
    App->>DB: Authenticate via AuthContext
    User->>App: Adds snacks to Cart
    App->>DB: Upsert (user_id, cart_id)
    Note over App,DB: Cart persists across sessions!


🗄️ Database Schema

The core functionality relies on secure cart persistence using Supabase Row Level Security (RLS) ensuring users only access their own data.

Table: cart_items

Type

Description

id

uuid

Primary Key

user_id

uuid

References auth.users(id)

cart_id

string

Unique app-level cart identifier

product_id

string

References product

quantity

integer

Must be > 0

Security Note: A unique constraint on (user_id, cart_id) prevents duplicates. RLS policies restrict operations to user_id = auth.uid().

🚀 Quick Start (Run Locally)

1. Clone & Install

git clone https://github.com/Rishipatel10/SnackSpot.git
cd SnackSpot
npm install


2. Configure Environment

Create a .env file in the root directory. Never expose your secret/service keys.

VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_ANON_KEY


3. Start Development Server

npm run dev
# App will typically run at http://localhost:5173


🚀 Deployment (Vercel)

Connect your GitHub repository to a new Vercel project.

Select Vite as the framework preset.

Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the Vercel Environment Variables.

Click Deploy. Vercel will automatically rebuild on future pushes to your main branch.

🗺️ Roadmap & Future Improvements

[ ] Complete Wishlist persistence in Supabase.

[ ] Implement secure Stripe checkout and payment processing.

[ ] Add User Profile dashboard (Address management & Order History).

[ ] Introduce product reviews and star ratings.

[ ] Integrate server-side price validation for secure transactions.

Built by Rishi Patel