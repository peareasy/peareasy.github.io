import otherAxios from "../sbcLambda"

export const getSBCsWithId = (id) => otherAxios.get(`get-sbcs?set_id=${id}`).then(response => { 
    let sbcs = [];
    if (response.data) {
        sbcs = response.data
    }
    return sbcs
  })