/* import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function FormEnderecoCliente() {
    const[rua,setRua] = useState()
    const[numero,setNumero] = useState()
    const[bairro,setBairro] = useState()
    const[cidade,setCidade] = useState()
    const[estado,setEstado] = useState()
    const[cep,setCep] = useState()
    const[complemento,setComplemento] = useState()
    const { state } = useLocation();
    const [idCliente, setIdCliente] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/endereco/" + state.id)
                .then((response) => {
                    setIdCliente(state.id)
                    set
                })
        }
    }, [state])
} */