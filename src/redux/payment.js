function payment (state = [], action) {
    switch (action.type) {
        case 'newPayment':
          return [
              ...state, 
              {
                datePaid: action.datePaid,
                nextRun: action.nextRun,
                fromAdrr: action.fromAdrr,
                weiPaid: action.weiPaid,
                fiatPaid: action.fiatPaid
              }
          ]
        case 'reset':
          return []
        default:
          return state
      }
}

 
export default payment