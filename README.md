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
  - [ ] Adjust fram so on Markeplace screen footer can be full width
  - [ ] Create custom select
  - [ ] Create custom arrow with css
- [x] Impersonation action
- [x] Create Dashboard
- [x] Get Dashboard data from data base
  - [x] Display Player's Inventory (Items and quantity)
  - [x] Display Player's Gold
  - [ ] Enhance Dashboard styling
- [x] Create modal UI
  - [x] Calculate total
  - [ ] Enhance modal styling
- [x] Post offer
- [x] Get Offers for the first item on list
- [x] Make click on item change offers
- [x] Make click on item change offer creation
- [ ] Make Search work

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
