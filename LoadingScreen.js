import React from 'react'
import { View,ActivityIndicator} from 'react-native'
import {Text} from 'react-native-elements'
const LoadingScreen = () => {
    return (
        <>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{alignItems:'center'}}>
            <Text h1 style={{color:colors.main}}>CoronApp</Text>
            <Text>L'attesation instantanée</Text>
            </View>
            <ActivityIndicator size="large" color={colors.main} style={{marginTop:50}}/>
        </View>
        </>
    )
}

const colors={
    main: '#27ae60'
  }
export default LoadingScreen;
