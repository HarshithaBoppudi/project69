import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import * as  Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
  constructor(){
      super()
      this.state={
        hasCamaraPermissions:null,
        scanned:false,
        scannedData:'',
        
        button:'normal'
  
      }
  }
  getCamaraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    //status === "granted" is true when user has granted permission status === "granted" is 
    //false when user has not granted the permission
    this.setState({
      hasCamaraPermissions:status==='granted',
      button:'clicled',
      scanned:false,
      
    })
  }
  handleBarCodeScanner=async({type,data})=>{
    const button=this.state.button
    if(button==='clicked'){

    
this.setState({
  scannedData:data,
  scanned:true,
  button:'normal'
})}
}

render(){
    const hasCamaraPermissions=this.state.hasCamaraPermissions
    const scanned=this.state.scanned
    const button=this.state.button
    if(button==='clicked'){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
        />
      )
    }
    else if(button==='normal'){
      return(
        <View style={styles.container}>
          <Image
          source={require('../assets/scan.jpg')}
          style={{width:200,height:200}}
          
          />
  
          
          
           <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCamaraPermissions()}}>
            <Text>Scan The QR Code</Text>
  
          </TouchableOpacity>
         
          </View>
         
  
        
      )
    }
   
  }




}
const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
})