# Submission Tracker Take-home Challenge

This repository hosts the Submission Tracker.

## 🛠️ Tech Stack

### Backend

- **[Python 3](https://www.python.org/)** – Programming language
- **[Django 5.2](https://www.djangoproject.com/)** – Web framework
- **[Django REST Framework](https://www.django-rest-framework.org/)** – RESTful API toolkit
- **SQLite** – Development database

### Frontend

- **[Next.js 16](https://nextjs.org/)** (App Router) – React framework
- **[React 19](https://react.dev/)** – UI library
- **[TypeScript](https://www.typescriptlang.org/)** – Type safety
- **[Material UI v7](https://mui.com/)** – Component library
- **[MUI Icons](https://mui.com/material-ui/material-icons/)** – Icon set
- **[TanStack React Query](https://tanstack.com/query/latest)** – Server state management
- **[Axios](https://axios-http.com/)** – HTTP client
- **[Tailwind CSS v4](https://tailwindcss.com/)** – Utility-first CSS

### Tooling

- **[ESLint](https://eslint.org/)** – Linting
- **[Prettier](https://prettier.io/)** – Code formatting

## 📝 Solution Summary

### Approach

This implementation focuses on building a clean, maintainable, and user-friendly submission tracker with a strong emphasis on component composition, separation of concerns, and great UX.

#### Frontend Architecture

- **Component Composition**: Small, single-responsibility components grouped by feature under `components/submissions/` and `components/submission-detail/`, keeping `app/` as a pure routing layer.
- **State Management**: `useState` / `useMemo` for local state; `@tanstack/react-query` for server state (caching, refetching, loading/error).
- **Filter UX**: Debounced text search (1000ms) for company name; instant filtering for status/broker dropdowns. All filters reset pagination to page 1.
- **Loading States**: Skeleton loaders that mirror the real page structure (header, filters, table) instead of generic spinners.
- **Error Handling**: Dedicated error component per page with retry, preserving the page header for context.
- **Responsive Design**: Mobile-first layouts using MUI breakpoints.

#### Backend Implementation

- **Filtering**: Extended the `SubmissionFilterSet` with three filters using `django-filter`:
  - `status`: case-insensitive exact match (`iexact`)
  - `brokerId`: exact match on broker foreign key
  - `companySearch`: case-insensitive partial match (`icontains`) on company name
- **Documentation**: Added inline comments explaining filter behavior and example URLs for clarity.

### Tradeoffs

- **No URL state synchronization**: Initially implemented but later removed for simplicity. Filters reset on page refresh. In production, syncing filter state to URL params would be valuable for shareable links and browser back/forward navigation.
- **Local component state vs. global**: Used local `useState` instead of a global state library (Redux/Zustand) since the state is page-scoped and React Query handles server state. Adding a global store would be over-engineering for this scope.
- **MUI over custom design system**: Chose MUI for speed and consistency. A custom design system would offer more brand identity but slower iteration.
- **Targeted tests over full coverage**: Focused unit tests on the highest-value, most reusable pieces rather than aiming for 100% coverage.
- **Skeleton vs. spinner**: Chose skeletons for better perceived performance, at the cost of slightly more code per loading state.

### Stretch Goals Implemented

- ✅ **Skeleton loading states** matching exact page structure for both list and detail pages
- ✅ **Debounced search** for company name filter to reduce API calls
- ✅ **Responsive design** with mobile-friendly layouts
- ✅ **Auto-redirect** from home page (`/`) to `/submissions`
- ✅ **Highly composable components** with helper sub-components for readability
- ✅ **Unit tests** for utility functions and the debounce hook

### Project Structure Highlights

```
frontend/
├── app/
│   └── submissions/
│       ├── page.tsx                  # List page (composition only)
│       └── [id]/
│           └── page.tsx              # Detail page (composition only)
├── components/
│   ├── submissions/                  # List page components
│   │   ├── SubmissionsFilters.tsx
│   │   ├── SubmissionsTable.tsx
│   │   ├── SubmissionsLoading.tsx
│   │   ├── SubmissionsError.tsx
│   │   ├── SubmissionsEmpty.tsx
│   │   └── index.ts
│   └── submission-detail/            # Detail page components
│       ├── SubmissionDetailHeader.tsx
│       ├── SubmissionDetailLoading.tsx
│       ├── SubmissionDetailError.tsx
│       ├── SubmissionSummaryCard.tsx
│       ├── CompanyInfoCard.tsx
│       ├── BrokerInfoCard.tsx
│       ├── OwnerInfoCard.tsx
│       ├── InfoCardHeader.tsx
│       ├── ContactsSection.tsx
│       ├── DocumentsSection.tsx
│       ├── DocumentItem.tsx
│       ├── NotesSection.tsx
│       └── index.ts
├── hooks/
│   ├── useSubmissions.ts
│   ├── useBrokerOptions.ts
│   ├── useDebounce.ts
│   └── useDebounce.test.ts
├── types/
│   ├── submission.ts
│   ├── entities.ts
│   ├── api.ts
│   └── index.ts
├── constants/
│   ├── submissions.ts
│   ├── config.ts
│   └── index.ts
├── utils/
│   ├── date.ts
│   └── date.test.ts
└── lib/
    └── api-client.ts
```

## Getting Started (quick start)
### Backend
```bash
cd backend
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm run dev

```

To run unit tests (frontend only):
```bash
cd frontend
npm test               # run all tests
```

## Getting Started (first time running)

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_submissions  # optional but recommended
# add --force to rebuild the generated sample data
python manage.py runserver 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # create if you want a custom API base
# NEXT_PUBLIC_API_BASE_URL defaults to http://localhost:8000/api
npm run dev
```

Visit `http://localhost:3000/submissions` to start building.

## Development Workflow

1. Start the Django server on port 8000 (`python manage.py runserver`).
2. Start the Next.js dev server on port 3000 (`npm run dev`).
3. Iterate on backend filters, serializers, and viewsets, then refresh the frontend to see updated
   data.
4. When ready, add README notes summarizing your approach, tradeoffs, and any stretch goals.

## Quick Demo

<video src="frontend/media/Screen Recording 2026-04-26 at 10.27.56.mov" controls width="100%"></video>
