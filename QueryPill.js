import React from 'react'
import { Text, View } from 'react-native'
import { LIGHT_GREY, WHITE } from './resources/colours';

const buttonStyle = {
  borderRadius: 5,
  backgroundColor: 'rgb(180,50,50)',
  marginTop: 5,
  marginBottom: 10,
  marginRight: 5,
  marginLeft: 5,
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 5,
  paddingRight: 5,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
}

const QueryPill = (props) => {
  const { name, imagePath } = props
  console.log(`Name: ${name}`);
  let title = name;
  let year;
  if (name?.contains('(')) {
    [title, year] = name.split('(');
    year = year?.split(')')[0];
  }
  

  return (
    <View style={buttonStyle}>
      <Text style={{color: WHITE, fontSize: 14, fontWeight: 'bold'}}>{title}</Text>
      {!!year && <Text style={{color: LIGHT_GREY, fontSize: 12}}>{year}</Text>}
    </View>
  )
}

export default QueryPill
