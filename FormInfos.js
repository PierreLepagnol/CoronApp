import React from 'react'
import { View,
         KeyboardAvoidingView,
        SafeAreaView} from 'react-native'

import {Header, Text,Input,CheckBox,Button,Overlay} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ColorsContext} from './App'

import {FormContext} from './App'

import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';

const FormInfos = () => {
    const colors = React.useContext(ColorsContext);
    const [show, setShow] = React.useState(false);
    const {form,setForm}=React.useContext(FormContext)
    const [date, setDate] = React.useState(new Date());
    const inputs=[
        {type:'input',placeholder:'Nom',icon:{name:'user',size:15},field:'Nom'},
    
        {type:'input',placeholder:'Prénom',icon:{name:'user',size:15},field:'Prenom'},
          
        {type:'btn',placeholder:'Date de Naissance',icon:{name:'birthday-cake',size:15},field:'Ddn'},
    
        {type:'input',placeholder:'Lieu de naissance',icon:{name:'hospital',size:15},field:'Ldn'},
        
        {type:'input',placeholder:'Adresse',icon:{name:'home',size:15},field:'Adr'},
    
        {type:'input',placeholder:'Code Postal',icon:{name:'home',size:15},field:'CP'},
    
        {type:'input',placeholder:'Ville',icon:{name:'home',size:15},field:'Ville'},
    
      ]
      const storeData = async (key,value) => {
        try {
          await AsyncStorage.setItem(key,value)
        } catch (e) {
          // saving error
        }
      }
      const removeValue = async () => {
          try {
            setForm({Nom:'',Prenom:'',Ddn:new Date(),Ldn:'',Adr:'',CP:'',Ville:''})
          await AsyncStorage.removeItem('@form')
        } catch(e) {
          // remove error
        }
        console.log('Done.')
      }

  const handleChange = (e,field) => {
    let value;  
    switch(field){
          case 'Ddn':
              value =new Date(e.nativeEvent.timestamp) ||form.Ddn;
              setShow(false)
          break;
            default:
                value =e.nativeEvent.text
                break;
      }
    
    setForm( prevState => ({
        ...prevState,
        [field] : value
    }))}

    return (
        <>
        <SafeAreaView>
                {/* FORMULAIRE */}
            <KeyboardAvoidingView behavior='height'>
            {
                inputs.map((obj,idx)=> (obj.type=='input'&&<Input name={obj.field} key={idx} placeholder={obj.placeholder} 
                leftIcon={<Icon name={obj.icon.name} size={15} color='#95a5a6'/>}
                onChange={(event)=>handleChange(event,obj.field)} value={obj.val}/>) ||
                (obj.type=='btn' && <Button key={idx} type='clear' onPress={()=>setShow(!show)}
                title={obj.placeholder} titleStyle={{color:'#fff'}}
                containerStyle={{margin:20,backgroundColor:colors.main}}/>))
            }
            </KeyboardAvoidingView>
            {/* Listes des Boutons */}
            <View style={{justifyContent:'center',padding:10}}>
                <Button type='clear' title='Enregistrer Mes Données' titleStyle={{color:'#fff'}} containerStyle={{backgroundColor:colors.main}}
                onPress={()=>storeData('@form',JSON.stringify(form))} />
                <Button type='clear' title='Supprimer Mes Données' titleStyle={{color:'#fff',}} containerStyle={{backgroundColor:colors.red}}
                onPress={()=>removeValue()} />
            </View>
    {show && (<DateTimePicker timeZoneOffsetInMinutes={0}
          value={new Date(form.Ddn)} mode='date' color={colors.main} is24Hour={true}
          display="default" onChange={(event)=>handleChange(event,'Ddn')} />)}
          </SafeAreaView>
    </>
    )
}

export default FormInfos;
