import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from "../MenuSistema";

const estados = [
    { key: '0', text: 'Acre', value: 'acre' },
    { key: '1', text: 'Paraíba', value: 'paraiba' },
    { key: '2', text: 'Pernambuco', value: 'pernambuco' },
]

export default function FormEntregador() {
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregas, setQtdEntregas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [rua, setRua] = useState();
    const [numeroRua, setNumeroRua] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [ativo, setAtivo] = useState();




    return (

        <div>

            <MenuSistema tela={'entregador'} />


            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    width={12}
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={6}
                                    value={cpf}
                                    onChange={e => setCpf(e.target.value)}>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={6}
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}>

                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    maxLength="100"
                                    width={5}
                                    placeholder='Ex:20/10/1985'
                                    value={dataNascimento}
                                    onChange={e => setDataNascimento(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone celular'
                                    width={6}
                                    value={foneCelular}
                                    onChange={e => setFoneCelular(e.target.value)}
                                >
                                    <InputMask
                                        required
                                        mask="(99) 9999.9999"
                                    />

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}
                                    value={foneFixo}
                                    onChange={e => setFoneFixo(e.target.value)}
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Entregas Realizadas'
                                    width={4}
                                    value={qtdEntregas}
                                    onChange={e => setQtdEntregas(e.target.value)}
                                >

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor por frete'
                                    width={4}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                >

                                </Form.Input>


                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={14}
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={3}
                                    value={numeroRua}
                                    onChange={e => setNumeroRua(e.target.value)}
                                >

                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={9}
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={9}
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}
                                >

                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={9}
                                    value={cep}
                                    onChange={e => setCep(e.target.value)}>
                                    <InputMask
                                        required
                                        mask="99.999-9  99"
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Select
                                fluid
                                label='UF'
                                options={estados}
                                placeholder='Selecione'
                                value={uf}
                                onChange={e => setUf(e.target.value)} F
                            />

                            <Form.Input
                                label='Complemento'
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                            ></Form.Input>



                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>


    )
}