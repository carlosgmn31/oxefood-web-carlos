import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuSistema from "../MenuSistema";
import { Button, Container, Divider,Form, FormTextArea } from "semantic-ui-react";

export default function FormCategoriaProduto() {
    const [descricao, setDescricao] = useState()
    const { state } = useLocation();
    const [idCategoriaProduto, setIdCategoriaProduto] = useState();

    const navigate = useNavigate();

    useEffect(() => {
            if (state != null && state.id != null) {
                axios.get("http://localhost:8080/api/categoriaproduto/" + state.id)
                    .then((response) => {
                        setIdCategoriaProduto(response.data.id)
                        setDescricao(response.data.descricao)
                    })
            }
        }, [state])

    function salvar() {
            
            let categoriaProdutoRequest = {
                descricao: descricao
            }
            if (idCategoriaProduto != null) { //Alteração:
                axios.put("http://localhost:8080/api/categoriaproduto/" + idCategoriaProduto, categoriaProdutoRequest)
                .then(response => { console.log('Categoria de produto alterada com sucesso.',JSON.stringify(response,null,2))},/* setTimeout(navigate('/list-categoria-produto'),5000) */)
                .catch(error => { console.log('Erro ao alterar uma categoria de produto.',JSON.stringify(error,null,2)) })
            } else { //Cadastro:
                axios.post("http://localhost:8080/api/categoriaproduto", categoriaProdutoRequest)
                .then((response) => { console.log('Categoria de produto cadastrada com sucesso.',JSON.stringify(response,null,2)) },/* setTimeout(navigate('/list-categoria-produto'),5000) */)
                .catch((error) => { console.log('Erro ao incluir a categoria de produto.',JSON.stringify(error,null,2)) })
            }
        }
    return (
        <div>
            <MenuSistema />
            <Container textAlign='justified' >
                <h2> Cadastro </h2>
                <Divider />
                <Form>
                <FormTextArea required label='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} />
                    
                </Form>
                <Button color='orange' onClick={salvar}>Salvar</Button>
            </Container>
        </div>
    )
}