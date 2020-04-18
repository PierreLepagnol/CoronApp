import React from 'react'
import {View,Text,Dimensions,Image} from 'react-native'

import QRCode from 'react-native-qrcode-svg';
import {ColorsContext} from './App'

import Logo from './LogoRF.png'

import {FormContext} from './App'

const QRCodeCard = ({route,navigation}) => {
  const colors=React.useContext(ColorsContext)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {form}=React.useContext(FormContext)
  const {reasons,Lag}=route.params
  const getMyDate=(datum)=>{
    const date=new Date('datum')
    const res={
      year:date.getFullYear(),
      month:("0" + (date.getMonth() + 1)).slice(-2),
      day:("0" + date.getDate()).slice(-2),
      hours:date.getHours(),
      minutes:date.getMinutes()
    }
    return res;
  } 
    const generateDataStr=(infos,reasons,lag_mins,DateStop)=>{
    const lag_mins_ms=1000*60*lag_mins
    const vingt_mins_ms=1000*60*20
    const now = Date.now()
    const creaDate=getMyDate(new Date(now -lag_mins_ms))
    
    var SHour=getMyDate(new Date(now-vingt_mins_ms))
  
    const Adresse =infos.Adr 
    const zipcode = infos.CP
    const town =infos.Ville
  
    Object.filter = (obj, predicate) => Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
  
    var motifs = Object.filter(reasons, reas => reas.ischecked==true); 
    motifs=Object.values(motifs).map(elem=>elem.name).join(', ')
    const Ddn=getMyDate(infos.Ddn)  
    
    const data = [
      `Cree le: ${[creaDate.day,creaDate.month,creaDate.year].join('/')} a ${[creaDate.hours,creaDate.minutes].join('h')}`,
      `Nom: ${infos.Nom}`,
      `Prenom: ${infos.Prenom}`,
      `Naissance: ${[Ddn.day,Ddn.month,Ddn.year].join('/')} a ${infos.Ldn}`,
      `Adresse: ${Adresse} ${zipcode} ${town}`,
      `Sortie: ${[SHour.day,SHour.month,SHour.year].join('/')} a ${[SHour.hours,SHour.minutes].join('h')}`,
      `Motifs: ${motifs}`,
    ].join('; ')
    return data
  }
  return (
      /* <Text>This is a fake but no problem police will \nnot gt the difference !\nk And Now you are free to live your life</Text> */
      <View style={{alignItems:'center',justifyContent:'space-evenly',flex:1,padding:10}}>
      <QRCode size={windowWidth/1.1} value={generateDataStr(form,reasons,Lag)} backgroundColor='transparent'/>
      <View style={{alignItems:'center'}}>
      <Text>Provided by</Text>
      <Image source={Logo} style={{
        width: windowWidth/3,
        height: windowWidth/3,
        resizeMode: 'contain',}}/>
        </View>
      </View>
    )
};

export default QRCodeCard;
