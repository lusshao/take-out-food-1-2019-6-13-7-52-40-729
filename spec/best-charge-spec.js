describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });


  it('should return produceMassage when invoke getProduceMassage and given is String Array', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = getProduceMassage(inputs);
    let expected = [Object({ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 }), Object({ id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 }), Object({ id: 'ITEM0022', name: '凉皮', price: 8, count: 1 }) ];
    expect(summary).toEqual(expected)
  });

  it('should return promotionWay when invoke getBestPromotions and given is produceMassage Array', function() {
    let inputs = [Object({ id: 'ITEM0001', name: '黄焖鸡', price: 18, count: 1 }), Object({ id: 'ITEM0013', name: '肉夹馍', price: 6, count: 2 }), Object({ id: 'ITEM0022', name: '凉皮', price: 8, count: 1 }) ];
    let summary = getBestPromotions(inputs);
    let expected = Object({ type: '指定菜品半价(黄焖鸡，凉皮)', money: 13 });
    expect(summary).toEqual(expected)
  });
});
