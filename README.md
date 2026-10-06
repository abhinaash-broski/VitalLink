# VitalLink app (web + mobile)

Built from the Figma file `JuPJkw5r1aAtdgRQk2UuaA`. One npm-workspaces repo; both apps render the
same view-models and the same design tokens.

```
packages/
  tokens/   figma-variables.json → build.mjs → css/tokens.css (web) + src/generated.ts (both)
  assets/   icons exported from Figma (SVG, stroke = currentColor)
  api/      typed client for the FastAPI backend, mock mode, screen view-models (screens.ts, views/)
apps/
  web/      React 19 · Vite · React Router · CSS modules       (desktop portal, 1440 frames)
  mobile/   Expo SDK 57 · Expo Router · react-native-svg            (390 frames)
```

## Run

```bash
npm install
npm run web          # http://localhost:5173  (/welcome is the public site, / is the signed-in dashboard)
npm run mobile       # Expo Go on a phone, or press w for the browser
npm run typecheck
npm run tokens       # after editing packages/tokens/figma-variables.json
python scripts/write-icons.py   # after adding an icon size to USES (regenerates both Icon registries)
```

With no API URL both apps run on **mock data** (the sample values in the Figma frames).
To use the backend set `VITE_API_URL` (web) / `EXPO_PUBLIC_API_URL` (mobile). Screens whose endpoint
doesn't exist yet say so instead of showing sample numbers.

## Screens

Every frame in the Figma file is built; each screen file names its frame in a header comment.

| Area | Web | Mobile |
|---|---|---|
| Public & auth | Homepage `/welcome`, Sign in, Create account | Welcome, Sign in, Create account |
| Dashboard | Dashboard `/` | Home tab |
| My Health | Overview, Vitals, Activity, Sleep, Heart, Respiratory, Body Composition, Mental Wellbeing, Digital Wellbeing (`/health/*`) | Overview, Activity, Digital (Health tab; Sleep/Heart/Body have no mobile frame yet) |
| Fitness | Workouts, Nutrition, Goals | Train tab: Workouts, Nutrition, Goals |
| Records | Medical Records, Lab Results, Document Viewer (`/records/*`) | Records tab |
| Care | Medications, Appointments, Health Library, Family, Messages, Notifications, Emergency Medical ID, Connected Devices, Privacy, Settings | Profile tab → the same screens |

Tabs and sub-sections that have no frame yet show "… is in a later batch".

## Rules

- No raw colours, sizes or fonts in components — everything comes from `@vitallink/tokens`.
- Icons are never redrawn: sizes are generated from the Figma icon components (`scripts/icon-masters.json`).
- Screens do no formatting — `packages/api` view-models produce display strings.
- Sign-in and sign-up are stubs; real auth is Supabase Auth per the backend design.
