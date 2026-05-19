Build a clean, minimal mobile food delivery app called CampusEats.
It serves University of Lagos students — campus restaurants, 
student riders, under 20-minute delivery.

The vibe: simple, warm, confident. Like Chowdeck but lighter and 
friendlier. Every screen should feel easy to use at a glance.

━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━

Colors (use sparingly — white does most of the work):
  Brand navy:   #001f3f  → top bars, logo, headings only
  Action red:   #C1121F  → ONE primary button per screen, nothing else
  Food orange:  #FF7A00  → prices, category pills, small accents only
  Background:   #FFFFFF  → screens are mostly white
  Surface:      #F5F5F5  → card backgrounds, input fields
  Text:         #1A1A1A  → headings
  Subtext:      #888888  → captions, labels

Typography (Inter font):
  Screen title:  24px bold
  Section label: 16px semibold  
  Body:          14px regular
  Caption:       12px regular, #888888

Spacing: generous. 20px screen padding. 16px between cards.
Cards: white, 12px border radius, very soft shadow.
Buttons: 52px height, 8px radius, full width on key actions.
Mobile width: 390px.

━━━━━━━━━━━━━━━━━━━━━━━
SCREENS
━━━━━━━━━━━━━━━━━━━━━━━

SCREEN 1 — SPLASH
White background. Center of screen: small orange fork+pin logo, 
then "CampusEats" in navy bold (28px), then "Unilag's fastest 
food delivery" in grey (14px). 

Bottom of screen: red "Get Started" button, then "Log in" 
plain text link below it in navy. That's it. Nothing else.

---

SCREEN 2 — SIGN UP  
White. Back arrow top left.

Top: "Create account" (24px bold navy), "Quick and easy" (grey subtext).

Inputs (grey surface #F5F5F5 background, no borders):
  Full name
  Unilag email
  Password  
  Matric number (label says "Optional")

Red "Create Account" button at bottom.
"Already have an account? Log in" grey link below button.

---

SCREEN 3 — LOGIN
White. Logo small top center.
"Welcome back" title. Email + password inputs same style as signup.
"Forgot password?" right-aligned small link.
Red "Log In" button.
Thin grey divider with "or" then "Continue with Google" 
white button with grey border below.

---

SCREEN 4 — HOME
Top bar: white background, left side shows small pin icon + 
"Unilag, Yaba" (navy, 14px semibold). Right side: cart icon 
with a small red badge dot.

Search bar below: grey pill input, 
"Search jollof, shawarma..." placeholder, search icon left.

Category pills (horizontal scroll, no scrollbar visible):
All · Rice · Shawarma · Snacks · Drinks · Swallow · Pastries
Pills: white background, grey border when inactive. 
Orange background, white text when active.

Hero banner: soft orange gradient card (not loud), 
text: "🔥 Delivered in 20 mins" left side, 
small food illustration right side.

Section: "Restaurants" — horizontal scroll.
Each restaurant card:
  Rounded photo (full card width, 140px tall)
  Restaurant name bold below (e.g. Mavise Grill)
  Grey caption: "⭐ 4.8 · 12–18 min · ₦400 delivery"
  
Section: "Popular right now" — vertical list.
Each item: square 64px food photo left, name + restaurant name 
middle, orange price right, small orange "+" circle button right.

Bottom nav bar: white, thin top border.
Icons: Home, Search, Orders, Profile.
Active icon fills navy, inactive icons grey.

---

SCREEN 5 — RESTAURANT
No top bar. Full bleed food photo (220px tall).
White back arrow button floating top left over the photo.
White share icon top right.

White sheet slides up over photo bottom portion.
Restaurant name: 22px bold navy.
Row below: ⭐ 4.8 (12 reviews) · Open now · 12–18 min · ₦400 delivery
All in grey 13px. Clean, one line.

Thin divider. Menu list below — items grouped by category label 
(grey caps "RICE DISHES", "DRINKS" etc).

Each menu item:
  64px square food photo, rounded corners, left
  Item name 15px semibold middle
  Short description 12px grey below name
  Orange price bottom left of text
  Orange "+" button right side

Sticky button at bottom: red "View Cart (3 items) — ₦2,800"

---

SCREEN 6 — CART
White screen. "My Order" title top left. 
Small grey "Clear all" link top right.

Cart items — clean rows:
  64px photo | name + quantity stepper (–  2  +) | price
  Light grey divider between items.
  Trash icon far right each row.

Grey surface card below list:
  Label: "Deliver to"
  Dropdown selector showing: "Eni-Jokun Hostel" 
  (options include all Unilag hostels + major faculty buildings)

Order summary card (grey surface):
  Subtotal      ₦2,400
  Delivery fee   ₦400
  ─────────────────────
  Total         ₦2,800  (navy bold, slightly larger)

Red "Proceed to Pay — ₦2,800" button bottom.

---

SCREEN 7 — PAYMENT
"Checkout" title. Back arrow.

Payment method — 3 option cards, stacked:
  Each card: white, grey border, radio button left, 
  icon + label right.
  Options: 💳 Pay with Card  |  🏦 Bank Transfer  |  👛 Wallet
  Selected card gets navy border + navy radio fill.

Promo code row: grey input + orange "Apply" link right.

Total card (grey surface): shows final amount bold.

Red "Pay ₦2,800" button.
"🔒 Secured by Paystack" in small grey text below. Nothing else.

---

SCREEN 8 — ORDER TRACKING
Navy top bar. White "← Back" left. "Order #1042" center white text.

Progress bar — 4 steps, horizontal:
  Order Confirmed ✓ → Being Prepared ✓ → Rider on the way 🔄 → Delivered
  Completed steps: navy filled circle. Current step: orange pulsing dot.
  Connector lines between steps.

Large grey rounded rectangle below (map placeholder).
Subtle campus map illustration inside it or just a clean grey tile.

White card sliding up from bottom:
  "Arriving in ~8 mins" — large, navy bold, centered.
  
  Thin divider then rider row:
    Round avatar | "Emeka · ⭐ 4.9" | 📞 Call  💬 Chat
    Call + Chat as small outlined grey buttons.

---

SCREEN 9 — ORDER SUCCESS
White screen, centered layout.
Large orange checkmark circle (64px).
"Order placed! 🎉" — 22px bold navy, centered.
"Emeka will pick up your food in ~5 mins" — grey subtext.

Order summary pill: grey surface, shows restaurant + total.

Two buttons stacked:
  Red "Track my order"
  White with grey border "Back to Home"

---

SCREEN 10 — PROFILE
White. No top nav bar — just "Profile" title 24px bold, top left.

User avatar circle (64px, initials fallback), name bold, 
Unilag email grey below. Edit icon beside name.

Menu list — clean rows with right chevron (›):
  📦  My Orders
  📍  Saved Addresses
  💳  Payment Methods
  🎓  Student Verification
  ⚙️  Settings
  ❓  Help & Support

Thin grey divider then:
  Red text "Log out" — no icon, just text link.

━━━━━━━━━━━━━━━━━━━━━━━
FINAL RULES
━━━━━━━━━━━━━━━━━━━━━━━

- Maximum 1 red button per screen
- Orange only on prices, active pills, "+" buttons — never backgrounds
- No gradients except the one hero banner
- No decorative illustrations beyond that banner
- All currency in ₦ Naira
- Nigerian food names: Jollof rice, Eba & Egusi, Shawarma, 
  Puff Puff, Zobo, Suya, Moi Moi, Indomie special
- If unsure between simpler and more complex — always go simpler