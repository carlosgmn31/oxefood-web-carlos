import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react'
import MenuSistema from '../MenuSistema'
import { Link } from 'react-router-dom'

export default function FormCliente() {
  const [nome, setNome] = useState()
  const [cpf, setCpf] = useState()
  const [dataNascimento, setDataNascimento] = useState()
  const [foneCelular, setFoneCelular] = useState()
  const [foneFixo, setFoneFixo] = useState()

  return (
    <div>
      <MenuSistema tela={'cliente'} />

      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          <h2>
            {' '}
            <span style={{ color: 'darkgray' }}>
              {' '}
              Cliente &nbsp;
              <Icon
                name='angle double right'
                size='small'
              />{' '}
            </span>{' '}
            Cadastro{' '}
          </h2>

          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='Nome'
                  maxLength='100'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label='CPF'
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                >
                  <InputMask
                    required
                    mask='999.999.999-99'
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label='Fone Celular'
                  width={6}
                  value={foneCelular}
                  onChange={(e) => setFoneCelular(e.target.value)}
                >
                  <InputMask mask='(99) 9999.9999' />
                </Form.Input>

                <Form.Input
                  fluid
                  label='Fone Fixo'
                  width={6}
                  value={foneFixo}
                  onChange={(e) => setFoneFixo(e.target.value)}
                >
                  <InputMask mask='(99) 9999.9999' />
                </Form.Input>

                <Form.Input
                  fluid
                  label='Data Nascimento'
                  width={6}
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                >
                  <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    placeholder='Ex: 20/03/1985'
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: '4%' }}>
              <Button
                type='button'
                inverted
                circular
                icon
                labelPosition='left'
                color='orange'
              >
                <Icon name='reply' />
                <Link to={'/list-cliente'}>Voltar</Link>
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
