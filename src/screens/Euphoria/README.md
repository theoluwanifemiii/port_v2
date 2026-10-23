# Euphoria digital menu

QR table menu for Euphoria (Old Ikoyi), served at `/euphoria`.

| Route | Who | What |
| --- | --- | --- |
| `/euphoria?table=7` | Guests | Landing page from table 7's QR code |
| `/euphoria/food`, `/euphoria/drinks` | Guests | Menus and ordering |
| `/euphoria/business-lunch`, `/euphoria/brunch` | Guests | Set menus |
| `/euphoria/review` | Guests | Leave a review |
| `/euphoria/staff` | Servers | Floor calls tablet (staff PIN) |
| `/euphoria/dashboard` | Management | Guest reviews (staff PIN) |
| `/euphoria/screens` | Design review | Every flow, step by step, with sample data |

## Backend

Orders and reviews live in the site's Convex deployment (`convex/euphoria.ts`,
logic shared with the browser in `convex/euphoriaLogic.ts`):

- A guest's order is stored per table. Calling the server, or asking for the
  bill, puts the table on the staff tablet straight away, and the server's
  confirmation shows on the guest's phone.
- Reviews from the menu appear on the dashboard. A rating of 3 or less with a
  phone number or email is flagged "Priority: call back requested".
- The staff tablet and dashboard need the staff PIN, because reviews hold
  guests' contact details.

### Going live

1. Deploy the functions: `npx convex deploy`
2. Set the staff PIN: `npx convex env set EUPHORIA_STAFF_KEY <pin> --prod`
3. The frontend finds Convex through `VITE_CONVEX_SITE_URL` (already set for
   the contact form). `VITE_CONVEX_URL` overrides it if needed.
4. Give each table its own QR code: `https://olusworks.xyz/euphoria?table=<n>`.
   Without `?table=`, orders go to table 12.

Until step 1 is done, the menu runs on its own: the order stays in the
guest's browser and the prototype plays the server's part, and the staff
screens show sample data.

### Not connected yet

- Google Maps reviews (needs the Google Business Profile API).
- Per-server sign-in: everyone on staff shares one PIN.
