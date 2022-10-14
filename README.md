# NeoScan Raids

![Screenshot_2](https://user-images.githubusercontent.com/16579699/193919010-d25b5fa7-638f-4430-a6f4-cd9fd78f9011.jpg)

Projeto em desenvolvimento para o NeoScan, que permitirá que os jogadores de Pokemon Go possam agendar RAIDS nas cidades onde tem a cobertura do serviço.
<br>
Deploy:<br>
https://neoscan-raids.vercel.app/

O projeto em seu estado atual (beta) utiliza:
- framework NextJs para o front-end e endpoints. 
- utiliza SSR (server side rendering) para carregar as listas assim que o usuário abre o site
- utiliza SWR para atualizar as listas a cada 3 minutos autoticamente
- ORM prisma para fazer leitura e gravação no banco de dados
- faz a consulta em um banco de dados MYSQL em meu servidor próprio hospeado em uma VPS
- TailwindCSS para estilização e animação


## Objetivos do projeto

- [x] Listar ovos a eclodir
- [x] Listar raids ativas
- [x] Permitir ao usuário agendar uma partida através dos ovos a abrir
- [x] Permitir ao usuário agendar uma partida através das raids ativas
- [x] Permitir ao usuário participar de uma partida já agendada
- [x] Responsividade  
- [ ] Implantar sistema de web-push-notifications 
- [ ] Permitir ao usuário ativar as notificações para partidas agendadas
- [ ] Permitir ao usuário chamar ajuda enviando uma notificação aos usuários do site
- [ ] Implantar sistema de compartilhamento de raid agendada


