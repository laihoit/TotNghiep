import { Navigation } from 'react-native-navigation';

import Home from '../component/Home';
import Person from '../component/Person';
import Map from '../component/Map'


export function registerScreens(){

    Navigation.registerComponent('Home', () => Home);

     Navigation.registerComponent('Person', ()=> Person);
     Navigation.registerComponent('Map',()=> Map);

}