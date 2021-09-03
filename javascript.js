fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
  .then((apiData) => apiData.json())
  .then((data) => data.products)
  .then((data) => {
    productCards(data);
    gender(data);
    category(data);
    brands(data);
    saveData(data);
    categoryFilter(data);
    brandFilter(data);
  });
var productData = [];
const saveData = (data) => {
  productData = data;
};

/*CARDS SECTION---------------------- */
var cards = (data) => {
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
  var GenName = document.getElementById("gender");
  var Gen_data = [];
  data.forEach((gen_der) => {
    Gen_data.push(gen_der["gender"]);
  });
  var Gender_Data = new Set(Gen_data);
  var gen_html = `<h3>FILTERS</h3>`;
  for (let i of Gender_Data) {
    gen_html += ` <input type="radio" name="gender" value=${i} onclick="genderFilter()" >${i}<br />`;
  }
  GenName.innerHTML = gen_html;
};
function genderFilter() {
  var genderVal = document.querySelector('input[name="gender"]:checked').value;
  var data = productData.filter((radioData) => radioData.gender === genderVal);
  console.log(data);
  cards(data);
}

/* Brand Section -----------------------------------------*/
const Brands = (data) => {
  var brand_content = document.getElementById("brandId");
  var brName = [];
  data.forEach((ro) => {
    brName.push(ro["brand"]);
  });
  var brandName = new Set(brName);
  var htmlContent = `<h3>Brand</h3>`;
  for (let element of brandName) {
    htmlContent += `<input type="checkbox" name="brand" onclick="brandFilter()" value= ${element}>${element}<br />`;
  }
  brand_content.innerHTML = htmlContent;
};
/* Category Section----------------*/

const Category = (data) => {
  var cate_gory = document.getElementById("CategoryId");
  var Cate_data = [];
  data.forEach((elem) => {
    Cate_data.push(elem["category"]);
  });
  var CategoryData = new Set(Cate_data);
  var categoryHtml = `<h3>CATEGORIES</h3>`;
  for (let element of CategoryData) {
    categoryHtml += ` <input type="checkbox" name="category" onclick="categoryFilter()" value=${element}>${element}<br />`;
  }
  cate_gory.innerHTML = categoryHtml;
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

  resultCate.length !== 0 ? cards(resultCate) : cards(productData);
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
  resultBrand.length !== 0 ? cards(resultBrand) : cards(productData);
}

// };
function mySearch() {
  var searchKeyword = document.getElementById("search").value.toUpperCase();
  var searchResult = productData.filter((searchItem) =>
    searchItem.product.toUpperCase().includes(searchKeyword)
  );
  cards(searchResult);
}
