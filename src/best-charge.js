function bestCharge(selectedItems) {
  getProduceMassage(selectedItems);
  return /*TODO*/;
}

const getProduceMassage = (selectedItems) =>{
  let produceList = loadAllItems();
  let produceMassage = [];
  let k = 0;
  for(let i=0;i<selectedItems.length;i++){
    let produceId = selectedItems[i].split(' x ')[0];
    let produceCount = parseInt(selectedItems[i].split(' x ')[1]);
    for(let j=0;j<produceList.length;j++){
      if(produceList[j].id === produceId){
        let index =selectedItems.indexOf(produceList[j].id);
        let produce = {
          id: produceList[i].id,
          name: produceList[i].name,
          price: produceList[i].price,
          count:produceCount
        }
        produceMassage[k++] = produce;
       }
    }
  }
  return produceMassage;
}
