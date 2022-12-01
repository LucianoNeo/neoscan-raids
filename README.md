# NeoScan Raids

![Screenshot_2](https://user-images.githubusercontent.com/16579699/193919010-d25b5fa7-638f-4430-a6f4-cd9fd78f9011.jpg)

Projeto em desenvolvimento para o NeoScan, que permitirá que os jogadores de Pokemon Go possam agendar RAIDS nas cidades onde tem a cobertura do serviço.
<br>
Deploy:<br>
https://neoscan-raids.vercel.app/


# Funcionamento

## O que são RAIDS no Pokémon GO?
Rais são eventos que ocorrem entre as 6 da mnhã até as 21h em ginásios (pontos de interesse espalhados pela cidade), onde surgem ovos de chefões (pokémon com um poder de combate superior aos encontrados na natureza).<br>
Os ovos eclodem geralmente em 1 hora e a raid fica disponível para ser realizada durante 45 minutos.
As raids em seu estado atual possuem 9 níveis de dificuldade, quanto maior o nível, mais pessoas são necessárias para derrotar o chefe, sendo possível juntar até 20 pessoas para realizá-las.

## Para que serve o NeoScan Raids?
O NeoScan Raids proporciona ao jogador saber em qual ginásio estão aparecendo os OVOS e as RAIDS já abertas, possibilitando ao usuário, ao clicar no banner do ovo ou da raid, abrir um formulário para fazer agendamento de uma partida. Assim o NeoScan Raids mostra na seção de RAIDS ABERTAS a Raid marcada, qual usuário marcou, seu nível, sua equipe, o local e o horário de início. <br>
Da mesma forma, outros usuários poderão clicar no banner desta raid agendada, e confirmar sua presença preenchendo o formulário que se abrirá. <br>


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
- [x] Implantar sistema de web-push-notifications 
- [x] Permitir ao usuário ativar as notificações para partidas agendadas
- [ ] Permitir ao usuário chamar ajuda enviando uma notificação aos usuários do site
- [ ] Implantar sistema de compartilhamento de raid agendada


