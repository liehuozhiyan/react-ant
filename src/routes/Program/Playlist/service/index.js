import $$ from 'cmn-utils';

export async function qryPlaylist(payload) {
  return $$.post('/program/qryPlaylist', payload);
}

export async function qryPlaylistById(payload) {
  let { id } = payload;
  return $$.post(`/program/qryPlaylistById/${id}`);
}

export async function savePlaylist(payload) {
  return $$.post('/program/savePlaylist', payload);
}

export async function delPlaylist(payload) {
  return $$.post('/program/delPlaylist', payload);
}