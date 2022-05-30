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
