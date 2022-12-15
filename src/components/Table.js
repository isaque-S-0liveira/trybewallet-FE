import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <header>
        <table className="tabela">
          <tr className="inf-tabela">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </table>
      </header>
    );
  }
}

export default Table;
