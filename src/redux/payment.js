function payment (state = [{fromAdrr: "0x5a600702721c64fc7a6bddd513c8342ad47128b6",nextRun:12}], action) {
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