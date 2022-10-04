import { GameController } from 'phosphor-react-native';
import { Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';
import { styles } from './styles';
import * as Auth from 'expo-auth-session'
import { useNavigation } from '@react-navigation/native';

export function SignIn() {

  const navigation = useNavigation()

  type AuthorizationResponse = Auth.AuthSessionResult & {
    params: {
      access_token?: string;
      error?: string;
    }
  }



  async function handleDiscordSignIn() {

    try {
      const { type, params } = await Auth.startAsync({
        authUrl: 'https://discord.com/api/oauth2/authorize?client_id=1023226815478779997&redirect_uri=http%3A%2F%2Fauth.expo.io%2F%40lucianoneo%2Fmobile&response_type=token&scope=identify'
      }) as AuthorizationResponse

      if (type === "success" && !params.error) {
        fetch('https://discord.com/api/users/@me', {
          headers: {
            'authorization': `Bearer ${params.access_token}`
          }
        })
        navigation.navigate('home')
      }

    } catch (error) {
      throw new Error('Não foi possível autenticar');
    }

  }


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={logoImg}
        />
        <Heading
          title='Entrar'
          subtitle='Encontre seu duo!'
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleDiscordSignIn}
        >
          <GameController
            color={THEME.COLORS.TEXT}
            size={20}
          />
          <Text style={styles.buttonTitle}>Entrar com Discord</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </Background>
  );
}