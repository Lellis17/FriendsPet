const URL =
  'https://api-consulta-dot-api-samples-423102.uc.r.appspot.com/api/consultas';

export async function findAll() {
  const requestInit = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 12116310',
    },
  };

  const responseHttp = await fetch(URL, requestInit);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    throw new Error(
      'Falha ao tentar obter as consultas. Tente novamente em alguns minutos.'
    );
  }
}

export async function remove(id) {
  const requestInit = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer 12116310',
    },
  };

  console.log('Executando DELETE /consultas/' + id);
  const responseHttp = await fetch(`${URL}/${id}`, requestInit);

  if (responseHttp.ok) {
    console.log('Sucesso');
    return await responseHttp.json();
  } else {
    console.log('Erro');
    throw new Error(
      'Falha ao tentar remover consulta. Tente novamente em alguns minutos.'
    );
  }
}

export async function insert(dataConsulta,descricao,historico,nomePet,especie,valor) {
  const requestInit = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 12116310',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({dataConsulta,descricao,historico,nomePet,especie,valor}),
  };

  const responseHttp = await fetch(URL, requestInit);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log('Erro');
    throw new Error(
      'Falha ao tentar inserir a consulta. Tente novamente em alguns minutos.'
    );
  }
}

export async function update(id,dataConsulta,descricao,historico,nomePet,especie,valor,creationTimestamp,updateTimestamp) {
  const requestInit = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer 12116310',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id,dataConsulta,descricao,historico,nomePet,especie,valor,creationTimestamp,updateTimestamp }),
  };

  const responseHttp = await fetch(`${URL}/${id}`, requestInit);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log('Erro');
    throw new Error(
      'Falha ao tentar alterar a consulta. Tente novamente em alguns minutos.'
    );
  }
}
