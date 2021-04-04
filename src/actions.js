// const baseURL = 'http://localhost:8080/api/users';
const baseURL = 'https://anna-shvetsova.h1n.ru/api/users';

const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

const authenticate = (userData) => {
    return (dispatch) => {
        dispatch({
            type: 'AUTHENTICATE',
            payload: userData
        })
    }
};

const signUp = ({ name, surname, email, password, role }) => {
    return async (dispatch) => {
        const res = await fetch(`${baseURL}/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                password,
                role
            })
        });
        const { status, message, data } = await res.json();
        if (status !== 'success') {
            throw Error(message);
        };
        dispatch(authenticate(data));
    }
}

const signIn = ({ email, password }) => {
    return async (dispatch) => {
        const res = await fetch(`${baseURL}/signIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        const { status, message, data } = await res.json();
        if (status !== 'success') {
            throw Error(message);
        };
        dispatch(authenticate(data));
    }
}

export {
    signUp,
    signIn,
    logout
}