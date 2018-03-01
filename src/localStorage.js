export const loadState = ()=> {
    try {
        const serialisedState = localStorage.getItem('state');
        if (serialisedState === null) {
            return undefined;
        }
        else {
            return JSON.parse(serialisedState);
        }
    }
    catch (e) {
        return undefined;
    }
}

export const saveState = (state)=> {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('state', serialisedState);
    }
    catch (e) {
        console.error(e);
    }
}