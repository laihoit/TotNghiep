import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/navigation';

registerScreens();
class AppContainer {
  registerScreen() {
      Navigation.startSingleScreenApp({
        screen:{
          screen : 'Home',
          title:'Home',
        }
      })
  }
	constructor() {
    this.registerScreen()
	}
}

export default AppContainer;