# CivicAI Global Pay

First picture is the logo, sceond and third are prototypes of the app 100% and not inpirational but the app istelf.

Build a production-quality fintech mobile/web application called “CivicAI” that reproduces the attached prototype images as accurately as technically possible.

IMPORTANT:

The two attached prototype images are the SINGLE SOURCE OF TRUTH for the visual design. Do NOT redesign, reinterpret, simplify, modernize, or invent a different UI. Reproduce the screens, spacing, proportions, typography, colors, icons, cards, navigation, Arabic RTL layout, English LTR layout, shadows, borders, buttons, illustrations, and overall visual hierarchy shown in the prototypes.

The application is an international payment infrastructure platform for Mauritanian banks.

==================================================

1. BRAND / VISUAL IDENTITY

==================================================

App name: CivicAI

Tagline: “pay from your bank, anywhere”

Use the CivicAI logo shown in the prototype:

- Classical bank/financial institution icon

- Blue/white color palette

- Three connected nodes above the building

- Blue orbital/swoosh around the building

- “CivicAI” wordmark

- Clean premium banking aesthetic

Primary visual style:

- Premium banking/fintech

- White backgrounds

- Deep navy blue

- Bright royal/modern blue accents

- Very subtle gray backgrounds

- Rounded cards

- Soft shadows

- Thin borders

- Large clean typography

- Generous spacing

- Professional and trustworthy

- Do NOT introduce gradients, colors, fonts, components, or visual styles that aren't consistent with the prototype.

The result must look like the same product shown in the screenshots.

==================================================

2. RESPONSIVE DESIGN

==================================================

The application must be mobile-first.

Primary target:

- iPhone-sized mobile screens matching the prototype.

Also support:

- Android phones

- Tablets

- Desktop browsers

On mobile, reproduce the exact phone-app composition shown in the prototype.

Do NOT simply stretch the mobile UI onto desktop.

Create responsive layouts while preserving the prototype's visual proportions and hierarchy.

==================================================

3. LANGUAGE SYSTEM

==================================================

Support:

- Arabic

- English

- French

Arabic must use a true RTL interface.

English and French must use LTR.

The language selector must actually change:

- Text

- Direction

- Navigation

- Forms

- Buttons

- Labels

- Error messages

- Notifications

- All UI content

The Arabic screens shown in the prototype should be reproduced closely.

==================================================

4. PRE-LOGIN EXPERIENCE

==================================================

Create the onboarding experience shown in the second prototype image.

Screen 1:

CivicAI splash screen.

Show:

- CivicAI logo

- “pay from your bank, anywhere”

- Global/digital financial visual

- “INTERNATIONAL PAYMENT INFRASTRUCTURE FOR MAURITANIAN BANKS”

Screen 2:

Onboarding card:

“ادفع عالميًا”

Explain that users can make secure international payments directly from their Mauritanian bank account.

Screen 3:

Onboarding card:

“بطاقات افتراضية”

Explain secure virtual cards for internet payments.

Screen 4:

Onboarding card:

“مدعوم من البنوك الموريتانية”

Explain that CivicAI is designed around Mauritanian banking infrastructure.

Each onboarding page must contain:

- Illustration

- Title

- Description

- Pagination indicator

- Next button

The final onboarding screen must contain:

“ابدأ الآن”

The layout, spacing, illustrations, typography and button positions should closely match the prototype.

==================================================

5. LOGIN / AUTHENTICATION

==================================================

Create the login screen shown in the prototype.

Include:

- CivicAI logo

- Welcome message

- Login button

- Create new account button

- Alternative authentication options:

  - Google

  - Apple

  - Email

- Language selector

- Terms and privacy text

Login should support:

- Phone number

- OTP verification

OTP screen:

- Phone number display

- 6-digit OTP input

- Countdown timer

- Resend OTP option

- Verification state

- Error state

- Loading state

Use Mauritanian phone format:

+222 XX XX XX XX

Do NOT make authentication fake in the final architecture. Build proper authentication infrastructure with secure session handling.

==================================================

6. MAIN HOME DASHBOARD

==================================================

Reproduce the main CivicAI dashboard from the first prototype image.

Top:

- CivicAI logo

- Notification bell

- User/account area

Main balance card:

“Total Balance”

Example:

15,450.00 MRU

Secondary conversion:

≈ 389.23 USD

Include subtle world-map financial background exactly in the same visual spirit as the prototype.

Main quick actions:

- Send

- Pay

- Top Up

- History

Quick Pay section:

- International

- Merchants

- Subscriptions

- Donations

Recent Transactions:

Show transaction rows similar to prototype:

- Netflix

- Amazon.com

- Apple Store

- Top Up

Each transaction must contain:

- Merchant/service logo

- Name

- Transaction type

- Date/time

- Amount

- Positive/negative indicator

- Currency

==================================================

7. BOTTOM NAVIGATION

==================================================

Reproduce the prototype bottom navigation.

Tabs:

- Home

- Cards

- Scan

- Recipients

- Profile

The center Scan button must be visually emphasized exactly like the prototype.

Navigation must actually work.

Active/inactive states must match the prototype.

==================================================

8. SEND MONEY

==================================================

Create the Send Money screen shown in the prototype.

Header:

- Back button

- “Send Money”

Amount card:

“You send”

Example:

5,000.00 MRU

Currency selector:

MRU

Show:

Available Balance: 15,450.00 MRU

Recipient receives section:

Example:

126.50 USD

Currency selector:

USD

Show exchange rate.

Show:

- Exchange rate

- Transaction fee

- Total

Recipient selector:

- Avatar

- Recipient name

- Email/identifier

- Arrow

Purpose selector:

Example:

Invoice Payment

Bottom:

“Review & Confirm”

Create the complete flow:

Send

→ Review

→ Confirm

→ Authentication/OTP

→ Processing

→ Success/Failure

→ Transaction receipt

Do not actually transfer real money unless a legitimate payment/banking API has been connected.

==================================================

9. CARDS

==================================================

Create the “My Cards” screen shown in the prototype.

Header:

“My Cards”

- Back

- Add card button

Virtual card:

“CivicAI Virtual Card”

Display:

- Masked card number

- VISA branding

- Expiration date

- Available balance

Card controls:

- Freeze

- Details

- Limits

Information panel:

“Use your card worldwide”

Explain that the virtual card can be used for:

- International websites

- Subscriptions

- Services

Implement:

- Create virtual card

- Freeze/unfreeze

- View details

- Spending limits

- Transaction history

- Card status

For security, NEVER expose real card numbers, CVV, banking credentials, or secrets in frontend code.

==================================================

10. TOP UP

==================================================

Create a Top Up flow.

Users can select:

- Bank account

- Supported Mauritanian bank

- Mobile wallet

- Other supported funding source

Enter amount:

MRU

Show:

- Current balance

- Top-up amount

- Fees if applicable

- New balance

Confirmation:

- Review

- Confirm

- OTP/security verification

- Success receipt

==================================================

11. PAY / MERCHANT PAYMENTS

==================================================

Create the Pay section.

Support:

- Merchant payments

- International payments

- Subscriptions

- Donations

Create a QR scanner/payment interface accessible from the Scan button.

Users can:

- Scan QR

- Review merchant

- Enter amount

- Select currency

- Confirm payment

- Authenticate

- Receive receipt

==================================================

12. RECIPIENTS

==================================================

Create a Recipients section.

Users can:

- Add recipient

- Search recipients

- Edit recipient

- Delete recipient

- View recipient transaction history

Recipient information should include:

- Name

- Email/phone

- Country

- Currency

- Payment details

==================================================

13. TRANSACTION HISTORY

==================================================

Create a complete transaction history screen.

Filters:

- All

- Payments

- Transfers

- Top Ups

- Cards

- Subscriptions

Search transactions.

Each transaction opens a detailed receipt.

Receipt must show:

- Transaction ID

- Date

- Time

- Sender

- Recipient/merchant

- Amount

- Currency

- Exchange rate

- Fee

- Status

- Payment method

Statuses:

- Completed

- Pending

- Failed

- Cancelled

==================================================

14. SUBSCRIPTIONS

==================================================

Create subscription management.

Users can see:

- Netflix

- Spotify

- Amazon

- Apple

- Microsoft

- Other merchants

Allow:

- View subscription

- Amount

- Billing frequency

- Next payment

- Pause/cancel where supported

- Transaction history

==================================================

15. PROFILE / SETTINGS

==================================================

Create:

- Personal information

- Phone number

- Email

- Language

- Security

- Notifications

- Privacy

- Connected banks

- Payment methods

- Spending limits

- Help/support

- Terms

- Privacy policy

- Logout

Security:

- Change PIN

- Biometric authentication where supported

- OTP

- Active sessions

- Device management

==================================================

16. NOTIFICATIONS

==================================================

Create notification center.

Notifications for:

- Successful payment

- Failed payment

- Incoming transfer

- Top up

- Card payment

- Subscription payment

- Security alerts

Unread notifications must show a badge.

==================================================

17. BANK INTEGRATION ARCHITECTURE

==================================================

Architect the application so real Mauritanian banks can be connected later.

Create a secure backend/API architecture with:

- Users

- Bank accounts

- Bank connections

- Transactions

- Recipients

- Cards

- Payments

- Top ups

- Notifications

- Exchange rates

- Audit logs

Do NOT pretend that the app is connected to banks if no real banking API exists.

Use mock/sandbox providers during development.

Create clear service interfaces so real licensed banking/payment providers can later replace the mock services without rebuilding the UI.

==================================================

18. DATABASE

==================================================

Use a proper relational database.

Create tables/models for:

users

profiles

bank_accounts

bank_connections

transactions

transaction_items

recipients

cards

card_transactions

merchants

subscriptions

notifications

otp_sessions

payment_methods

exchange_rates

audit_logs

Use proper relationships, indexes and constraints.

Never store plaintext passwords, OTPs, CVVs, private keys or sensitive banking credentials.

==================================================

19. SECURITY

==================================================

Treat this as a fintech application.

Implement:

- Secure authentication

- Authorization

- Session expiration

- OTP verification

- Rate limiting

- Input validation

- Server-side validation

- Secure API endpoints

- Audit logging

- Encryption where appropriate

- Secure secret management

- Protection against CSRF/XSS/SQL injection

- No sensitive credentials in frontend code

- No API secrets committed to Git

Money calculations must happen server-side.

Never trust amounts sent from the client.

==================================================

20. CURRENCY

==================================================

Primary currency:

MRU — Mauritanian Ouguiya

Support international currencies such as:

USD

EUR

GBP

Exchange rates must come from a configurable backend provider.

Clearly distinguish:

- Exchange rate

- Transaction fee

- Total charged

- Recipient amount

Never hard-code fake exchange rates in production.

==================================================

21. ERROR / LOADING / EMPTY STATES

==================================================

Every feature needs:

- Loading state

- Empty state

- Error state

- Success state

- Offline/network error state

Make these states visually consistent with the prototype.

==================================================

22. ANIMATIONS

==================================================

Use subtle professional animations only.

Examples:

- Screen transitions

- Button feedback

- Card transitions

- Loading indicators

- Modal animations

- OTP verification feedback

Do NOT use excessive animations.

==================================================

23. EXACT PROTOTYPE REQUIREMENT

==================================================

THIS IS EXTREMELY IMPORTANT:

Compare the implementation against the attached prototype images continuously.

The final UI should match:

- Screen structure

- Component placement

- Widths

- Heights

- Margins

- Padding

- Border radius

- Shadows

- Font hierarchy

- Icon sizes

- Button sizes

- Colors

- Navigation

- Card proportions

- RTL alignment

- Illustration placement

Do NOT replace prototype elements with generic UI components.

If a prototype element is visually unusual, reproduce it rather than “fixing” it.

Do not add unnecessary sections.

Do not change the CivicAI branding.

Do not invent a different dashboard.

Do not create a generic banking template.

The prototype is the design specification.

==================================================

24. IMPLEMENTATION QUALITY

==================================================

Build this as a real application, not a static mockup.

Every visible button should either:

- Navigate somewhere

- Open a modal

- Submit a form

- Start a real implemented flow

- Clearly indicate that a backend integration is required

No dead buttons.

No fake navigation.

No placeholder “coming soon” screens unless the feature genuinely requires an external banking/payment provider.

Use reusable components and clean architecture.

Make the project maintainable and production-ready.

Before finishing:

1. Test every route.

2. Test authentication.

3. Test RTL/LTR.

4. Test mobile responsiveness.

5. Test forms and validation.

6. Test navigation.

7. Test transaction calculations.

8. Test card states.

9. Test error states.

10. Compare every implemented screen against the attached prototype images.

If something differs visually from the prototype, fix it before considering the task complete.

FINAL GOAL:

When I open the application, it should feel like I am using the exact CivicAI product shown in the attached prototype images—not an interpretation of it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/55442ade-04b2-490f-ba9f-13a8bffb10c5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
