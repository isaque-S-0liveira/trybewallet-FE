// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE_WALLET = {
  currencies: [], // array de string
  valorTotal: 0,
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case 'SEARCH_SUCCESS':
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((cr) => cr !== 'USDT'),
    };
  case 'SALVE_INFO':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'SALVAR_DESPESAS':
    return {
      ...state,
      valorTotal: action.payload,
    };
  case 'REMOVER_DESPESA':
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
