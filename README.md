# Game MarketPlace

## <a id="english">Table of Contents</a>

- [About the Project](#about)
- [Running the Project](#run)
- [Features](#highlights)
- [Future Improvements](#future)

## <a id="about">About the Project</a>

This project creates a fullstack MarketPlace application using Next.js as the framework. As a database I chose PostgreSQL, and Prisma served as the ORM.

By using Next.js, I took advantage of built-in support for CSS modules, enabling a robust foundation for building a responsive and dynamic application.

### Technologies Used:

- **Frontend:** React, Next.js, CSS Modules
- **Backend:** Node.js, Next.js
- **Database:** PostgreSQL, Docker
- **ORM:** Prisma
- **Other libraries:** React-hook-form, Zod, Dayjs

## <a id="run">Running the project</a>

Copy the content from env.example to a .env file and add your configuration.

On your terminal run

- npm run prisma:initial-setup
- npm run dev

## <a id="added">Features</a>

### Requirements

- User can impersonate players
- User can view existing offers
- User can view existing items
- User can filter items with search box
- User can change offers displayed by clicking on items
- User can place offers
- App stores persistent data
- Fully responsible
- Error handling - even though there is room for improvements
- Validation: Total price must be less than total gold
- Success message on offer creation
  **Would add more, stoped for lack of time**

### Extras

- Custom favicon
- ESLint and Prettier config
- Added empty state for offer tables
- Items are sorted

## <a id="future">Future improvements</a>

### Future

- [ ] Project architecture
  - [x] Delete View folder. Screens are components. There are components living inside of them. If they are shared, they are sent to the root of components (inside global folder)
  - [ ] Schemas are my model (Prisma is also the model)
  - [ ] Services - This one references the database and calls the database methods, applying business logic. This avoids creating things on the database that break business logic
  - [ ] Controllers (Actions) - This one gets data from a request, and calls a service. It also deals with the response and sends to the client. In the controller the type is unknown (because we never know what is coming from a request, right? So we need to make the assertions)
- [ ] Organize imports
- [ ] Add mask to input to avoid '01'
- [ ] Just add the error markup if there is error
- [ ] Integration between React hook form and buy/sell form
- [ ] Gold update when setting buy
- [ ] Create custom select
- [ ] Create custom arrow with css
- [ ] Inside components There will be global and each screen. If a component owns another one, it will be nested. Folder structure will follow page structure

- [ ] Change Switch player place to top
- [ ] Calibrate font size
- [ ] Add suspense to fetched data
- [ ] Add error boundary
- [ ] Enhance Error handling
- [ ] Tab navigation
- [ ] Hover and focus state
- [ ] Unit tests
- [ ] E2E tests
- [ ] Improve some CSS units that are not bound with the theme
- [ ] When a Buy Offer is made, the offers total value is commited to the offer and deducted from the user’s inventory
- [ ] When a Sell Offer is made, the offer’s bundle is commited to the offer and removed from the user’s inventory.
- [ ] The offer’s total price cannot exceed the player’s gold, and if it does, there must be some kind of visual feedback and the user must not be able to create the offer.
- [ ] The offer’s total price must be deducted from the player’s gold.
- [ ] There must be some kind of visual feedback while the offer is being created.

## File structure

- The app folder is used mainly for routing
- ....
