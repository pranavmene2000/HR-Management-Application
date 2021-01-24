const initialState = {
    darkMode: false,
}

const themereducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                darkMode: action.payload.mode,
            }
        default:
            return state
    }
}

export default themereducer;