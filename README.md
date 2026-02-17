# Stride Communication Preferences

A standalone React application for managing email and SMS communication preferences across all Stride brands.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (opens http://localhost:3000)
npm run dev
```

## Build for Production

```bash
# Build static files to dist/
npm run build

# Preview the production build locally
npm run preview
```

## Deploy

The `npm run build` command outputs static files to the `dist/` directory. These can be deployed to any static hosting provider:

### Vercel (Recommended for simplicity)
```bash
npx vercel --prod
```

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### AWS S3 + CloudFront
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Traditional Web Server (Nginx, Apache)
Copy the contents of `dist/` to your web root. For SPA routing, configure your server to serve `index.html` for all routes:

**Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Project Structure

```
stride-preferences/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── public/
│   └── favicon.svg         # Stride-branded favicon
└── src/
    ├── main.jsx            # React mount point
    ├── index.css           # Global styles and resets
    └── App.jsx             # Communication preferences component
```

## Connecting to a Backend

The component currently uses local React state. To persist preferences, you'll need API endpoints:

| Method | Endpoint                        | Purpose                              |
|--------|---------------------------------|--------------------------------------|
| GET    | `/api/preferences`              | Fetch user's current settings        |
| PUT    | `/api/preferences`              | Save global + per-product overrides  |
| POST   | `/api/preferences/sms-consent`  | Record TCPA consent with timestamp   |
| PUT    | `/api/preferences/contact`      | Update email or phone number         |

### SMS Consent Record (TCPA Compliance)

When a user opts into SMS, store:
- User ID
- Phone number
- Consent timestamp (UTC)
- IP address
- Exact consent language shown
- Source (e.g., "preferences-page-v1")

This record is your legal protection under TCPA ($500–$1,500 per unsolicited message).

## Brand Tokens

All design values are extracted from stridelearning.com:

| Token        | Value     | Usage                          |
|--------------|-----------|--------------------------------|
| Primary Blue | `#2127C3` | Buttons, toggles, active state |
| Navy         | `#000F42` | Headings, header bar           |
| Light Blue   | `#B3E4FF` | Accent underlines              |
| Orange       | `#F06500` | Logo dot, secondary CTA        |
| Body Text    | `#2D2D2D` | Default text                   |
| Muted        | `#595959` | Secondary text                 |
| Light BG     | `#F3F3F3` | Subtle backgrounds             |
| Footer BG    | `#E8F4FB` | Footer wash                    |
| Border       | `#E0E0E0` | All borders                    |

**Border radius:** 0px (Stride uses sharp corners throughout)
**Button style:** Outlined, uppercase, letter-spacing 0.05em+
**Section padding:** 80px vertical
