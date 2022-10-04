## Instalar google fonts
expo install expo-font @expo-google-fonts/inter
```
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
```

## Instalar react-native-safe-area-context
expo install react-native-safe-area-context


## Instalar gradient
expo install expo-linear-gradient

## Instalar React Navigation
expo install @react-navigation/native

expo install react-native-screens

yarn add @react-navigation/native-stack


# Phosphor Icons

yarn add phosphor-react-native


# SVG
expo install react-native-svg


## Copiar para a clipboard

expo install expo-clipboard

## Notificações

expo install expo-notifications

https://docs.expo.dev/push-notifications/sending-notifications/
https://expo.dev/notifications



## Login social com Discord

expo install expo-auth-session expo-random

import * as Auth from 'expo-auth-session'


### Criar app no discord
https://discord.com/developers/applications/1023226815478779997/oauth2/general

Oauth 
Redirects
http://auth.expo.io/@lucianoneo/mobile


### Adicionar schema ao app.json para realizar redirecionamento
"scheme": "mobile",


### URL GENERATOR 
selecionar identity , escolher a url criada e copiar a url para adicionar em :
trocando CODE por TOKEN


```
async function handleDiscordSignIn() {
    await Auth.startAsync({
      authUrl: 'https://discord.com/api/oauth2/authorize?client_id=1023226815478779997&redirect_uri=http%3A%2F%2Fauth.expo.io%2F%40lucianoneo%2Fmobile&response_type=token&scope=identify'
    })
  }
