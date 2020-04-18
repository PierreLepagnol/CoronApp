import React from 'react'
import { View,SafeAreaView} from 'react-native'
import {Header, Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';

import {ColorsContext} from './App'
import {FormContext} from './App'

const CardInfos = ({route, navigation}) => {
    const colors = React.useContext(ColorsContext);
    const {form,setForm}=React.useContext(FormContext)
    const styleTxt={fontSize:17,color:colors.info,padding:10}
    return (
        <SafeAreaView style={{flex:1}}>            
            <Header statusBarProps={{ backgroundColor: colors.main }}
            centerComponent={{ text: 'Mes informations', style: {fontSize:25, color: '#fff' } }}
            containerStyle={{backgroundColor: colors.main }}/>   
            
            {(form.Nom!='' && 
            Object.keys(form).map((key,index)=>{
                if(typeof(form[key])!=typeof(new Date)){
                    return <Text style={styleTxt}key={index}>{form[key]}</Text>}
                    else{return <Text style={styleTxt} key={index}>{form[key].toLocaleDateString('fr-FR')}</Text>}})
                    )||
                    <Text style={{...styleTxt,color:colors.gray}}>Vous n'avez enregistré aucun profile.</Text>
                }
            <View style={{alignItems:'center',justifyContent:'center',margin:10}}> 
                <Icon.Button name='qrcode' backgroundColor={colors.second} size={20}  onPress={() => navigation.navigate('FormModal')}>
                    <Text style={{color:'#fff',fontSize:20}}>Modifier mes Informations</Text>
                </Icon.Button>    
            </View>
        </SafeAreaView>
    )
}

export default CardInfos;