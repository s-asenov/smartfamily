import {faArrowRight, faArrowDown} from "@fortawesome/free-solid-svg-icons";

const initialState = {
    icon: faArrowDown,
    sideBar: "active"
}

const sideBarReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'open': 
            return {
                icon: faArrowDown,
                sideBar: "active"
            }
        case 'close':
            return {
                icon: faArrowRight,
                sideBar: "partial"
            }
        default:
            return state
    }
}

export default sideBarReducer;