import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, salveInfos } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  currenciesApi = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  };

  salvarCotacao = async () => {
    const currencies = await this.currenciesApi();
    this.setState({ exchangeRates: currencies }, this.adcDispesas);
  };

  adcDispesas = () => {
    const { dispatch } = this.props;
    const infos = { ...this.state };
    dispatch(salveInfos(infos));
    this.setState((estadoAnterior) => ({
      id: estadoAnterior.id + 1,
      value: '',
      description: '',
    }));
  };

  render() {
    const { method, tag, value, description, currency } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <form>
          <label htmlFor="despesas">
            Despesa:
            <input
              type="number"
              data-testid="value-input"
              id="despesas"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descrição">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="descrição"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((cr, i) => (

              <option key={ i } value={ cr }>{cr}</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button type="button" onClick={ this.salvarCotacao }>Adicionar despesa</button>
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
