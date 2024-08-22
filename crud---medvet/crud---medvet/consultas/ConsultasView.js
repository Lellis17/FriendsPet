import { View, Text, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Card } from './Card';
import { useState, useEffect } from 'react';
import { Button, PaperProvider, Portal, Dialog, TextInput } from 'react-native-paper';
import { findAll, remove, insert, update } from './ConsultasApi';

export function ConsultasView({ navigation }) {
  const [Consultass, setConsultas] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [dataConsulta, setDataConsulta] = useState('');
  const [descricao, setDescricao] = useState('');
  const [historico, setHistorico] = useState('');
  const [valor, setValor] = useState('');
  const [nomePet, setNomePet] = useState('');
  const [especie, setEspecie] = useState('');

  useEffect(() => {
    findConsultas();
  }, []);

  const findConsultas = async () => {
    const x = await findAll();
    console.log('Retorno da API:', JSON.stringify(x));
    setConsultas(x);
  };

  const onDelete = async (id) => {
    console.log('Excluindo o consulta: ');
    const consultaOld = await remove(id);
    alert(`Consulta ${consultaOld.nome} excluída com sucesso!`);
    await findConsultas();
  };

  const onEdit = async (id) => {
    const consulta = Consultass.find(consulta => consulta.id === id);
    setDataConsulta(consulta.dataConsulta);
    setDescricao(consulta.descricao);
    setHistorico(consulta.historico);
    setNomePet(consulta.nomePet);
    setEspecie(consulta.especie);
    setValor(consulta.valor.toString());
    setEditId(id);
    setIsEditing(true);
    setShowDialog(true);
  };

  const salvar = async () => {
    console.log(isEditing ? 'Editando consulta...' : 'Cadastrando consulta...');

    try {
      const valorconvertido = parseFloat(valor);
      
      if (isEditing) {
        await update(editId, dataConsulta, descricao, historico, nomePet, especie, valorconvertido);
        alert('Consulta editada com sucesso!');
      } else {
        const novaConsulta = await insert(dataConsulta, descricao, historico, nomePet, especie, valorconvertido);
        alert('Consulta cadastrada com sucesso!');
        setConsultas([...Consultass, novaConsulta]);
      }

      setShowDialog(false);
      setDataConsulta('');
      setDescricao('');
      setNomePet('');
      setEspecie('');
      setValor('');
      setHistorico('');
      setIsEditing(false);
      setEditId(null);
      await findConsultas();

    } catch(err) {
      console.log('Falha ao cadastrar/editar consulta', err.message);
      alert('Falha ao cadastrar/editar a consulta. Tente novamente em alguns minutos.');
    }

  };

  return (
    <Container>
      <PaperProvider>
        <View style={styles.container}>
          <Image 
            source={require('../assets/logovet.png')} 
            style={styles.image}
          />
          <FlatList 
            data={Consultass}
            renderItem={({ item }) => 
              <TouchableOpacity onPress={() => navigation.navigate('Consultar', item)}>
                <Card {...item} onDelete={() => onDelete(item.id)} onEdit={() => onEdit(item.id)} />
              </TouchableOpacity>
            }
            keyExtractor={item => item.id}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={findConsultas} style={styles.button}>
              CONSULTAR
            </Button>
            <Button mode="contained" onPress={() => setShowDialog(true)} style={styles.button}>
              ADICIONAR CONSULTA
            </Button>
          </View>
        </View>
        <Portal>
          <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
            <Dialog.Title>{isEditing ? 'Editar Consulta' : 'Adicionar Consulta'}</Dialog.Title>
            <Dialog.Content>
              <TextInput 
                mode='flat' 
                label='DataConsulta' 
                value={dataConsulta}
                onChangeText={(text) => setDataConsulta(text)} 
              />
              <TextInput 
                mode='flat' 
                label='Descrição' 
                value={descricao}
                onChangeText={(text) => setDescricao(text)} 
              />
              <TextInput 
                mode='flat' 
                label='Historico' 
                value={historico}
                onChangeText={(text) => setHistorico(text)} 
              />
              <TextInput 
                mode='flat' 
                label='NomePet' 
                value={nomePet}
                onChangeText={(text) => setNomePet(text)} 
              />
              <TextInput 
                mode='flat' 
                label='Especie' 
                value={especie}
                onChangeText={(text) => setEspecie(text)} 
              />
              <TextInput 
                mode='flat' 
                label='Valor' 
                value={valor}
                onChangeText={(text) => setValor(text)} 
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowDialog(false)}>CANCELAR</Button>
              <Button onPress={salvar}>{isEditing ? 'SALVAR ALTERAÇÕES' : 'SALVAR'}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
    </Container>
  );
}

function Container({ children }) {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        {children}
      </KeyboardAvoidingView>
    );
  } else {
    return <>{children}</>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0f0c0', 
    padding: 20,
  },
  image: {
    width: 300, 
    height: 200, 
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#006400', 
    marginVertical: 10,
    borderRadius: 25, 
    width: '85%', 
  },
});