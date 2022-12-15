import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispesasTotais } from '../redux/actions';

class Header extends Component {
  componentDidUpdate() {
    this.totalSun();
  }

  totalSun = () => {
    const { expenses, dispatch } = this.props;
    const valorTotal = expenses.reduce((acc, cur) => (
      acc + (cur.value * cur.exchangeRates[cur.currency].ask)), 0);
    dispatch(dispesasTotais(valorTotal));
  };

  /*
  totalSun = () => {
    const { expenses } = this.props;
    const arrValues = expenses.map((inf) => Number(inf.value));
    const sun = arrValues.reduce((acc, cur) => acc + cur).toFixed(2);
    const valorTotal = expenses.forEach((e) => {
      const cotacao = e.exchangeRates[e.currency].ask;
      console.log(cotacao * sun);
      return sun * cotacao;
    });
    console.log(valorTotal);
  };
*/

  render() {
    const { email, valorTotal } = this.props;

    return (
      <>
        <span data-testid="email-field">
          Email:
          { email }
        </span>
        <p data-testid="total-field">{valorTotal}</p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  valorTotal: state.wallet.valorTotal,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  valorTotal: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
