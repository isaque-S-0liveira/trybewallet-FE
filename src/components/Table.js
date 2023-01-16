import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removerDespesa } from '../redux/actions';

class Table extends Component {
  handleClik = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const { name } = target;
    const lista = expenses.filter((e) => e.id !== Number(name));
    dispatch(removerDespesa(lista));
  };

  render() {
    const { expenses } = this.props;
    return (
      <header>
        <table className="tabela">
          <thead>
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
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={ e.id }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ (+e.value).toFixed(2) }</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{ (+e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                <td>{(+e.value * +e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ this.handleClik }
                    name={ e.id }
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangesRates: PropTypes.shape({}),
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
