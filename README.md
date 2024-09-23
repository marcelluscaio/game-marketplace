# Game MarketPlace

## <a id="english">Table of Contents</a>

- [About the Project](#about)
- [Running the Project](#run)
- [Features](#highlights)
- [Future Improvements](#future)

## <a id="about">About the Project</a>

This project was developed as part of a technical assessment, with the requirement to create a fullstack MarketPlace application using React and Node. I chose Next.js as the framework. As a database I chose PostgreSQL, and Prisma served as the ORM.

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

- npm install
- docker compose up -d
- npx prisma generate
- npx prisma migrate dev --name init
- npx prisma migrate reset
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

- [ ] Tab navigation
- [ ] Hover and focus state
- [ ] Enhance Error handling
- [ ] Unit tests
- [ ] E2E tests
- [ ] Improve some CSS units that are not bound with the theme
- [ ] Create custom select
- [ ] Create custom arrow with css
- [ ] When a Buy Offer is made, the offers total value is commited to the offer and deducted from the user’s inventory
- [ ] When a Sell Offer is made, the offer’s bundle is commited to the offer and removed from the user’s inventory.
- [ ] The offer’s total price cannot exceed the player’s gold, and if it does, there must be some kind of visual feedback and the user must not be able to create the offer.
- [ ] The offer’s total price must be deducted from the player’s gold.
- [ ] There must be some kind of visual feedback while the offer is being created.

## How to run

- npm install
- docker compose up -d
- npx prisma db push
- npx prisma migrate reset
- npm run dev

## Notes

- Unit tests https://nextjs.org/docs/app/building-your-application/testing/jest
- E2E tests https://nextjs.org/docs/app/building-your-application/testing/playwright

Pastas em src
Components (View)
Libs (Dayjs, outras bibliotecas)
Helpers (Funcoes muito utilizadas)
Model (schemas do zod e seus tipos exportados)

Sugerir seta do select a direita
https://ux.stackexchange.com/questions/17347/ok-for-dropdown-button-to-be-on-the-left

Construir select
https://blog.logrocket.com/creating-custom-select-dropdown-css/

Usar o Schema Players para fazer parse

Adicionar pagina de erro caso navegue para alguma pagina que nao existe

Adicionar validacao com react hook form e zod em impersonation

Fazer button polimorfico que possa ser Link tmbm

Next com Prisma
https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

Lidar com validacao depois

Mobile

Navegacao teclado

Verificar consistencia (imports, uso de function x arrow function, import - function - export)
