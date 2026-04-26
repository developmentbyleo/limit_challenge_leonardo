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

- **Component Composition**: The UI is broken down into small, focused, single-responsibility components organized in route-specific `components/` folders (e.g., `app/submissions/components/`, `app/submissions/[id]/components/`). This makes the code easier to read, test, and maintain.
- **State Management**: Uses React's built-in `useState` and `useMemo` for local state, combined with `@tanstack/react-query` for server state management (caching, refetching, loading/error states).
- **Filter UX**: Implements debounced text search (1000ms) for company name and instant filtering for status/broker dropdowns. All filters reset pagination to page 1 when changed.
- **Loading States**: Custom skeleton loaders that mirror the actual page structure (header, filters, table) provide a much better perceived performance than generic spinners.
- **Error Handling**: Each page has a dedicated error component with retry functionality, displayed below the page header for context preservation.
- **Empty States**: Friendly messages guide users when no data matches their filters.
- **Responsive Design**: Mobile-first responsive layouts using MUI's breakpoint system (e.g., header stacks vertically on mobile, horizontally on desktop).

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
- ✅ **Accessibility**: Proper ARIA labels on loading/error states, semantic HTML, keyboard navigation
- ✅ **Auto-redirect** from home page (`/`) to `/submissions`
- ✅ **Highly composable components** with helper sub-components for readability
- ✅ **Unit tests** for utility functions and the debounce hook (13 tests passing)

### Project Structure Highlights

```
frontend/app/submissions/
├── page.tsx                          # List page (composition only)
├── components/
│   ├── SubmissionsFilters.tsx
│   ├── SubmissionsTable.tsx
│   ├── SubmissionsLoading.tsx       # Skeleton matching page structure
│   ├── SubmissionsError.tsx
│   └── SubmissionsEmpty.tsx
└── [id]/
    ├── page.tsx                      # Detail page (composition only)
    └── components/
        ├── SubmissionDetailHeader.tsx
        ├── SubmissionSummaryCard.tsx
        ├── CompanyInfoCard.tsx
        ├── BrokerInfoCard.tsx
        ├── OwnerInfoCard.tsx
        ├── ContactsSection.tsx
        ├── DocumentsSection.tsx
        ├── DocumentItem.tsx
        ├── NotesSection.tsx
        ├── InfoCardHeader.tsx        # Shared component
        ├── SubmissionDetailLoading.tsx
        └── SubmissionDetailError.tsx
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

## Submission Instructions

- Provide a short README update summarizing approach, tradeoffs, and how to run the solution.
- Record and share a brief screen capture (max 2 minutes) demonstrating the frontend working end-to-end with the backend.
- Call out any stretch goals implemented.
- Automated tests are optional, but including targeted backend or frontend tests is a strong signal.
