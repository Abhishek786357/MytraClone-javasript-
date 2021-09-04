fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
  .then((apiData) => apiData.json())
  .then((data) => data.products)
  .then((data) => {
     productCards(data);
    gender(data);
    categories(data);
    brands(data);
    saveData(data);
    categoryFilter(data);
    brandFilter(data);
  });
var productData = [];
const saveData = (data) => {
  productData = data;
};

/* productCards SECTION---------------------- */
var  productCards = (data) => {
  var cardData = document.getElementById("KK");
  var htmlContent = [];
  data.forEach((elem) => {
    htmlContent += ` <div class="c3">
        <img src=${elem.searchImage}  width= "300px" alt="watch">
        <h4>${elem.brand} </h4>
        <p>${elem.productName}</p>
        <h4>${elem.price}</h4>
    </div>`;
    cardData.innerHTML = htmlContent;
  });
};

/*Gender Section -------------------------------------- */
const gender = (data) => {
  var genName = document.getElementById("gender");
  var genArr = [];
  data.forEach((genderPara) => {
    genArr.push(genderPara["gender"]);
  });
  var mySet = new Set(genArr);
  var genHtml = `<h3>FILTERS</h3>`;
  for (let i of mySet) {
    genHtml += ` <input type="radio" name="gender" value=${i} onclick="genderFilter()" >${i}<br />`;
  }
  genName.innerHTML = genHtml;
};
function genderFilter() {
  var genderVal = document.querySelector('input[name="gender"]:checked').value;
  var data = productData.filter((radioData) => radioData.gender === genderVal);
  console.log(data);
   productCards(data);
}

/* Brand Section -----------------------------------------*/
const brands = (data) => {
  var brandContent = document.getElementById("brandId");
  var brName = [];
  data.forEach((ro) => {
    brName.push(ro["brand"]);
  });
  var brandName = new Set(brName);
  var htmlContent = `<h3>Brand</h3>`;
  for (let element of brandName) {
    htmlContent += `<input type="checkbox" name="brand" onclick="brandFilter()" value= ${element}>${element}<br />`;
  }
  brandContent.innerHTML = htmlContent;
};
/* Category Section----------------*/

const categories = (data) => {
  var cateVar = document.getElementById("CategoryId");
  var catArr = [];
  data.forEach((elem) => {
    catArr.push(elem["category"]);
  });
  var categoryData = new Set(catArr);
  var categoryHtml = `<h3>CATEGORIES</h3>`;
  for (let element of categoryData) {
    categoryHtml += ` <input type="checkbox" name="category" onclick="categoryFilter()" value=${element}>${element}<br />`;
  }
  cateVar.innerHTML = categoryHtml;
};
function categoryFilter() {
  var cateVal = document.querySelectorAll('input[name="category"]:checked');
  var cateData = [];
  cateVal.forEach((elem) => {
    elem.checked ? cateData.push(elem.value) : null;
  });
  var resultCate = [];
  cateData.forEach((val) => {
    console.log(val);
    resultCate = resultCate.concat(
      productData.filter((product) => product.category.includes(val))
    );
    //   console.log(resultCate);
  });
  console.log(resultCate);

  resultCate.length !== 0 ?  productCards(resultCate) :  productCards(productData);
}

function brandFilter() {
  var brandVal = document.querySelectorAll('input[name="brand"]:checked');
  var brandData = [];
  brandVal.forEach((elem) => {
    elem.checked ? brandData.push(elem.value) : null;
  });
  console.log(brandData);
  var resultBrand = [];
  brandData.forEach((val) => {
    resultBrand = resultBrand.concat(
      productData.filter((product) => product.brand.includes(val))
    );
  });
  resultBrand.length !== 0 ?  productCards(resultBrand) :  productCards(productData);
}

// };
function mySearch() {
  var searchKeyword = document.getElementById("search").value.toUpperCase();
  var searchResult = productData.filter((searchItem) =>
    searchItem.product.toUpperCase().includes(searchKeyword)
  );
   productCards(searchResult);
}
