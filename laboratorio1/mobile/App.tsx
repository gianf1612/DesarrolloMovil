import { StyleSheet, Text, View ,Button, FlatList, TextInput} from 'react-native';
import { router } from 'expo-router';

export default function Page(){
  return(
    <View>
      <TextInput>hueea</TextInput>
      <Button title='gasaso' onPress={()=>router.push("")}></Button>
    </View>
  )
}