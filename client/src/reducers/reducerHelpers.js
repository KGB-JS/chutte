export function stateContainsProduct(productList, product){
   var productIndex = - 1;

   for(var index = 0; index < productList.length; index++){
     if(productList[index]._id === product._id){
       productIndex = index;
     }
   }

  return productIndex;
}

export function filterProductsByCategory(productList, category){
   return productList.filter(function(product){
     if(product.category === category){
       return product;
     }
   });
}
