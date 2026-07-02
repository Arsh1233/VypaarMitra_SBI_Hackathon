---
name: Vyapaar Mitra Core
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#43474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#405e92'
  primary: '#002653'
  on-primary: '#ffffff'
  primary-container: '#1a3c6e'
  on-primary-container: '#8aa8e0'
  inverse-primary: '#abc7ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#3e1f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e3100'
  on-tertiary-container: '#db9960'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#264679'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#ffdcc2'
  tertiary-fixed-dim: '#feb87c'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#6b3b09'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
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
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  max-width: 1440px
---

## Brand & Style

The design system is engineered for **Operational Ease** and **Financial Clarity**, specifically tailored for enterprise environments where data density must be balanced with rapid comprehension. The brand personality is dependable, efficient, and transparent.

The aesthetic follows a **Modern Minimalist** approach. It prioritizes functional clarity over decorative elements, using a structured card-based architecture to modularize complex financial workflows. By leveraging generous whitespace and a restricted color palette, the system reduces cognitive load, allowing users to focus on critical decision-making tasks without visual distraction.

## Colors

The palette is anchored by a deep, authoritative primary blue, conveying stability and institutional trust. 

- **Primary (#1a3c6e):** Used for key action buttons, active states, and primary navigation elements.
- **Neutral Scale:** Utilizes a sophisticated Slate/Gray range (from `#f8fafc` for backgrounds to `#1e293b` for primary text) to maintain high contrast and accessibility.
- **Semantic Colors:** Green is reserved for positive financial growth and "Success" states, while Red is strictly for "Error" or "Overdue" alerts.
- **Surface Strategy:** Use subtle gray tints for container backgrounds to distinguish between the canvas and interactive modules.

## Typography

This design system utilizes **Inter** exclusively to ensure maximum legibility across dense data tables and financial dashboards. 

The type hierarchy is strictly enforced to guide the user's eye from high-level summaries to granular details. **Display and Headline** sizes use tighter letter spacing and heavier weights for a modern, "locked-in" feel. **Body** text is optimized for long-form reading and data entry, maintaining a 1.5x line-height ratio. **Labels** use medium weights and slight tracking (letter spacing) to ensure they remain distinct even at small sizes.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

A strict **8px linear scale** governs all spacing decisions to ensure rhythmic consistency. Generous padding is applied within cards and containers to prevent data density from feeling overwhelming. 

- **Desktop:** 24px margins, 16px gutters.
- **Tablet:** 16px margins, 16px gutters.
- **Mobile:** 16px margins, 12px gutters.
- **Alignment:** All content follows a "Left-to-Right" logic with numeric data always right-aligned in tables to facilitate quick vertical scanning and comparison.

## Elevation & Depth

This design system uses a **Tonal Layering** approach combined with **Soft Ambient Shadows**. Depth is used to indicate interactivity and importance rather than pure decoration.

- **Level 0 (Background):** The base canvas uses the lightest neutral tint (#f8fafc).
- **Level 1 (Cards):** Main content areas are elevated using white (#ffffff) backgrounds with a 1px border (#e2e8f0) and a very soft, diffused shadow (Y: 2px, B: 4px, 5% opacity).
- **Level 2 (Modals/Popovers):** Higher elevation is signaled by a more pronounced shadow (Y: 10px, B: 20px, 10% opacity) and a background overlay to dim the Level 0/1 content.
- **Interaction:** On hover, interactive cards should slightly increase their shadow spread to provide tactile feedback.

## Shapes

To balance professional rigor with a contemporary feel, the design system employs a **Rounded (8px)** shape language. 

Standard components like buttons, input fields, and cards all share the same 8px corner radius. Larger containers or marketing banners may use the `rounded-xl` (24px) setting for a softer appearance, while utility-based icons and tags stay strictly within the 8px or pill-shaped constraints to maintain a clean, geometric silhouette.

## Components

- **Buttons:** The primary button uses the Deep Blue background with white text. Padding is 12px vertical, 24px horizontal. Secondary buttons use a subtle gray outline or ghost style.
- **Cards:** The core unit of the design system. All cards must have a 1px border and 24px internal padding. Content should be grouped logically using internal dividers where necessary.
- **Input Fields:** Use 8px rounded corners with a 1px slate border. Focus states must clearly use the Primary Blue as a 2px ring or border highlight.
- **Data Tables:** High-density components. Use 48px row heights for standard viewing and 40px for "compact" views. Header rows should have a subtle gray background.
- **Status Chips:** Small, pill-shaped indicators. Use low-saturation background tints (e.g., light green background with dark green text) for readability and accessible contrast.
- **Navigation:** A vertical sidebar is recommended for enterprise scalability, using clear iconography paired with Inter labels at 14px.