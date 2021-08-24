const initialState = {
    user: null,
    load: true
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'login': 
            return {
                user: action.payload.user,
                load: false
            }
        case 'logout':
            return {
                user: null,
                load: false
            }
        default:
            return state
    }
}

export default userReducer;