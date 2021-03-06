import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './src/navigation';
import store from './src/Components/modules/redux/store';

registerScreens(store, Provider);

class AppContainer {
  registerScreen(root) {
    if(root){
      Navigation.startSingleScreenApp({
        screen:{
          screen : 'Home',  
          title:'Albums',
        }, 
        drawer: {
          left:{
            screen : 'Drawer' 
          } 
        }
      })
  
    }else {
      Navigation.startSingleScreenApp({
        screen:{
          screen : 'SignIn',
          title:'SignIn',
          navigatorStyle:{
            navBarHidden: true
          },
        }
      })
    }
  }

  onStoreUpdate() {
    const a = store.getState();
    if (this.root !== a.checkLogin.isLoggedIn) {
      this.root = a.checkLogin.isLoggedIn;
      this.registerScreen(this.root);
    }
  }

	constructor() {
    const state = store.getState();
    this.root = state.checkLogin.isLoggedIn;
    this.registerScreen(this.root)
    store.subscribe(this.onStoreUpdate.bind(this));
	}
}

export default AppContainer;
