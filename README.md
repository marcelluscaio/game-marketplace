Tasks

- [x] Clean Next.js's default setup
- [x] Change favicon
- [x] Create ESLint and Pretier configuration
- [x] Configure Docker and PostgreSQL
- [x] Configure Prisma
- [x] Create models
- [x] Seeds
- [x] Get players from DataBase
  - [ ] Error handling
  - [ ] Unit test
- [x] Add CSS reset
- [x] Set colors and fonts
- [x] Create impersonation page UI
  - [ ] Create custom select
  - [ ] Create custom arrow with css
- [x] Impersonation action
- [x] Create Dashboard
- [x] Get Dashboard data from data base
  - [x] Player's Players Inventory (Items and quantity)
  - [x] Player's Gold
  - [ ] Get Offers for the first item on list
- [ ] Make click on item change offers
- [ ] Make Search work
- [ ] Create modal UI
- [ ] Post offer

## How to run

- npm install
- docker compose up -d
- npx prisma db push
- npx prisma migrate reset
- npm run dev

## Notes

- Offer total value will be a calculated field https://www.prisma.io/docs/orm/prisma-client/queries/computed-fields
- Unit tests https://nextjs.org/docs/app/building-your-application/testing/jest
- E2E tests https://nextjs.org/docs/app/building-your-application/testing/playwright

Pasta em src

Components (View)
Libs (Dayjs, outras bibliotecas)
Helpers (Funcoes muito utilizadas)
Model (schemas do zod e seus tipos exportados)

Sugerir seta do select a direita
https://ux.stackexchange.com/questions/17347/ok-for-dropdown-button-to-be-on-the-left

Construir select
https://blog.logrocket.com/creating-custom-select-dropdown-css/

Usar o Schema PLayers para fazer parse

Adicionar pagina de erro caso navegue para alguma pagina que nao existe

Adicionar validacao com react hook form e zod em impersonation

Id do jogador deve ser uuid

Fazer button polimorfico que possa ser Link tmbm

Next com Prisma
https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
