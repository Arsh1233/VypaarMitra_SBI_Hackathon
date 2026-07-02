---
name: Vyapaar Mitra Design System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444652'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#757683'
  outline-variant: '#c5c5d4'
  surface-tint: '#3d58b3'
  primary: '#0b308b'
  on-primary: '#ffffff'
  primary-container: '#2c49a3'
  on-primary-container: '#b0c0ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006a68'
  on-secondary: '#ffffff'
  secondary-container: '#6ff4f1'
  on-secondary-container: '#006e6d'
  tertiary: '#682000'
  on-tertiary: '#ffffff'
  tertiary-container: '#8f2f00'
  on-tertiary-container: '#ffae90'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164f'
  on-primary-fixed-variant: '#213f99'
  secondary-fixed: '#72f6f4'
  secondary-fixed-dim: '#51dad7'
  on-secondary-fixed: '#00201f'
  on-secondary-fixed-variant: '#00504f'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802a00'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered to bridge the gap between traditional banking reliability and modern financial empowerment. The brand personality is **Supportive, Transparent, and Proactive**, acting as a digital partner ("Mitra") for the customer’s financial journey.

The visual style follows a **Modern Corporate** aesthetic with a strong emphasis on **Minimalism**. By utilizing generous whitespace and a refined color application, the interface reduces cognitive load, allowing users to focus on critical financial metrics and product discovery. While the color palette remains authoritative, the interaction model is softened through consistent roundedness and subtle tonal layering to feel more welcoming and less institutional.

## Colors

The palette is rooted in the trusted blue of the SBI heritage but introduces secondary and tertiary accents to modernize the experience.

- **Primary (#2C49A3):** Used for navigation, primary buttons, and brand headers to establish immediate trust.
- **Secondary (#00B1AF):** A vibrant teal used for growth indicators, success states, and financial health metrics.
- **Tertiary (#F06428):** Reserved for high-priority calls-to-action and promotional discovery banners.
- **Surface & Background:** The system uses a "Paper" background (#F8FAFC) to ensure the UI feels airy and clean, contrasting with pure white (#FFFFFF) for cards and interactive containers.

## Typography

This design system utilizes **Inter** across all levels to maintain a systematic, utilitarian, yet friendly tone. 

- **Hierarchy:** Use `Display` and `Headline-lg` for dashboard summaries and hero sections. 
- **Readability:** `Body-md` is the workhorse for all financial data and descriptive text. 
- **Data Tables:** For numerical data in tables, use `Label-md` with tabular lining figures if available, ensuring columns align perfectly for easy comparison of financial figures.
- **Scaling:** On mobile, headlines should aggressively downscale to prevent awkward line breaks in narrow data views.

## Layout & Spacing

The layout philosophy follows a **Fluid-Fixed Hybrid Grid**. The content is contained within a max-width of 1280px for desktop to ensure readability, while the internal gutters remain fluid.

- **Desktop (1024px+):** 12-column grid, 24px gutters, 48px outside margins.
- **Tablet (768px - 1023px):** 8-column grid, 20px gutters, 32px outside margins.
- **Mobile (Up to 767px):** 4-column grid, 16px gutters, 16px outside margins.

Spacing follows an 8px linear scale. Use `lg` (40px) and `xl` (64px) to separate major dashboard sections, creating the "welcoming whitespace" requested. Data-dense components (like transaction lists) may use the `xs` (4px) and `sm` (12px) units for internal padding.

## Elevation & Depth

This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a sense of organized hierarchy without clutter.

- **Level 0 (Background):** Neutral light gray (#F8FAFC).
- **Level 1 (Cards/Containers):** Pure white with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)). This is the primary surface for dashboard widgets.
- **Level 2 (Active/Hover):** When a user interacts with a card, the shadow deepens (0px 8px 30px rgba(0,0,0,0.08)) to provide tactile feedback.
- **Level 3 (Modals/Popovers):** Higher elevation with a 15% opacity primary color tint in the shadow to maintain brand connection.

Avoid heavy borders; use subtle 1px strokes in a light gray (#E2E8F0) to define boundaries only when necessary for data separation.

## Shapes

To ensure the portal feels approachable and modern, the design system utilizes **Rounded (0.5rem base)** geometry.

- **Standard Elements (Buttons, Inputs, Small Cards):** 8px (0.5rem) corner radius.
- **Large Containers (Dashboard Widgets, Hero Sections):** 16px (1rem) corner radius.
- **Interactive Pill Elements (Chips, Status Tags):** 100px (Full Round) for a distinct "friendly" feel.

All photographic assets or illustrations should follow the 16px corner radius to maintain a consistent visual language.

## Components

- **Buttons:** 
  - *Primary:* Solid #2C49A3 with white text; 8px radius.
  - *Secondary:* Ghost style with #2C49A3 border and text.
  - *CTA:* Solid #F06428 for "Apply Now" or "Unlock Offer" actions.
- **Dashboard Metrics:** Use a "KPI Card" pattern. Large `Headline-lg` for the value, `Label-sm` for the title, and a small `Secondary` color sparkline or percentage indicator for health/trend.
- **Input Fields:** 8px radius with a 1px border. On focus, the border transitions to Primary Blue with a 3px soft blue outer glow.
- **Chips/Status Tags:** Use low-saturation background tints of the status color (e.g., Light Teal background for "Success") with high-saturation text for accessibility.
- **Product Discovery Cards:** Vertical layout with a top-aligned icon or illustration, 16px padding, and a clear Tertiary-colored text link at the bottom.
- **Data Lists:** Clean rows with 16px vertical padding, separated by subtle 1px dividers. Use `Inter` at `Body-md` for primary list items.