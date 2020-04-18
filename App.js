import React from 'react';
import {
  View,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import LoadingScreen from './LoadingScreen'
import {Header,Text,CheckBox,Slider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {updateStateObject} from './updateobject'
 
import FormInfos from './FormInfos'
import CardInfos from './CardInfos'
import QRCodeCard from './QRCodeCard'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export const ColorsContext = React.createContext({
    main: '#27ae60',
    second:'#f1c40f',
    red:'#e74c3c',
    info:'#3b5998',
    white:"#fff",
    darken:'#2c3e50',  
    gray:'#95a5a6'});

import Logo from './LogoRF.png'


const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
    
  function MainTabScreen(){
    const colors=React.useContext(ColorsContext)
    return( 
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color,size}) => {
          let iconName;
          switch(route.name){
            case 'Home':
              iconName = 'qrcode';
              break;
            case 'Mes Infos':  
              iconName = 'user';  
              break;
            default:
              iconName = 'radiation-alt';
              break;
          }
          return <Icon name={iconName} size={size} color={color}/>;
        },
      })}

      tabBarOptions={{
        activeTintColor: colors.main,
        inactiveTintColor: colors.gray,
        labelStyle:{fontSize:13},
      }}
      initialRouteName='Home'
    >
      <Tab.Screen name="Mes Infos" component={CardInfos}/>
      <Tab.Screen name="Home" component={Homescreen} options={{title:'QRcode'}}/>

    </Tab.Navigator>
    )
  }

export const FormContext= React.createContext(null)
  const App =()=>{

    const [isLoading, setIsLoading] = React.useState(true);
    const [form, setForm] =  React.useState();

    React.useEffect(() => {
      AsyncStorage.getItem('@form').then((value)=>{
        console.log('App mounted')       
        console.log(value)       
        let form;
        if(value==null){
          form={Nom:'',Prenom:'',Ddn:new Date(),Ldn:'',Adr:'',CP:'',Ville:''}
        }else{
          form=JSON.parse(value)
          form.Ddn=new Date(Date.parse(form.Ddn))
          console.log(form)
        }
        setForm({...form})
        setTimeout(()=>setIsLoading(false), 500);      
      }).catch(e=>console.log(e))
      
    },[]);
      if(isLoading){
        return(
<LoadingScreen />
        )
        }else{
          return(
            <FormContext.Provider value={{form,setForm}}>
              <NavigationContainer>
              <RootStack.Navigator mode="modal">
              <RootStack.Screen name="Main" component={MainTabScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="QRCodeModal" component={QRCodeCard} options={{title:'Mon attestation'}}/>
              <RootStack.Screen name="FormModal" component={FormInfos} options={{title:'Modifier mes informations'}}/>
              </RootStack.Navigator>
              </NavigationContainer>
            </FormContext.Provider>
            )
        }

}

const Homescreen=({ route, navigation }) => {
  const colors=React.useContext(ColorsContext)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [reasons, setReasons] =  React.useState({0:{name:'travail',ischecked:false},
                                                 1:{name:'courses',ischecked:false},
                                                 2:{name:'sante',ischecked:false},
                                                 3:{name:'famille',ischecked:false},
                                                 4:{name:'sport',ischecked:false},
                                                 5:{name:'judiciaire',ischecked:false},
                                                 6:{name:'missions',ischecked:false}});
  const [Lag, setLag]=React.useState(20)
  const [RefreshDate, setRefreshDate]=React.useState(true)
  
  const handleCheck = (event,id) => {     
      var re=updateStateObject(reasons[id],'ischecked', !reasons[id].ischecked)
      setReasons(prev => ({...prev,[id]:re}));
  }
 const HandleGenerate=()=>{
   let now;
   if(RefreshDate){
    /* Enregistrement */
    AsyncStorage.setItem('@QrCodeDate',JSON.stringify(new Date().toJSON()))
                .then(()=>{AsyncStorage.getItem('@QrCodeDate')
                            .then(now=>{
                              
                              console.log(now)
                              navigation.navigate('QRCodeModal',{reasons,Lag,now})
                            })})
                
  }else{
    AsyncStorage.getItem('@QrCodeDate').then(now=>{
      console.log(now)
      navigation.navigate('QRCodeModal',{reasons,Lag,now})
    })
  } 

    /* AsyncStorage.getItem('@QrCodeDate').then((value)=>{
      if(value==null){
        AsyncStorage.setItem('@QrCodeDate',JSON.stringify(Date.now().toJSON())).then((value)=>{
          
        })        
      }else{
        console.log('Not nullrr')
        navigation.navigate('QRCodeModal',{reasons,Lag,now:Date.parse(JSON.parse(value))})
      }
    })
   }else{
    navigation.navigate('QRCodeModal',{reasons,Lag,now:new Date()})
    */  
 }

  return (
    <SafeAreaView style={{flex:1}}>
      <Header statusBarProps={{ backgroundColor: colors.main }}
              centerComponent={{ text: 'CoronApp', style: {fontSize:25, color: '#fff' } }}
              containerStyle={{backgroundColor: colors.main,flex:0.1}} />
        
        <View style={{flex:0.9}}>
          <View style={{justifyContent:'space-around',alignItems:"center",flex:0.4}}>
            <Icon.Button name='qrcode' backgroundColor={colors.info} size={30} borderRadius={10}
                        onPress={HandleGenerate}>
                <Text style={{color:colors.white,fontSize:20}}>Générer mon attestation</Text>
            </Icon.Button>    

              <Slider value={Lag} maximumValue={60} minimumValue={0} step={1} 
                      onValueChange={value =>setLag(value)} 
                      thumbTintColor={colors.main}
                      thumbTouchSize={{width:windowWidth,height:windowHeight/3}}
                      thumbStyle={{width:25,height:25,borderWidth:2,borderColor:"#000"}}
                      style={{ width:windowWidth/1.5}} />
                      
              <Text>Je suis sorti, il y a {Lag} minutes</Text>
              <CheckBox title='Rafraichir le QRCode' containerStyle={{backgroundColor:'transparent'}}
          textStyle={{fontSize:15}} 
          checkedIcon='check-square-o' checkedColor={colors.red}
          uncheckedIcon='square-o'uncheckedColor={colors.gray}
          checked={RefreshDate} onPress={() => setRefreshDate(!RefreshDate)} />
          </View>

          <ScrollView style={{flex:0.6}}>
        {
          Object.values(reasons).map((reason,idx)=>
          <CheckBox key={idx} title={reason.name}
          containerStyle={{backgroundColor:'transparent'}}
          textStyle={{fontSize:15}} center
          checkedIcon='check-square-o' checkedColor={colors.main}
          uncheckedIcon='square-o'uncheckedColor={colors.gray}
          checked={reason.ischecked} onPress={(event) => handleCheck(event, idx)} />
          )} 
          <View style={{alignItems:'center'}}> 
        <Image source={Logo} style={{width: windowWidth/5, height: windowWidth/5, resizeMode: 'contain'}}/>
          </View>
      </ScrollView>
      </View>    
    </SafeAreaView>
  ); 
  };
export default App;