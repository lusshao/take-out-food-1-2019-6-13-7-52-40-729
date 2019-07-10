function bestCharge(selectedItems) {
  let produceMassage = getProduceMassage(selectedItems);
  let promotionWay = getBestPromotions(produceMassage);
  let posString = getPosString(produceMassage,promotionWay);
  return posString;
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
          id: produceList[j].id,
          name: produceList[j].name,
          price: produceList[j].price,
          count:produceCount
        }
        produceMassage[k++] = produce;
       }
    }
  }
  console.log(produceMassage);
  return produceMassage;
}

const getBestPromotions = (produceMassage) =>{
  let promotions = loadPromotions();
  let sum1 = 0;
  let sum2 = 0;
  let halfName = "";
  let promotionWay = {};
  for(let i =0;i<produceMassage.length;i++){
    sum2 += produceMassage[i].price * produceMassage[i].count;
    if(promotions[1].items.indexOf(produceMassage[i].id)!=-1){
      halfName += produceMassage[i].name+"，";
      sum1 += produceMassage[i].price*produceMassage[i].count/2;
    }else{
      sum1 += produceMassage[i].price*produceMassage[i].count;
    }
  }
  if(sum2 >= 30){
    sum2 -= 6;
  }
  if(sum1<sum2){
    promotionWay['type'] = promotions[1].type+"("+halfName.substring(0,halfName.length-1)+")";
    promotionWay['money'] = sum2-sum1+6;
  }else if(sum1>sum2){
    promotionWay['type'] = promotions[0].type;
    promotionWay['money'] = 6;
  }else{
    promotionWay['type'] = null;
    promotionWay['money'] = 0;
  }
  console.log(promotionWay);
  return promotionWay;
}

const getPosString = (produceMassage,promotionWay) => {
  let sum =0;
  let posString = "============= 订餐明细 =============\n" ;
  for(let i = 0;i<produceMassage.length;i++){
    sum += produceMassage[i].price*produceMassage[i].count;
    posString += produceMassage[i].name+" x "+produceMassage[i].count+" = "+produceMassage[i].price*produceMassage[i].count+"元\n"
  }
  posString +="-----------------------------------\n";
  if(promotionWay.type != null){
    posString+="使用优惠:\n";
    posString+=promotionWay.type+"，省"+promotionWay.money+"元\n";
    posString +="-----------------------------------\n";
    posString +="总计："+(sum - parseInt(promotionWay.money))+"元\n"
  }else{
    posString +="总计："+sum+"元\n"
  }
  posString+="==================================="

  //console.log(posString);
  return posString;
}
