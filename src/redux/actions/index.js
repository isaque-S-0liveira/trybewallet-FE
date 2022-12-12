// Coloque aqui suas actions

const salvarEmail = (email) => ({
  type: 'USER_EMAIL',
  payload: email,
});

export const searchSuccess = (currencies) => (
  { type: 'SEARCH_SUCCESS',
    payload: currencies,
  });

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(searchSuccess(data));
  };
}

export default salvarEmail;
