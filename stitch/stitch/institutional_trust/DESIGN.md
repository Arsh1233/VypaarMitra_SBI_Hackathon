---
name: Institutional Trust
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#43474f'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#405e92'
  primary: '#002653'
  on-primary: '#ffffff'
  primary-container: '#1a3c6e'
  on-primary-container: '#8aa8e0'
  inverse-primary: '#abc7ff'
  secondary: '#bb0014'
  on-secondary: '#ffffff'
  secondary-container: '#e51d24'
  on-secondary-container: '#fffbff'
  tertiary: '#002e16'
  on-tertiary: '#ffffff'
  tertiary-container: '#004725'
  on-tertiary-container: '#53bb7b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#264679'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ac'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000d'
  tertiary-fixed: '#8ff8b2'
  tertiary-fixed-dim: '#73db97'
  on-tertiary-fixed: '#00210e'
  on-tertiary-fixed-variant: '#00522b'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 16px
  margin-desktop: 32px
  gutter: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is built on the pillars of **Trust, Authority, and Accessibility**. Designed specifically for high-stakes enterprise banking, the style balances institutional reliability with modern digital efficiency. It follows a **Corporate / Modern** aesthetic, utilizing a structured layout that prioritizes information density without sacrificing clarity. 

The visual language communicates security and stability to a diverse user base, ranging from corporate treasurers to small-scale entrepreneurs. A "Vernacular First" approach ensures that the interface remains intuitive and legible across different languages and literacy levels through high-contrast visuals and clear iconography.

## Colors

The palette is anchored by **Institutional Blue**, evoking a sense of heritage and security. **Signal Red** is reserved strictly for high-priority actions (e.g., "Pay Now," "Reject") and critical alerts. 

- **Primary (#1A3C6E):** Used for headers, primary buttons, and active navigation states.
- **Secondary/Critical (#E31B23):** Used for urgent CTAs and error states.
- **Success (#008248):** Used for transaction confirmations and positive growth indicators.
- **Surface:** A crisp white (#FFFFFF) background to maintain maximum contrast.
- **Muted Surface:** A light grey (#F3F4F6) for grouping related content and sectioning long forms.

## Typography

**Inter** is selected for its exceptional legibility at small sizes and high x-height, which is critical for complex financial data. 

- **Hierarchy:** Use bold weights for account balances and transaction titles.
- **Accessibility:** Ensure a minimum body size of 16px for transactional details to accommodate varied visual abilities. 
- **Vernacular Support:** Line heights are slightly increased (1.5x) to prevent clipping when rendering character-heavy scripts like Devanagari or Tamil.

## Layout & Spacing

The layout utilizes a **Fluid Grid** system that prioritizes vertical scanning. 

- **Mobile:** 4-column grid with 16px side margins. Elements are typically full-width or half-width.
- **Tablet/Desktop:** 12-column grid with 32px side margins.
- **Touch Targets:** All interactive elements maintain a minimum 48x48px hit area.
- **Information Density:** Use 8px (stack-sm) for grouping related labels and inputs; use 24px (stack-lg) to separate distinct functional blocks like "Account Summary" and "Recent Transactions."

## Elevation & Depth

To maintain a "trust-focused" aesthetic, elevation is used sparingly to define functional zones rather than for decoration.

- **Level 0 (Base):** Used for the main background.
- **Level 1 (Cards):** Low-contrast outlines (1px border #E5E7EB) with a subtle ambient shadow (4px blur, 2% opacity) to lift cards off the background.
- **Level 2 (Active/Modals):** More pronounced shadows (12px blur, 8% opacity) to draw focus to transaction confirmations or bottom sheets.
- **Tonal Layers:** High-priority summary boxes use a light primary tint (#F0F4F8) instead of shadow to denote importance.

## Shapes

The shape language is structured and "Soft-Geometric." 

- **Primary Radius:** 8px (0.5rem) for cards and input fields.
- **Large Radius:** 16px (1rem) for major containers and bottom sheets.
- **Button Radius:** 8px for a professional, stable look. Avoid pill-shapes as they appear too casual for corporate banking.

## Components

### Buttons
- **Primary:** Solid #1A3C6E with White text. Bold weight.
- **Critical:** Solid #E31B23 for irrevocable actions.
- **Secondary:** White background with #1A3C6E border and text.

### Cards
- Banking cards use a 1px #E5E7EB border. Account numbers should be displayed in a "Mono-style" variant of Inter for clear digit distinction.

### Input Fields
- Filled style with a light grey background (#F9FAFB) and a bottom-border that thickens to 2px Primary Blue on focus. Labels are always visible above the field (never floating).

### Lists
- High-density rows with 16px vertical padding. Use "chevron-right" icons for navigable items. Transaction lists must include a clear "Date | Status | Amount" hierarchy.

### Status Chips
- Rounded containers with low-saturation backgrounds (e.g., Light Green for "Success") and high-saturation text to ensure WCAG AA compliance.

### Bottom Sheets
- Used for all selection menus and vernacular language switching to keep actions within the natural thumb-zone of the mobile device.