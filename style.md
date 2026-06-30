# BiteSwift Design System — Ember Noir

## Concept
Warm charcoal backgrounds, saffron-amber accent, ivory page surfaces. Inspired by the
glow of a live kitchen at night — premium, warm, appetite-inducing. Unlike any major
food delivery app (Swiggy = orange, Zomato = red, Uber Eats = black/green).

---

## Color Tokens

### Backgrounds
| Token | Hex | Usage |
|---|---|---|
| `--bs-bg` | `#FAF7F2` | Page body background (warm ivory) |
| `--bs-bg-alt` | `#F2EDE5` | Subtle panels, input fills |
| `--bs-card` | `#FFFFFF` | Cards, modals |
| `--bs-border` | `#E8E0D4` | All borders, dividers |

### Dark Surfaces (hero, footer, category strip)
| Token | Hex | Usage |
|---|---|---|
| `--bs-dark-1` | `#0F0D09` | Deepest — footer bg, hero start |
| `--bs-dark-2` | `#1C1810` | Hero mid gradient |
| `--bs-dark-3` | `#2A2115` | Hero end gradient |

### Brand Accent — Saffron Amber
| Token | Hex | Usage |
|---|---|---|
| `--bs-amber` | `#E8930A` | Primary CTA, active states, accent |
| `--bs-amber-dk` | `#C97808` | Hover on amber elements |
| `--bs-amber-lt` | `#FBB95E` | Glow rings, light highlights |
| `--bs-amber-bg` | `rgba(232,147,10,0.08)` | Hover bg on links, chip hover bg |

### Semantic
| Token | Hex | Usage |
|---|---|---|
| `--bs-success` | `#16A34A` | Good rating (≥ 4.3), veg indicator |
| `--bs-warn` | `#D97706` | Medium rating (3.8–4.2) |
| `--bs-danger` | `#DC2626` | Low rating (< 3.8) |

### Text — warm-toned, no cold grays
| Token | Hex | Usage |
|---|---|---|
| `--bs-text-1` | `#1A1610` | Headings, primary body text |
| `--bs-text-2` | `#4A3F35` | Secondary body, descriptions |
| `--bs-text-3` | `#8A7B70` | Captions, muted labels |
| `--bs-text-inv` | `#FFFFFF` | Text on dark surfaces |
| `--bs-text-inv-muted` | `rgba(255,255,255,0.55)` | Muted text on dark surfaces |

---

## Typography
- **Font family:** Poppins (Google Fonts)
- **Heading weight:** 800  
- **Sub-heading weight:** 700  
- **Body weight:** 400–500
- **Letter-spacing on headings:** –0.02 em
- **Line-height body:** 1.65

### Scale (use `clamp()` for fluid sizes)
| Role | Size |
|---|---|
| Hero headline | `clamp(2.4rem, 6vw, 4rem)` |
| Section heading | `1.35rem` |
| Card name | `0.98rem` |
| Body | `1rem` |
| Caption / meta | `0.78–0.82rem` |
| Label / chip | `0.72–0.82rem` |

---

## Spacing & Radius
- **Navbar height:** 64px
- **Page max-width:** 1200px
- **Section padding:** 24px horizontal, 48–60px vertical
- **Card radius:** 16px
- **Button radius (pill):** 99px
- **Button radius (square):** 10–12px
- **Input radius:** 12px
- **Small badge radius:** 6–8px

---

## Shadows
Warm-tinted — use `rgba(26, 22, 16, N)` not cold blue-black.
| Tier | Value |
|---|---|
| Card resting | `0 1px 3px rgba(26,22,16,0.06)` |
| Card hover | `0 16px 40px rgba(26,22,16,0.14)` |
| Navbar | `0 1px 0 rgba(26,22,16,0.08)` |
| Hero search | `0 20px 60px rgba(0,0,0,0.35)` |

---

## Component Patterns

### Buttons
- **Primary (filled):** `--bs-amber` bg, white text, 99px radius, 10px 28px padding
- **Outline:** transparent bg, `--bs-amber` border + text, same radius
- **Hover:** darken to `--bs-amber-dk`, lift `translateY(-1px)`

### Inputs / Search
- Background: `--bs-bg-alt`
- Border: `--bs-border`
- Focus: amber border + `0 0 0 3px rgba(232,147,10,0.15)` ring

### Cards
- Background: `--bs-card` (white)
- Border: 1px `--bs-border`
- Radius: 16px
- Hover: `translateY(-6px)` + warm shadow

### Navbar
- **Transparent** (home page top): no bg, white text, over dark hero
- **Solid** (scrolled / other pages): `rgba(250,247,242,0.97)` + `backdrop-filter:blur(12px)`
- Logo "Bite": white (transparent) / `--bs-text-1` (solid)
- Logo "Swift": always `--bs-amber`
- Active link underline: `--bs-amber`

### Hero gradient
```
linear-gradient(135deg, #0F0D09 0%, #1C1810 55%, #2A2115 100%)
```

### Footer gradient
```
background: #0F0D09
```

---

## Do / Don't

| Do | Don't |
|---|---|
| Use warm `rgba(26,22,16,N)` for shadows | Use cold blue-black `rgba(0,0,0,N)` shadows |
| Use `--bs-amber` for all interactive accents | Mix in red, orange, or green accents |
| Warm gray-browns for muted text (`#8A7B70`) | Cold gray (`#9CA3AF`) on warm surfaces |
| Amber underline for active nav states | Red or white underline on solid navbar |
| `--bs-bg` (#FAF7F2) for page background | Pure white `#FFFFFF` as page background |
| Amber badge, amber cart count | Red cart badge |
