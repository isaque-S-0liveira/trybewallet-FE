import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import salvarEmail from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      bttDisabled: true,
      email: '',
      senha: '',
    };
  }

  /*
  handleChangeEmail = ({ target }) => {
    const { value } = target;
    this.setState({ email: value }, () => this.activateBtt());
  };

  handleChangePassWord = ({ target }) => {
    const { value } = target;
    this.setState({ senha: value }, () => this.activateBtt());
  };

*/
  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.activateBtt());
  };

  activateBtt = () => {
    const { email, senha } = this.state;
    const minValue = 6;
    const emailCheck = email.includes('@') && email.includes('.com');
    const senhaCheck = senha.length >= minValue;
    if (emailCheck && senhaCheck) {
      this.setState({ bttDisabled: false });
    } else {
      this.setState({ bttDisabled: true });
    }
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(salvarEmail(email));
    history.push('/carteira');
    console.log('hanclick');
  };

  render() {
    const { bttDisabled, email, senha } = this.state;
    return (
      <>
        <div>Login</div>
        <form>
          <label htmlFor="email">
            {' '}
            Email:
            <input
              type="email"
              id="email"
              name="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="senha">
            Senha:
            <input
              type="password"
              id="senha"
              name="senha"
              value={ senha }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            type="button"
            disabled={ bttDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
