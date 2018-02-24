function renter (state = [], action) {
    switch (action.type) {
        case 'update':
          return [
              ...state, 
              {
                key: action.key,
                addr: action.addr,
                name: action.name, 
                email: action.email, 
                weiHeld: action.weiHeld, 
                leaseStartDate: action.leaseStartDate, 
                lastPaymentDate: action.lastPaymentDate, 
                owesWei: action.owesWei, 
                inDefault: action.inDefault, 
                _assigned: action._assigned
              }
          ]
        case 'reset':
          return []
        default:
          return state
      }
}

  
  export default renter