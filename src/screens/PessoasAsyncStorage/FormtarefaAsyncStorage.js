import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function FormtarefaAsyncStorage({ navigation, route }) {

    const { acao, tarefa: tarefaAntiga } = route.params

    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
  

    const [showMensagemErro, setShowMensagemErro] = useState(false)


    useEffect(() => {

        console.log('tarefa -> ', tarefaAntiga)

        if (tarefaAntiga) {
            setNome(tarefaAntiga.nome)
            setIdade(tarefaAntiga.idade)
        }

    }, [])


    function salvar() {

        if (nome === '' || idade === '' ) {
            setShowMensagemErro(true)
        } else {
            setShowMensagemErro(false)

            const novatarefa = {
                nome: nome,
                idade: idade,

            }

            const objetoEmString = JSON.stringify(novatarefa)
            console.log("🚀 ~ file: Formtarefa.js:47 ~ salvar ~ objetoEmString:", objetoEmString)

            console.log(typeof (objetoEmString))

            const objeto = JSON.parse(objetoEmString)
            console.log("🚀 ~ file: Formtarefa.js:52 ~ salvar ~ objeto:", objeto)

            console.log(typeof (objeto))


            if (tarefaAntiga) {
                acao(tarefaAntiga, novatarefa)
            } else {
                acao(novatarefa)
            }



            Toast.show({
                type: 'success',
                text1: 'tarefa salva com sucesso!'
            })

            navigation.goBack()
        }

    }


    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{tarefaAntiga ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'Titulo'}
                    mode='outlined'
                    value={nome}
                    onChangeText={text => setNome(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Descrição'}
                    mode='outlined'
                    value={idade}
                    onChangeText={text => setIdade(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />
                {showMensagemErro &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                }


            </View>

            <View style={styles.buttonContainer}>

                <Button
                    style={styles.button}
                    mode='contained-tonal'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>

                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={salvar}
                >
                    Salvar
                </Button>


            </View>



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
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
})