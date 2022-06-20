import axios from "../otherApi"

  export const getSBCSets = () => axios.get('/get-sbc-sets').then(res => {
    let sbcSets = res.data
    let transformedSBCSets = []
    sbcSets.forEach(element => {
      const [id, img, name] = element.split('_');
      transformedSBCSets.push({id, img, name})
    });
    return transformedSBCSets
  })
