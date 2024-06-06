'use client'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import styles from './page.module.css'
import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

interface LoginDTO {
  Usuario: number
  Senha: string
}

interface UserDTO {
  id: string
  usuario: number
  senha?: string
  role: string
  alterarSenha: boolean
}

interface loginResultDTO {
  user: UserDTO
  token: string
}

export default function Home() {
  const [usuario, setUsuario] = useState<number>(0)
  const [senha, setSenha] = useState<string>('')

  async function fetchLogin(loginDTO: LoginDTO): Promise<any> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDTO),
    }

    const res = await fetch(
      'http://localhost:5000/api/user/login',
      options,
    ).then((data) => {
      return data.json()
    })

    return res.data
  }

  const motationLogin = useMutation({
    mutationFn: async (loginDTO: LoginDTO) => fetchLogin(loginDTO),
    onError: (error) => {
      console.log('ERRO: ', error)
    },
    onSuccess: (ok: loginResultDTO) => {
      console.log(ok)
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const loginDTO: LoginDTO = {
      Senha: senha,
      Usuario: usuario,
    }

    motationLogin.mutateAsync(loginDTO)
  }

  return (
    <main className={styles.conteiner}>
      <h1>Base PC MT</h1>

      <Form
        style={{
          marginTop: '150px',
        }}
        onSubmit={(event) => handleSubmit(event)}
      >
        <Row
          style={{
            justifyContent: 'center',
          }}
        >
          <Col xs="11" sm="4" md="6" xl="3">
            <FormGroup>
              <Label>Usuário</Label>
              <Input
                type="number"
                onChange={(event) => setUsuario(parseInt(event.target.value))}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: 'center',
          }}
        >
          <Col xs="11" sm="4" md="6" xl="3">
            <FormGroup>
              <Label>Senha</Label>
              <Input
                type="password"
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: 'center',
          }}
        >
          <Col xs="11" sm="4" md="6" xl="3">
            <FormGroup>
              <Button color="success">Entrar</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </main>
  )
}
