import InputMask from 'react-input-mask'
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuSistema from "../MenuSistema";
import { Button, Container, Divider, Form, Icon, FormTextArea} from "semantic-ui-react";
import axios from "axios";

export default function FormPromocao() {
    const { state } = useLocation()
    const [idPromocao,setIdPromocao] = useState()
    const [titulo,setTitulo] = useState()
    const [dataInicio,setDataInicio] = useState()
    const [dataFim,setDataFim] = useState()
    const [regra,setRegra] = useState()
    const [valorDesconto,setValorDesconto] = useState()

    const navigate = useNavigate();

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    function salvar() {

        let promocaoRequest = {
            titulo: titulo,
            dataInicio: dataInicio,
            dataFim: dataFim,
            regra: regra,
            valorDesconto: valorDesconto
        }
        if (idPromocao != null) { //Alteração:
            console.log(promocaoRequest)
            axios.put("http://localhost:8080/api/promocao/" + idPromocao, promocaoRequest)
                .then((response) => { console.log('Promocao alterada com sucesso.') },setTimeout(navigate('/list-promocao'),5000))
                .catch((error) => { console.log('Erro ao alterar uma promocao.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/promocao", promocaoRequest)
                .then((response) => { console.log('Promocao cadastrada com sucesso.') },setTimeout(navigate('/list-promocao'),5000))
                .catch((error) => { console.log('Erro ao incluir a promocao.') })
        }
        
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/promocao/" + state.id)
                .then((response) => {
                    setIdPromocao(response.data.id)
                    setTitulo(response.data.titulo)
                    setDataInicio(formatarData(response.data.dataInicio))
                    setDataFim(formatarData(response.data.dataFim))
                    setRegra(response.data.regra)
                    setValorDesconto(response.data.valorDesconto)
                })
        }
    }, [state])
    return (

        <div>

            <MenuSistema tela={'promocao'} />

            <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
        { idPromocao === undefined &&
          <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
        }
        { idPromocao !== undefined &&
          <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
        }

    <Divider />

    <Form>
    <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='Título'
                  maxLength='100'
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
    </Form.Group>
    <Form.Group widths='equal'>
    <FormTextArea label='Descrição'  value={regra}
                                onChange={e => setRegra(e.target.value)} />
    </Form.Group>

    <Form.Group>

<Form.Input
        required
        fluid
        label='Valor Desconto (R$)'
        width={6}
        value={valorDesconto}
        onChange={e => setValorDesconto(e.target.value)}
    >

    </Form.Input>


    <Form.Input
            fluid
            label='A partir de'
                width={6}
                >
                  <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    placeholder='Ex: 20/03/1985'
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label='Terminando em'
                  width={6}
                >
                  <InputMask
                    mask='99/99/9999'
                    maskChar={null}
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
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
                <Link to={'/list-promocao'}>Voltar</Link>
              </Button>
    <Button
                inverted
                circular
                icon
                labelPosition='left'
                color='blue'
                floated='right' onClick={() => salvar()}
              >
                <Icon name='save' />
                Salvar 
              </Button>
        </div>

        </Container>
        </div>
        </div>
    )
}