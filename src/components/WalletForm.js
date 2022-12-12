import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <label htmlFor="despesas">
            Despesa
            <input
              type="number"
              data-testid="value-input"
              id="despesas"
            />
          </label>
          <label htmlFor="descrição">
            Descrição
            <input
              type="text"
              data-testid="description-input"
              id="descrição"
            />
          </label>
          <select data-testid="currency-input">
            {currencies.map((cr, i) => (

              <option key={ i }>{cr}</option>
            ))}
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
