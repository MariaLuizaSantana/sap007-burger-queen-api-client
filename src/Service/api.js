export async function AuthUser (email, password){
    
    return await fetch ('https://lab-api-bq.herokuapp.com/auth', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}

export async function CreateNewUser (name, email, password, role){
    
    return await fetch ('https://lab-api-bq.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
          restaurant: 'Burger Queen',
        }),
      });
}

export async function AuthDeleteUser (uid, token){
    
  return await fetch(`https://lab-api-bq.herokuapp.com/users/${uid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  });
}

export async function AuthUpdateUser (uid, token, name, role){
    
  return await fetch(`https://lab-api-bq.herokuapp.com/users/${uid}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      role: role,
    }),
  });
}

export async function AuthGetProduct (token){
    
  return await fetch('https://lab-api-bq.herokuapp.com/products', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  });
}
