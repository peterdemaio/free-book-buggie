const demographicsBoolean = (state = false, action) => {
    switch (action.type) {
        case 'ORG_DEM_BOOL':
            return true;
        
        default:
            return state;
    }
};

// loginMode will be on the redux state at:
// state.loginMode
export default demographicsBoolean;
