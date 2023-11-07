import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function ListatarefasAsyncStorage({ navigation, route }) {

  const [tarefas, settarefas] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [tarefaASerExcluida, settarefaASerExcluida] = useState(null)


  useEffect(() => {
    loadtarefas()
  }, [])

  async function loadtarefas() {
    const response = await AsyncStorage.getItem('tarefas')
    console.log("🚀 ~ file: ListatarefasAsyncStorage.js:21 ~ loadtarefas ~ response:", response)
    const tarefasStorage = response ? JSON.parse(response) : []
    settarefas(tarefasStorage)
  }



  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionartarefa(tarefa) {
    let novaListatarefas = tarefas
    novaListatarefas.push(tarefa)
    await AsyncStorage.setItem('tarefas', JSON.stringify(novaListatarefas));
    settarefas(novaListatarefas)
  }

  async function editartarefa(tarefaAntiga, novosDados) {
    console.log('tarefa ANTIGA -> ', tarefaAntiga)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListatarefas = tarefas.map(tarefa => {
      if (tarefa == tarefaAntiga) {
        return novosDados
      } else {
        return tarefa
      }
    })

    await AsyncStorage.setItem('tarefas', JSON.stringify(novaListatarefas))
    settarefas(novaListatarefas)

  }

  async function excluirtarefa(tarefa) {
    const novaListatarefas = tarefas.filter(p => p !== tarefa)
    await AsyncStorage.setItem('tarefas', JSON.stringify(novaListatarefas))
    settarefas(novaListatarefas)
    Toast.show({
      type: 'success',
      text1: 'tarefa excluida com sucesso!'
    })
  }

  function handleExluirtarefa() {
    excluirtarefa(tarefaASerExcluida)
    settarefaASerExcluida(null)
    hideModal()
  }


  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Tarefas</Text>

      <FlatList
        style={styles.list}
        data={tarefas}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.nome}</Text>
                <Text variant='bodyLarge'>Descrição: {item?.idade}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormtarefaAsyncStorage', { acao: editartarefa, tarefa: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                settarefaASerExcluida(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormtarefaAsyncStorage', { acao: adicionartarefa })}
      />


      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirtarefa}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    margin: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})