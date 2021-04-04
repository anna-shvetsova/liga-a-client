const reducer = (state, action) => {

    const initialState = {
        _id: null,
        name: null,
        surname: null,
        email: null,
        role: null
    };

    if (state === undefined) return initialState;

    switch (action.type) {
        case 'AUTHENTICATE':
            const { _id, name, surname, email, role } = action.payload;
            return {
                ...state,
                _id,
                name,
                surname,
                email,
                role
            };
        case 'LOGOUT': 
            return initialState;
        default:
            return state;
    }
}

export default reducer;
