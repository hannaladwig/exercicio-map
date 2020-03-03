import React, { Component } from "react";
import { wait } from "@testing-library/react";

// import { Container } from './styles';

export default class Tabela extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    dados: []
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:3334/");
    let data = await response.json();
    data = JSON.stringify(data);
    this.setState({ dados: JSON.parse(data) });
  }

  async EnviarDados(e) {
    e.preventDefault();
    const { nome, email, senha } = this.state;

    let dadosArray = { name: nome, email: email, password: senha };
    this.setState({
      dados: [...this.state.dados, dadosArray]
    });

    console.log("array", dadosArray);
    const response = await fetch("http://localhost:3334/clients", {
      method: "POST",

      body: JSON.stringify(dadosArray)
    });

    return response.json();
  }

  render() {
    return (
      <div>
        {console.log(this.state.dados)}
        <div>
          Nome:
          <input
            type="text"
            value={this.state.name}
            onChange={e => {
              this.setState({ nome: e.target.value });
            }}
          />
        </div>

        <div>
          E-mail:
          <input
            type="text"
            value={this.state.email}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
        </div>
        <div>
          Senha:
          <input
            type="text"
            value={this.state.password}
            onChange={e => {
              this.setState({ senha: e.target.value });
            }}
          />
        </div>

        <button
          onClick={e => {
            this.EnviarDados(e);
          }}
        >
          Cadastar
        </button>

        {this.state.dados.map((dado, index) => {
          return (
            <ul key={index}>
              <li>{dado.name}</li>
              <li>{dado.email}</li>
              <li>{dado.password}</li>
              <br />
            </ul>
          );
        })}
      </div>
    );
  }
}
