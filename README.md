# AI Trip Planner

An AI-powered travel planning app. Tell it where you want to go, and a conversational agent asks the right follow-up questions (starting point, group size, budget, trip length, interests) before generating a complete day-by-day itinerary — hotel picks, activities, and real photos for each place.

Built with the Next.js App Router, Convex, Clerk, and the OpenAI API.

## Features

- **Conversational trip builder** — a chat interface collects trip details one question at a time and renders purpose-built UI (budget, group size, day count) inline with the conversation.
- **AI-generated itineraries** — once all details are collected, the planner produces a structured day-by-day plan with hotel recommendations, activities, ticket pricing, and best times to visit.
- **Real destination photography** — hotel and place images are resolved through Pexels and Wikimedia Commons (with relevance and licensing checks), never generic stock placeholders.
- **My Trips dashboard** — every generated plan is saved and browsable from a personal trips list, each opening into a full itinerary view.
- **Authentication** — sign-in/sign-up handled by Clerk, with plan-based access checks for premium usage.
- **Rate limiting & bot protection** — Arcjet guards the AI generation endpoint with a token bucket, so anonymous abuse doesn't burn through API credits.
- **Responsive UI** — polished layouts across mobile, tablet, and desktop, built with Tailwind CSS and shadcn/ui.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) + React 19 |
| Styling | Tailwind CSS v4, shadcn/ui, Tabler & Lucide icons |
| Auth | [Clerk](https://clerk.com) |
| Database | [Convex](https://convex.dev) |
| AI | OpenAI Chat Completions API |
| Images | Pexels API, Wikimedia Commons API |
| Bot/rate-limit protection | [Arcjet](https://arcjet.com) |

## Project Structure

```
app/
├── page.tsx                  # Landing page
├── create-new-trip/          # Chat-driven trip creation flow
├── my-trips/                 # Saved trips dashboard
├── view-trip/[tripid]/       # Single trip itinerary view
├── pricing/                  # Pricing / plans page
├── api/
│   ├── aimodel/               # OpenAI itinerary generation endpoint
│   ├── hotel-image/           # Pexels/Wikimedia image resolution endpoint
│   └── arcjet/                # Rate limiting configuration
├── _components/               # Shared layout components (Header, Hero, Footer)
└── Provider.tsx               # Convex, user, and trip-detail context providers

convex/
├── schema.ts                  # Database schema (users, trip details)
├── user.ts                    # User queries/mutations
└── tripDetail.ts              # Trip queries/mutations
```

## Getting Started

### Prerequisites

- Node.js 20+
- Accounts/API keys for: [Clerk](https://clerk.com), [Convex](https://convex.dev), [OpenAI](https://platform.openai.com), [Arcjet](https://arcjet.com), [Pexels](https://www.pexels.com/api/)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with the following variables:

   ```bash
   # Convex
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=
   NEXT_PUBLIC_CONVEX_SITE_URL=

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

   # OpenAI
   OPENAI_API_KEY=

   # Arcjet
   ARCJET_KEY=
   ARCJET_ENV=development

   # Image search
   PEXELS_API_KEY=
   ```

3. Start the Convex dev deployment (in a separate terminal):

   ```bash
   npx convex dev
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## License

Private project — all rights reserved.
