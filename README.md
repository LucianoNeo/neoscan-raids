# NeoScan Raids

![Screenshot_2](https://user-images.githubusercontent.com/16579699/193919010-d25b5fa7-638f-4430-a6f4-cd9fd78f9011.jpg)

Projeto em desenvolvimento para o NeoScan, que permitirá que os jogadores de Pokemon Go possam agendar RAIDS nas cidades onde tem a cobertura do serviço.
<br>
Deploy:<br>
https://neoscan-raids.vercel.app/


# Funcionamento

## O que são RAIDS no Pokémon GO?
Raids são eventos que ocorrem entre as 6 da manhã até as 21h em ginásios (pontos de interesse espalhados pela cidade), onde surgem ovos de chefões (pokémon com um poder de combate superior aos encontrados na natureza).<br>
Os ovos eclodem geralmente em 1 hora e a raid fica disponível para ser realizada durante 45 minutos.
As raids em seu estado atual possuem 9 níveis de dificuldade, quanto maior o nível, mais pessoas são necessárias para derrotar o chefe, sendo possível juntar até 20 pessoas para realizá-las.

## Para que serve o NeoScan Raids?
O NeoScan Raids proporciona ao jogador saber em qual ginásio estão aparecendo os OVOS e as RAIDS já abertas, podendo filtra-las por nome do ginásio, level e nome do pokémon.<br>
![Screenshot_1](https://user-images.githubusercontent.com/16579699/205057409-bb1b8cf0-7304-4b38-8496-4760a9b9bb6a.png)
![Screenshot_2](https://user-images.githubusercontent.com/16579699/205057422-f3f7ffe2-f10f-4bbb-b47c-6305b475da09.png)

Possibilitando ao usuário, ao clicar no banner do ovo ou da raid, abrir um formulário para fazer agendamento de uma partida.

| OVO | RAID |
|----------|----------|
| ![Screenshot_3](https://user-images.githubusercontent.com/16579699/205057494-9d518706-2ecf-4af9-94bd-052efb236b42.png) |  ![Screenshot_4](https://user-images.githubusercontent.com/16579699/205057512-c5386a9c-9829-4524-a5ad-604b227612c2.png)





Assim o NeoScan Raids mostra na seção de PARTIDAS AGENDADAS a Raid marcada, qual usuário marcou, seu nível, sua equipe, o local e o horário de início.

![Screenshot_5](https://user-images.githubusercontent.com/16579699/205058899-b2086489-0bbd-4c6a-bab1-f64eb5176f70.png)

Da mesma forma que ocorre o agendamento, outros usuários poderão clicar no banner desta raid agendada, e confirmar sua presença preenchendo o formulário que se abrirá. Possibilitando assim a organização das partidas em um local centralizado na web, além de oferecer a opção ao usuário de receber notificações push toda vez que uma nova partida for agendada.<br>

![Screenshot_6](https://user-images.githubusercontent.com/16579699/205057609-cffbc0d6-5a4f-465d-9685-ac93477707d0.png)

# Detalhes técnicos
O projeto em seu estado atual (beta) utiliza:
- framework NextJs para o front-end e endpoints. 
- utiliza SSR (server side rendering) para carregar as listas assim que o usuário abre o site
- utiliza SWR para atualizar as listas a cada 3 minutos autoticamente
- ORM prisma para fazer leitura e gravação no banco de dados utilizado para gravar as partidas e usuários.
- faz a consulta das raids e ovos em um banco de dados MYSQL proveniente do NEOSCAN
- TailwindCSS para estilização e animação
- Utiliza o serviço ONESIGNAL para notificações push


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


