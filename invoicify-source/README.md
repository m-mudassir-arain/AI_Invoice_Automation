# Invoicify — AI Invoice Generator (Frontend)

A production-ready, premium SaaS landing page and invoice generator UI, built with React, Vite, Tailwind CSS, and Framer Motion. Design language is a light "spatial UI": layered depth, glassmorphism, soft elevation shadows, and a mouse-tracked 3D floating hero illustration.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/
    ui/            Button, Reveal (scroll animations), SectionHeading
    Navbar, Hero, TrustedBy, Features, HowItWorks,
    InvoiceForm, SuccessModal, WhyChooseUs, Testimonials,
    Pricing, FAQ, Contact, Footer
  hooks/
    useTilt.js     cursor-tracked 3D tilt for cards
  lib/
    api.js         invoice generation service (mocked by default)
  index.css        Tailwind v4 theme tokens (brand colors, shadows)
  App.jsx
  main.jsx
```

## Connecting the real backend

The "Generate Invoice" button calls `generateInvoice()` in `src/lib/api.js`. It currently runs in **mock mode** (simulated 1.8s delay, fake PDF/Drive links) so the UI is fully demoable without a live backend.

To connect it to your real invoice endpoint:

1. Open `src/lib/api.js` and set `MOCK_MODE = false`.
2. Create a `.env` file with your endpoint:
   ```
   VITE_API_URL=https://your-backend.example.com/generate-invoice
   ```
3. The endpoint should accept a `POST` with the form payload and respond with:
   ```json
   {
     "success": true,
     "download_url": "https://example.com/invoice.pdf",
     "drive_url": "https://drive.google.com/..."
   }
   ```

No automation-platform naming appears anywhere in the UI — the frontend only ever talks to a generic `/generate-invoice` API, regardless of what powers it behind the scenes.

## Design notes

- **Palette, type, and section content** follow the supplied requirements doc exactly (Inter, blue #2563EB primary, light theme only).
- **Spatial signature**: the hero's floating invoice/analytics/PDF/cloud cards sit in real 3D space (`perspective` + `translateZ`) and respond to cursor movement — this is the one deliberate "risk" element; everything else stays disciplined and quiet so it doesn't compete.
- Feature cards, the pricing card, and the live invoice preview each carry a lighter version of the same depth language (subtle tilt, layered shadow elevation) to keep it consistent without repeating the same trick everywhere.
- Fully responsive, keyboard-focusable, and respects `prefers-reduced-motion`.
