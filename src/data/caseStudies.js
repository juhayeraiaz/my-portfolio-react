/**
 * Case studies for the projects served by the portfolio API.
 *
 * Each entry is matched to an API project by its title: a project whose slugified
 * title starts with the case study's `slug` (e.g. "Abdullah Shoe – E-commerce Website"
 * → "abdullah-shoe-…") gets a "Case study" link. Pages render from this file alone,
 * so they load instantly even while the free-tier API is waking up.
 *
 * Facts come from each project's source code, README and brief. No invented metrics.
 */

const GH = 'https://github.com/juhayeraiaz';

export const caseStudies = [
  {
    slug: 'abdullah-shoe',
    title: 'Abdullah Shoe',
    kind: 'WooCommerce store',
    type: 'Client project',
    year: '2026',
    status: 'Live',
    role: 'Developer & copywriter: build, front-end fixes, page design and bilingual content',
    summary:
      'An online shoe store that serves two audiences at once: retail shoppers buying a pair and wholesale buyers buying in bulk, with bilingual storytelling in English and Bangla.',
    image: 'https://i.ibb.co.com/XxXWqS1z/Abdullah-Shoe-E-Commerce-Showcase.png',
    liveUrl: 'https://abdullahshoe.com/',
    codeNote: 'Client website: source not public.',
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'Custom CSS'],
    overview:
      'Abdullah Shoe sells footwear both retail and wholesale. I built and maintain their online store on WordPress and WooCommerce, and wrote much of the copy that tells their story.',
    challenge:
      'One site, two very different visitors. A shopper wants to find a pair fast; a trader wants the wholesale offer and the brand behind it. Both needed a clear path, in the language they are most comfortable reading.',
    approach: [
      'Kept the homepage a fast teaser (the best of each section) with the full story on inner pages, so first impressions stay quick.',
      'Redesigned homepage sections to be more compact, so products show up sooner on every screen size.',
      'Wrote English and Bangla copy for the About Us timeline and the Wholesale & Retail section.',
      'Fixed structural HTML bugs and CSS conflicts with the theme before handover, so every page renders consistently.',
    ],
    features: [
      {
        title: 'Product showcase',
        text: 'A clean, elegant catalogue with organised categories that makes browsing feel effortless.',
      },
      {
        title: 'Wholesale & retail',
        text: 'A dedicated section and Wholesale page that speak directly to bulk buyers.',
      },
      {
        title: 'Brand story timeline',
        text: 'An About Us timeline in English and Bangla that builds trust before the first order.',
      },
      {
        title: 'Responsive storefront',
        text: 'Layouts tuned for phones first, where most shoppers browse.',
      },
    ],
    technical: [
      'WordPress with WooCommerce for products, cart, checkout and orders.',
      'Pages designed in Elementor, including a product grid for the Wholesale page.',
      'Custom CSS to resolve conflicts with the theme’s own rules.',
    ],
    outcome:
      'A responsive store with a clear route for both retail shoppers and wholesale buyers, plus brand content that reads naturally in two languages.',
  },
  {
    slug: 'dioxa-skincare',
    title: 'Dioxa Skincare',
    kind: 'WooCommerce rebuild',
    type: 'Client project',
    year: '2026',
    status: 'In progress: staging preview',
    role: 'Developer: planning, theme setup, catalogue migration and store build',
    summary:
      'A ground-up rebuild of a multi-brand beauty store: 500+ products moved across, shopping by skin type, concern and brand, and every page editable by the client.',
    image: 'https://i.ibb.co.com/gbDBKvHG/Dioxa-Skincare-E-Commerce-Showcase.png',
    liveUrl: 'https://hotpink-goldfinch-786386.hostingersite.com/',
    liveLabel: 'View staging site',
    codeNote: 'Client website: source not public.',
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'Blocksy + child theme', 'Hostinger'],
    overview:
      'Dioxa Skincare sells authentic skincare and beauty products from many brands. I am rebuilding their store from scratch on WooCommerce so shoppers find the right product faster, and the team can edit every page themselves.',
    challenge:
      'The old store held 500+ products that had to move across intact, and its API refused bulk requests. Shoppers also needed better ways to narrow a big catalogue than scrolling page after page.',
    approach: [
      'Built on the Blocksy theme with a custom Dioxa child theme: solid built-in features, fully customisable and safe from parent-theme updates.',
      'Moved the catalogue through the old store’s admin CSV export after its API rate-limited bulk requests.',
      'Designed every page in Elementor (home, shop, category, product, cart, checkout and account) so the client can change them visually.',
      'Kept custom code to a minimum, so the site stays easy to maintain.',
      'Styled the whole store around the brand’s new logo.',
    ],
    features: [
      {
        title: 'Shop by skin',
        text: 'Filter products by skin type and skin concern to get to the right routine in a few taps.',
      },
      {
        title: 'Brand collections',
        text: 'Every brand gets its own collection, so loyal customers go straight to their favourites.',
      },
      {
        title: 'Full catalogue, migrated',
        text: '500+ products carried over from the old store, with categories and brands intact.',
      },
      {
        title: 'Client-editable pages',
        text: 'Every page is built in Elementor, so content updates never wait on a developer.',
      },
    ],
    technical: [
      'WooCommerce on a Blocksy parent theme with a custom child theme.',
      'Catalogue imported from a CSV export of the old store.',
      'Built and reviewed on a Hostinger staging site before launch.',
      'Launch scope includes local payments (SSLCommerz, bKash, Nagad, cash on delivery), Dhaka / outside-Dhaka shipping rates and 301 redirects from old URLs.',
    ],
    outcome:
      'The new store is running on a staging site for client review, with the full catalogue, filtering and brand collections in place ahead of launch.',
  },
  {
    slug: 'bikreta',
    title: 'Bikreta',
    kind: 'Full-stack e-commerce',
    type: 'Personal project',
    year: '2024',
    status: 'Live',
    role: 'Solo developer: UI, front end, REST API, database and deployment',
    summary:
      'A full-stack store for fresh, organic groceries: browsing, cart and card checkout for customers, plus a complete back office for running the shop.',
    image: 'https://i.ibb.co/d7Wrhzt/screencapture-bikretabd-web-app-2024-12-23-17-17-44.jpg',
    liveUrl: 'https://bikretabd.web.app/',
    codeNote: 'Source code is private; happy to walk through it on a call.',
    stack: [
      'React',
      'Tailwind CSS',
      'daisyUI',
      'React Query',
      'Firebase Auth',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe',
      'JWT',
      'Google Tag Manager',
    ],
    overview:
      'Bikreta (Bangla for “seller”) is an online shop for fresh and organic groceries. I built every layer myself: the storefront customers shop in, the dashboard they track orders in and the admin tools the store runs on.',
    challenge:
      'A real shop is more than a product grid. Customers need a checkout they trust, delivery details that are right first time and a clear view of their orders. Behind the scenes, someone has to add stock, ship orders and keep content fresh without touching the database by hand.',
    approach: [
      'Split the work into a React storefront and an Express + MongoDB REST API, so the interface and the data could grow independently.',
      'Used Firebase for sign-in and issued my own JSON Web Token at login, so every private request is verified on the server.',
      'Kept server data in React Query, so lists and dashboards stay in sync after every order, payment or edit.',
      'Created Stripe payment intents on the server, so card details never touch my code.',
    ],
    features: [
      {
        title: 'Shop & cart',
        text: 'Categories, product pages with image galleries and reviews, and a cart that follows customers through the site.',
      },
      {
        title: 'Card checkout',
        text: 'Stripe payments, with each order marked paid and its transaction ID saved once the payment succeeds.',
      },
      {
        title: 'Delivery by district',
        text: 'Customers choose their division and search their district, so addresses arrive clean.',
      },
      {
        title: 'Customer dashboard',
        text: 'Order history, pay-later for unpaid orders, product reviews and a profile page.',
      },
      {
        title: 'Admin back office',
        text: 'Add and remove products, ship orders, manage users and promote admins, all from the dashboard.',
      },
      {
        title: 'Blog with engagement',
        text: 'Articles customers can like and comment on, written and managed from the dashboard.',
      },
    ],
    technical: [
      'REST API over six MongoDB collections: users, products, reviews, orders, payments and articles.',
      'Private routes verify a JSON Web Token, and admin actions pass a second admin check on the server.',
      'Google Tag Manager and Firebase Analytics to understand how people shop.',
      'Front end deployed on Firebase Hosting.',
    ],
    outcome:
      'A working store that covers the full order life cycle (browse, pay, deliver, review) and can be run day to day from the dashboard instead of the database.',
  },
  {
    slug: 'drilled',
    title: 'Drilled',
    kind: 'Full-stack B2B ordering',
    type: 'Personal project',
    year: '2022',
    status: 'Live',
    role: 'Solo developer: front end, REST API, database and deployment',
    summary:
      'An ordering portal for a power-tools manufacturer: buyers order in bulk within minimum and stock limits, pay by card and track delivery; admins run everything from one dashboard.',
    image: 'https://i.ibb.co/dJ72j3w/screencapture-drilled-74880-web-app-2024-12-23-19-24-55.jpg',
    liveUrl: 'https://drilled-74880.web.app/',
    codeUrl: `${GH}/drilled-client`,
    apiUrl: `${GH}/drilled-server`,
    stack: [
      'React',
      'Tailwind CSS',
      'daisyUI',
      'React Query',
      'React Hook Form',
      'Firebase Auth',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe',
      'JWT',
    ],
    overview:
      'Drilled is a manufacturer’s website where business buyers order tools in bulk. It covers the whole flow: catalogue, bulk ordering, card payments, delivery status and an admin back office.',
    challenge:
      'Wholesale ordering has rules retail doesn’t: every product has a minimum order and limited stock. The site had to stop invalid orders before they were placed, take payment safely and give the manufacturer one place to manage it all.',
    approach: [
      'Validated the quantity as the buyer types: the order button stays disabled until it is between the minimum order and the stock available.',
      'Built an Express + MongoDB REST API with collections for users, products, orders, payments and reviews.',
      'Created Stripe payment intents on the server and saved each payment against its order.',
      'Protected private routes with JSON Web Tokens, plus an admin-only check for management actions.',
    ],
    features: [
      {
        title: 'Bulk ordering',
        text: 'Minimum-order and stock limits checked live, so buyers can only place orders the factory can fulfil.',
      },
      {
        title: 'Card payments',
        text: 'Stripe checkout for unpaid orders, straight from the buyer’s dashboard.',
      },
      {
        title: 'Buyer dashboard',
        text: 'Orders, payments, reviews and profile in one place.',
      },
      {
        title: 'Admin dashboard',
        text: 'Add and remove products, manage every order, mark shipments and promote admins.',
      },
      {
        title: 'Social proof',
        text: 'Customer reviews in a swipeable carousel and a business summary on the homepage.',
      },
    ],
    technical: [
      'Forms built with React Hook Form; server data cached and refreshed with React Query.',
      'Stripe Elements on the client, payment intents on the server.',
      'Role-based routes on the client backed by token and admin checks on the API.',
      'Front end deployed on Firebase Hosting.',
    ],
    outcome:
      'A complete B2B order flow from first click to delivery, with the manufacturer’s ordering rules built into the interface.',
  },
  {
    slug: 'razer-house',
    title: 'Razer House',
    kind: 'Inventory management',
    type: 'Personal project',
    year: '2022',
    status: 'Live',
    role: 'Solo developer: front end, REST API and database',
    summary:
      'A warehouse inventory app for a gaming-gear supplier: see stock at a glance, mark deliveries, restock in seconds and keep changes behind a secure login.',
    image: 'https://i.ibb.co/F0rNKd0/screencapture-razer-house-web-app-2024-12-23-19-27-45.jpg',
    liveUrl: 'https://razer-house.web.app/',
    codeUrl: `${GH}/razer-house-client`,
    apiUrl: `${GH}/razer-house-server`,
    stack: ['React', 'React Bootstrap', 'MDB UI Kit', 'React Query', 'Firebase Auth', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    overview:
      'Razer House is an inventory manager for a supplier of gaming chairs and accessories. Staff sign in, see every product in stock and update quantities as goods come in and go out.',
    challenge:
      'Stock numbers are only useful if they are right. Every delivery and restock had to update the database straight away, and only signed-in staff should be able to change anything.',
    approach: [
      'Added a one-click Delivered button that takes a unit off stock, and a Restock form that adds any amount.',
      'Built an Express + MongoDB API for inventory, orders and reviews, issuing a JSON Web Token at login to protect private routes.',
      'Used Firebase sign-in with email or Google, plus email verification and password reset.',
      'Put data fetching in reusable hooks, so every page reads inventory the same way.',
    ],
    features: [
      {
        title: 'Live stock levels',
        text: 'Every item with its supplier, price and current quantity.',
      },
      {
        title: 'Deliver & restock',
        text: 'Update quantities in one click instead of editing records by hand.',
      },
      {
        title: 'Add & manage items',
        text: 'Add new products and remove old ones from a single management table.',
      },
      {
        title: 'Secure access',
        text: 'Email or Google sign-in, verified emails and password reset.',
      },
      {
        title: 'Reviews & location',
        text: 'Customer reviews and an embedded map to find the warehouse.',
      },
    ],
    technical: [
      'Custom React hooks for items, item details and the access token.',
      'Token-protected API routes for private data.',
      'Front end deployed on Firebase Hosting.',
    ],
    outcome:
      'A simple, dependable tool that keeps stock counts accurate and turns daily warehouse updates into one-click actions.',
  },
  {
    slug: 'picsquare',
    title: 'Picsquare',
    kind: 'Portfolio & booking site',
    type: 'Personal project',
    year: '2022',
    status: 'Live',
    role: 'Solo developer: design and front end',
    summary:
      'A portfolio and booking site for a Bangladesh-based photographer: the photos sell, the packages are clear and clients sign in to book.',
    image: 'https://i.ibb.co/RhXVL3W/screencapture-picsquare-2a8c7-web-app-2024-12-23-19-29-55.jpg',
    liveUrl: 'https://picsquare-2a8c7.web.app/',
    codeUrl: `${GH}/Picsquare-react-firebase`,
    stack: ['React', 'React Bootstrap', 'MDB UI Kit', 'React Router', 'Firebase Auth', 'Firebase Hosting'],
    overview:
      'Picsquare is a photographer’s website: a gallery that shows the work, service packages with clear details and a protected checkout, so only signed-in clients can book.',
    challenge:
      'Photographers win clients with visuals, but bookings need to come from real, contactable people. The site had to put the photos first and still know who is booking.',
    approach: [
      'Studied professional photography templates for layout ideas, then built each section as its own component.',
      'Loaded service packages from a data file, so prices and details can change without touching components.',
      'Protected checkout behind a sign-in check, sending visitors back to where they were after logging in.',
      'Offered sign-in with email, Google or GitHub, plus password reset.',
    ],
    features: [
      {
        title: 'Work gallery',
        text: 'A dedicated Works page that lets the photography speak first.',
      },
      {
        title: 'Service packages',
        text: 'Clear packages with their own detail pages, so clients know what they get.',
      },
      {
        title: 'Sign in your way',
        text: 'Email, Google or GitHub accounts, with password reset built in.',
      },
      {
        title: 'Protected checkout',
        text: 'Only signed-in visitors can book, so every enquiry comes with contact details.',
      },
    ],
    technical: [
      'React Router with a reusable route guard for private pages.',
      'Firebase Authentication through react-firebase-hooks.',
      'Deployed on Firebase Hosting.',
    ],
    outcome:
      'A polished, responsive photography site that turns visitors into signed-in, contactable leads.',
  },
  {
    slug: 'rent-a-house',
    title: 'Rent a House',
    kind: 'Property rental listings',
    type: 'Personal project',
    year: '2022',
    status: 'Live',
    role: 'Solo developer: design and front end',
    summary:
      'A rental listings site where renters filter homes by location, price and type, pick a move-in date and book in a couple of taps.',
    image: 'https://i.ibb.co/PQBf52M/screencapture-renta-property-netlify-app-2024-12-23-19-31-52.jpg',
    liveUrl: 'https://renta-property.netlify.app/',
    codeUrl: `${GH}/rent-house`,
    stack: ['React', 'Tailwind CSS', 'daisyUI', 'React Router', 'React Datepicker', 'Firebase Auth', 'Netlify'],
    overview:
      'Rent a House is a property-rental front end. Renters browse listings, narrow them down with filters and book a property after signing in.',
    challenge:
      'House hunting is overwhelming when every listing looks the same. Renters needed to cut the list down fast and see the details that matter (beds, baths, size and price) before committing.',
    approach: [
      'Kept listings in structured data (city, type, price, beds, baths, size), so filters work on real fields, not text.',
      'Built filters for location, price and rent type, plus a date picker for the move-in date.',
      'Added a confirmation step before booking, so nobody books by accident.',
      'Styled mobile-first with Tailwind CSS and daisyUI.',
    ],
    features: [
      {
        title: 'Smart filters',
        text: 'Narrow listings by location, price and rent type.',
      },
      {
        title: 'Move-in date',
        text: 'Pick a date right in the search bar.',
      },
      {
        title: 'Property details',
        text: 'Beds, baths, size and price on a dedicated page for each home.',
      },
      {
        title: 'Book with confidence',
        text: 'Sign in, confirm and book: no accidental clicks.',
      },
    ],
    technical: [
      'Listing data served as JSON, with property photos from Pexels.',
      'Firebase Authentication for sign-up and login.',
      'Deployed on Netlify.',
    ],
    outcome:
      'A fast, mobile-friendly way to go from “show me everything” to the right home and a booking.',
  },
  {
    slug: 'zindagi-trust',
    title: 'Zindagi Trust',
    kind: 'Front-end rebuild',
    type: 'Team project',
    year: '2023',
    status: 'Live',
    role: 'Front-end developer in a team: navigation, banners and content pages',
    summary:
      'A React rebuild of an education non-profit’s website, built as a team. I owned the navigation, hero banners and the news and annual-review pages.',
    image: 'https://i.ibb.co.com/rGQdn0tr/screencapture-zindagitrustclone-netlify-app-2026-01-19-12-04-37.png',
    liveUrl: 'https://zindagitrustclone.netlify.app/',
    codeUrl: `${GH}/zindagi-Trust`,
    note: 'A learning project, not affiliated with Zindagi Trust.',
    stack: ['React', 'React Router', 'Tailwind CSS', 'Material Tailwind', 'Swiper', 'Slick Carousel', 'Netlify'],
    overview:
      'Zindagi Trust is a Pakistani non-profit that works to improve public schools. Our team rebuilt its content-heavy website in React, splitting the work page by page.',
    challenge:
      'Non-profit sites are long, story-driven and full of images, sliders and reports. The rebuild had to match the structure across many pages, stay consistent between several developers and still read well on a phone.',
    approach: [
      'Built from shared components (buttons, banners, breadcrumbs), so pages from different developers look like one site.',
      'Laid out pages with Tailwind CSS and Material Tailwind.',
      'Used Swiper and carousel libraries for the image-led story sections.',
    ],
    features: [
      {
        title: 'Site navigation',
        text: 'The main navbar and headers every page depends on.',
      },
      {
        title: 'Hero banners',
        text: 'Banners and hero sections that set the tone for each part of the site.',
      },
      {
        title: 'News & Events',
        text: 'The News and Events listing and its single-story pages.',
      },
      {
        title: 'Annual reviews',
        text: 'A Review of 2019, 2020 and 2021, the Covid Response page and the Aisa Pakistan page.',
      },
    ],
    technical: [
      'Multi-page structure with React Router.',
      'Shared UI components reused across the team’s pages.',
      'Deployed on Netlify.',
    ],
    outcome:
      'A consistent, responsive multi-page site delivered as a team, with shared components that let everyone’s pages slot together.',
  },
  {
    slug: 'marvel-comic',
    title: 'Marvel Comic',
    kind: 'Front-end rebuild',
    type: 'Personal project',
    year: '2022',
    status: 'Live',
    role: 'Solo developer: front end',
    summary:
      'A React rebuild of a comic-book storefront homepage: bold layouts, swipeable cover rows and working sign-up, built to sharpen layout skills.',
    image: 'https://i.ibb.co/FY1TM3v/screencapture-marvel-comic-64a66-web-app-2024-12-23-19-22-29.jpg',
    liveUrl: 'https://marvel-comic-64a66.web.app/',
    codeUrl: `${GH}/marvel-comic-copy`,
    note: 'A fan-made study project, not affiliated with Marvel.',
    stack: ['React', 'Tailwind CSS', 'daisyUI', 'Swiper', 'Firebase Auth'],
    overview:
      'A study project: rebuild the homepage of Marvel’s comics store in React from scratch, to practise turning a busy commercial design into clean, reusable components.',
    challenge:
      'Media storefronts pack a lot into one screen: hero carousels, rows of covers, promos and updates. Recreating that without a tangle of one-off CSS takes planning.',
    approach: [
      'Broke the page into sections (hero carousel, best sellers, latest updates), each its own component.',
      'Used Tailwind CSS and daisyUI for consistent spacing and responsive breakpoints.',
      'Added Swiper carousels so the cover rows swipe naturally on touch screens.',
      'Wired up Firebase email sign-up and login.',
    ],
    features: [
      {
        title: 'Hero carousel',
        text: 'Full-width featured stories that rotate on the homepage.',
      },
      {
        title: 'Cover rows',
        text: 'Best sellers and new releases in swipeable rows.',
      },
      {
        title: 'Latest updates',
        text: 'A news section that mirrors the original layout.',
      },
      {
        title: 'Accounts',
        text: 'Email sign-up and login with Firebase.',
      },
    ],
    technical: ['Component-per-section structure.', 'Swiper for touch-friendly carousels.', 'Deployed on Firebase Hosting.'],
    outcome:
      'A responsive homepage that holds up from phone to desktop, and a repeatable way to break any complex design into components.',
  },
];

/** "Abdullah Shoe – E-commerce Website" → "abdullah-shoe-e-commerce-website" */
export function slugify(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}

/** The case study for a project from the API, matched on its title. */
export function findCaseStudy(project) {
  const key = slugify(project?.title);
  if (!key) return null;
  return caseStudies.find((study) => key === study.slug || key.startsWith(`${study.slug}-`)) ?? null;
}
