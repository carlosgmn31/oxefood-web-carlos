import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom/dist';
import { Button, Container, Divider, Form, FormTextArea, Icon } from 'semantic-ui-react';

import axios from 'axios';
import MenuSistema from '../MenuSistema';
import { notifyError, notifySuccess } from '../util/Util';

export default function FormProduto() {
  const { state } = useLocation();
  const [idProduto, setIdProduto] = useState();
  const [titulo, setTitulo] = useState();
  const [codigoProduto, setCodigoProduto] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
  const [listaCategoria, setListaCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState();

  function salvar() {
    let produtoRequest = {
      idCategoria: idCategoria,
      titulo: titulo,
      codigo: codigoProduto,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };
    if (idProduto != null) {
      //Alteração:
      axios
        .put('http://localhost:8080/api/produto/' + idProduto, produtoRequest)
        .then((response) => {
          notifySuccess('Produto alterado com sucesso.');
        })
        .catch((error) => {
          notifyError('Erro ao alter um produto.');
        });
    } else {
      //Cadastro:
      axios
        .post('http://localhost:8080/api/produto', produtoRequest)
        .then((response) => {
          notifySuccess('Produto cadastrado com sucesso.');
        })
        .catch((error) => {
          notifyError('Erro ao incluir o produto.');
        });
    }
  }

  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get('http://localhost:8080/api/produto/' + state.id).then((response) => {
        setIdProduto(response.data.id);
        setTitulo(response.data.titulo);
        setCodigoProduto(response.data.codigo);
        setDescricao(response.data.descricao);
        setValorUnitario(response.data.valorUnitario);
        setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
        setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
        setIdCategoria(response.data.categoria.id);
      });
    }

    axios.get('http://localhost:8080/api/categoriaproduto').then((response) => {
      const dropDownCategorias = response.data.map((c) => ({ text: c.descricao, value: c.id }));
      setListaCategoria(dropDownCategorias);
    });
  }, [state]);

  return (
    <div>
      <MenuSistema tela={'produto'} />

      <div style={{ marginTop: '3%' }}>
        <Container textAlign="justified">
          <h2>
            {' '}
            <span style={{ color: 'darkgray' }}>
              {' '}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{' '}
            </span>{' '}
            Cadastro{' '}
          </h2>

          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input required fluid label="Título" maxLength="100" placeholder="Informe o título do produto" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                <Form.Input required fluid label="Código do Produto" placeholder="Informe o código do produto" value={codigoProduto} onChange={(e) => setCodigoProduto(e.target.value)}></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Select
                  required
                  fluid
                  tabIndex="3"
                  placeholder="Selecione"
                  label="Categoria"
                  options={listaCategoria}
                  value={idCategoria}
                  onChange={(e, { value }) => {
                    setIdCategoria(value);
                  }}
                />
              </Form.Group>
              <FormTextArea label="Descrição" placeholder="Informe a descrição do produto" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

              <Form.Group>
                <Form.Input required fluid label="Valor Unitário" width={6} value={valorUnitario} onChange={(e) => setValorUnitario(e.target.value)}></Form.Input>

                <Form.Input fluid label="Tempo de Entrega Mínimo em Minutos" width={6} placeholder="30" value={tempoEntregaMinimo} onChange={(e) => setTempoEntregaMinimo(e.target.value)}></Form.Input>

                <Form.Input fluid label="Tempo de Entrega Máximo em Minutos" width={6} placeholder="40" value={tempoEntregaMaximo} onChange={(e) => setTempoEntregaMaximo(e.target.value)}></Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: '4%' }}>
              <Button type="button" inverted circular icon labelPosition="left" color="orange">
                <Icon name="reply" />
                <Link to={'/list-produto'}>Voltar</Link>
              </Button>

              <Button inverted circular icon labelPosition="left" color="blue" floated="right" onClick={() => salvar()}>
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
