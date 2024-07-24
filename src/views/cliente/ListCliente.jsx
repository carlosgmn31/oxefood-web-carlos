import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../MenuSistema';

export default function ListCliente() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEnderecosModal, setOpenEnderecosModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [clienteId, setClienteId] = useState();
    const [clienteSelecionado, setClienteSelecionado] = useState();
    const [entidade, setEntidade] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState();
    const [cep, setCep] = useState();
    const [cidade, setCidade] = useState();
    const [estado, setEstado] = useState();
    const [complemento, setComplemento] = useState();
    const [enderecoSelecionado, setEnderecoSelecionado] = useState();
    const [typeOfRegister, setTypeOfRegister] = useState(""); // "create" ou "edit"
    const [openModalCadastroEndereco, setOpenModalCadastroEndereco] = useState(false);

    function setandoRegistro(tipodeRegistro, endereco) {
        setTypeOfRegister(tipodeRegistro)
        if (typeOfRegister === "edit") {
            setRua(endereco.rua)
            setNumero(endereco.numero)
            setBairro(endereco.bairro)
            setCep(endereco.cep)
            setCidade(endereco.cidade)
            setEstado(endereco.estado)
            setComplemento(endereco.complemento)
        }
        setEnderecoSelecionado(endereco)
        setOpenModalCadastroEndereco(true)
        console.log("Tipo de registro: " + tipodeRegistro
            + "\nEndereço selecionado: " + JSON.stringify(endereco, null, 2))

    }

    function salvarEndereco() {

        let enderecoRequest = {
            rua: rua ? rua : "rua-teste2",
            numero: numero ? numero : "numero-teste2",
            bairro: bairro ? bairro : "bairro-teste2",
            cep: cep ? cep : "cep-teste2",
            cidade: cidade ? cidade : "cidade-teste2",
            estado: estado ? estado : "estado-teste2",
            complemento: complemento ? complemento : "complemento-teste2"
        }
        if (enderecoSelecionado != null && clienteSelecionado != null) { //Alteração:
            axios.put("http://localhost:8080/api/cliente/endereco/" + enderecoSelecionado.id, enderecoRequest)
                .then(response => { console.log('Endereço alterado com sucesso.', JSON.stringify(response, null, 2))},recarregarEnderecos())
                .catch(error => { console.log('Erro ao alterar um Endereço.', JSON.stringify(error, null, 2)) })
        } if (clienteSelecionado != null) { //Cadastro:

            axios.post("http://localhost:8080/api/cliente/endereco/" + clienteSelecionado.id, enderecoRequest)
                .then((response) => { console.log('Endereço cadastrado com sucesso.', JSON.stringify(response, null, 2)) },recarregarEnderecos())
                .catch((error) => { console.log('Erro ao incluir o Endereço.', JSON.stringify(error, null, 2)) })
        }
        
        
    }

    function recarregarEnderecos() {
        /* axios.get("http://localhost:8080/api/cliente"+clienteSelecionado.id)
            .then((response) => {
                setClienteSelecionado(response.data)
            }) */
        setOpenModalCadastroEndereco(false)
        carregarLista()
        if (clienteSelecionado) {
            console.log(clienteSelecionado)
            handleListarEnderecosClick(clienteSelecionado); // Atualiza a lista de endereços
        }
        }

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/cliente")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    function confirmaRemover(id, entidade) {
        setOpenModal(true)
        setIdRemover(id)
        setEntidade(entidade)
    }
    async function remover(entidade) {
        let rota = ""
        // eslint-disable-next-line default-case
        switch (entidade) {
            case "cliente":
                rota = "http://localhost:8080/api/cliente/"
                break;
            case "endereco":
                rota = "http://localhost:8080/api/cliente/endereco/"
                break;
        }

        await axios.delete(rota + idRemover)
            .then((response) => {

                console.log(entidade + ' removido(a) com sucesso.')

                axios.get("http://localhost:8080/api/cliente")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um cliente.')
            })
        setOpenModal(false)
        if (openEnderecosModal) {
            setOpenEnderecosModal(false)
        }
    }
    const handleListarEnderecosClick = (cliente) => {
        setClienteId(cliente.id);
        selecionarCliente(cliente);
        setOpenEnderecosModal(true);
    };
    const selecionarCliente = (cliente) => {
        setClienteSelecionado(cliente); // Define o cliente selecionado
    };
    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(cliente => (

                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='orange'
                                                title='Listar Endereços'
                                                icon
                                                onClick={() => {
                                                    handleListarEnderecosClick(cliente)
                                                }}>
                                                <Icon name='map' />
                                            </Button>&nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-cliente" state={{ id: cliente.id, enderecos: cliente.enderecos[0] }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                onClick={e => confirmaRemover(cliente.id, "cliente")}
                                                icon>
                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <div>
                <Modal
                    basic
                    onClose={() => setOpenModal(false)}
                    onOpen={() => setOpenModal(true)}
                    open={openModal}
                >
                    <Header icon>
                        <Icon name='trash' />
                        <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro?
                        </div>
                    </Header>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                            <Icon name='remove' /> Não
                        </Button>
                        <Button color='green' inverted onClick={() => remover(entidade)}>
                            <Icon name='checkmark' /> Sim
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    basic
                    onClose={() => setOpenEnderecosModal(false)}
                    onOpen={selecionarCliente}  // Ao abrir o modal, selecione o cliente
                    open={openEnderecosModal}
                >
                    <Header icon>
                        <Icon name='address book' />
                        Endereços do Cliente
                    </Header>
                    <Modal.Content>
                        {clienteSelecionado && (
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Rua</Table.HeaderCell>
                                        <Table.HeaderCell>Número</Table.HeaderCell>
                                        <Table.HeaderCell>Bairro</Table.HeaderCell>
                                        <Table.HeaderCell>CEP</Table.HeaderCell>
                                        <Table.HeaderCell>Cidade</Table.HeaderCell>
                                        <Table.HeaderCell>Estado</Table.HeaderCell>
                                        <Table.HeaderCell>Complemento</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {clienteSelecionado.enderecos.map(endereco => (
                                        <Table.Row key={endereco.id}>
                                            <Table.Cell>{endereco.rua}</Table.Cell>
                                            <Table.Cell>{endereco.numero}</Table.Cell>
                                            <Table.Cell>{endereco.bairro}</Table.Cell>
                                            <Table.Cell>{endereco.cep}</Table.Cell>
                                            <Table.Cell>{endereco.cidade}</Table.Cell>
                                            <Table.Cell>{endereco.estado}</Table.Cell>
                                            <Table.Cell>{endereco.complemento}</Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                   <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste endereço'
                                                onClick={() => setandoRegistro("edit", endereco)}
                                                icon>
                                                <Icon name='edit' />
                                            </Button> &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este endereço'
                                                    icon
                                                    onClick={() => confirmaRemover(endereco.id, "endereco")}>
                                                    <Icon name='trash' />
                                                </Button>&nbsp;

                                                {/* <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Adicionar Endereços'
                                                icon
                                                onClick={() => {
                                                    setClienteSelecionado(cliente.id);
                                                    setOpenEnderecoModal(true);
                                                }}>
                                                <Icon name='plus' />
                                            </Button> */}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => setandoRegistro("create")}>
                            <Icon name='add' /> adicionar
                        </Button>
                        <Button color='red' onClick={() => setOpenEnderecosModal(false)}>
                            <Icon name='remove' /> Fechar
                        </Button>
                    </Modal.Actions>
                </Modal>
                {/* modal para adicionar endereço */}
                <Modal
                    basic
                    onClose={() => setOpenModalCadastroEndereco(false)}
                    onOpen={() => setOpenModalCadastroEndereco(true)}
                    open={openModalCadastroEndereco}
                >
                      { enderecoSelecionado === undefined &&
          <Header icon>
          <Icon name='map signs' />
          Adicionar Endereço
        </Header>
        }
        { enderecoSelecionado !== undefined &&
          <Header icon>
          <Icon name='map signs' />
          Alterar Endereço
        </Header>
        }
                    <Form inverted>
                        <Form.Group>
                            <Form.Input
                                fluid
                                label='Rua'
                                width={6}
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                label='Número'
                                width={6}
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                label='Bairro'
                                width={6}
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                            </Form.Group>
                            <Form.Group>
                            <Form.Input
                                fluid
                                label='CEP'
                                width={6}
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                label='Cidade'
                                width={6}
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                label='Estado'
                                width={6}
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            />
                            </Form.Group>
                            <Form.Group>
                            <Form.Input
                                fluid
                                label='Complemento'
                                width={6}
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Modal.Actions>
                        <Button color='blue' onClick={() => salvarEndereco()}>
                            <Icon name='save outline' /> salvar endereço
                        </Button>
                        <Button color='red' onClick={() => setOpenEnderecosModal(false)}>
                            <Icon name='remove' /> Fechar
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>
    )
}
