# u07-individuell-uppgift-JobChaser

JobChaser är byggt med Next.js och React och hämtar jobbdata från [Remotive](https://remotive.com) API:et. Huvudfunktionaliteten i appen är jobblistan som visar jobben från API:et, samt sök och filtreringsfunktionen.

[Deployment på Vercel]() →  
[Teoretiska frågor](Teoretiska-fragor.md) →  
[Projektanalys (VG)](Projektanalys.md) →  

## Använda bibliotek och resurser
- [React 19](https://react.dev) med TypeScript
- [Next.js](https://nextjs.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [TailwindCSS 3.4](https://v3.tailwindcss.com)
- [HeroUI](https://www.heroui.com): Komponentbibliotek.
- [react-hook-form](https://react-hook-form.com): Hantering av formulär.
- [framer-motion](https://github.com/motiondivision/motion): Animationer och transitions.
- [DOMPurify](https://github.com/cure53/DOMPurify): Se till att HTML-innehåll från tredjeparts API inte är skadlig.
- [date-fns](https://date-fns.org): Formatering av datum och tid.
- [Iconify/React](https://iconify.design/docs/icon-components/react/): Används för att hämta och använda ikoner.
- [next-themes](https://github.com/pacocoursey/next-themes): Förbättrad integration mellan Next.js och TailwindCSS för att hantera teman.
- [react-spinners](https://github.com/davidhu2000/react-spinners): Animerad loader som visas medan API-data hämtas.