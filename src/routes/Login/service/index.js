import $$ from 'cmn-utils';

export async function login(payload) {
  return $$.put('/login', payload);
}