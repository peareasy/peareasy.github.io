import axios from "../sbcLambda"

  export const getSBCSets = () => axios.get('/get-sbc-setss').then(res => {
    let sbcSets = res.data
    let transformedSBCSets = []
    sbcSets.forEach(element => {
      const id = element.Set_ID;
      const img = element.ImageURL;
      const name = element.Name;
      transformedSBCSets.push({id, img, name})
    });
    return transformedSBCSets
  })
