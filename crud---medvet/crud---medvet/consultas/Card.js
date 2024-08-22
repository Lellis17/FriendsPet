import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function Card({dataConsulta, descricao, historico, nomePet, especie, valor, onDelete, onEdit, foto }) {
  return (
    <View style={styles.view}>
      <Image style={styles.image} source={{ uri: foto }} />
      <View style={styles.viewText}>
        
        <Text style={styles.text}>{dataConsulta}</Text>
        <Text style={styles.text}>{descricao}</Text>
        <Text style={styles.text}>{historico}</Text>
        <Text style={styles.text}>{nomePet}</Text>
        <Text style={styles.text}>{especie}</Text>
        <Text style={styles.text}>{valor}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <FontAwesome name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <FontAwesome name="remove" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 60,
    borderRadius: 8,
  },
  viewText: {
    flex: 1,
    paddingLeft: 10,
  },
  text: {
    fontFamily: 'Roboto', 
    fontSize: 12,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginHorizontal: 5,
  },
});
