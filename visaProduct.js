class Product {
  constructor(img, productname, price, info, addProduct, removeProduct,readMoreButton, id, quantity) {
    this.img = img;
    this.productname = productname;
    this.price = price;
    this.info = info;
    this.addProduct = addProduct;
    this.removeProduct = removeProduct;
    this.readMoreButton = readMoreButton;
    this.id = id;
    this.quantity = quantity;
  }
}

const productList = document.querySelector("#productList");
const cartList = document.querySelector("#cartList");

const products = [];
const productsinCart = [];

 products.push(
    new Product("../images/honung.jpg", "Honung", "100", "lorem lorem","True","True","True", "0", "0"),
    new Product("../images/pläd.jpg", "Fäll", "2200", "lorem lorem lorem", "True","True","True", "1", "0"),
    new Product("../images/ull.jpg","Pysselull", "400", "Lorem", "True","True", "True","2", "0")
  );

  displayProducts();

function displayProducts() {
  for (const product of products) {

  //Skapa element
  const card = document.createElement("li");
  const img = document.createElement("img");
  const cardBody = document.createElement("div");
  const cardText = document.createElement("h5");
  const info = document.createElement("p");
  const amount = document.createElement("p");
  const cardFooter = document.createElement("div");
  const addProduct = document.createElement("button");
  const readMoreButton = document.createElement("button");
  
  //Styla element
  card.classList.add("card", "border-1", "border-secondary");
  img.classList.add("card-img-top");
  cardBody.classList.add("card-body");
  cardText.classList.add("card-text");
  info.classList.add("p");
  amount.classList.add("p");
  cardFooter.classList.add("card-footer");
  addProduct.classList.add(
    "btn",
    "mx-1", 
    "border"
  );
  readMoreButton.classList.add(
    "btn",
    "mx-2",
    "border"
  );

  readMoreButton.setAttribute("data-bs-toggle", "modal");
  readMoreButton.setAttribute("data-bs-target", `#modal`);
  readMoreButton.setAttribute("id", `hej${product.id}`);
  img.src = `${product.img}`;
  img.alt = "bild";
  cardText.innerText = `${product.productname}`;
  info.innerText = `${product.price} kr`;
  addProduct.innerText = "Lägg till";
  readMoreButton.innerText = "Mer info";

  //Sätta upp event på element
  addProduct.onclick = () => {
    addToCart(product);
  };

  readMoreButton.onclick = () =>{
    modal(product);
  };
 
  //Lägg till element i dom
  cardFooter.append(addProduct, readMoreButton);
  card.append(img, cardBody, cardText, info, cardFooter);
  productList.append(card);
  }
}

//add product to cart
function addToCart(item){
  if(productsinCart.includes(item)){
    return;
  }

  for (const prod of products) {
    if(prod.id === item.id){
      productsinCart.push(item);
      prod.quantity ++;
      console.log(productsinCart);
    }
  }
   cartList.replaceChildren();
   displayCart();
}

//Visa kundvagn
function displayCart(){

  cartHeader(); 

  for (const prod of productsinCart ) { 
    const card = document.createElement("li");
    const img = document.createElement("img");
    const cardBody = document.createElement("div");
    const cardText = document.createElement("button");
    const info = document.createElement("p");
    const amount = document.createElement("p");
    const cardFooter = document.createElement("div");
    const addProduct = document.createElement("button");
    const removeProduct = document.createElement("button");

    //Styla element
    card.classList.add("card", "size", "border-1", "border-secondary");
    img.classList.add("card-img-top");
    cardBody.classList.add("card-body");
    cardText.classList.add("btn");
    info.classList.add("p");
    amount.classList.add("p");
    cardFooter.classList.add("card-footer");
    addProduct.classList.add(
      "btn",
      "mx-1"
    );
    removeProduct.classList.add(
      "btn",
      "mx-1"
    );

    img.src = `${prod.img}`;
    cardText.innerText = `${prod.quantity}`;
    info.innerText = `${prod.price} kr/st`;
    addProduct.innerText = "+";
    removeProduct.innerText = "-";

    //Sätta upp event på element
    addProduct.onclick = () => {
      addAmountonItem(prod);
    };

    removeProduct.onclick = () =>{
      removeAmount(prod);
    };
   
    //Lägg till element i dom
    cardFooter.append(cardText, addProduct, removeProduct);
    card.append(img, cardBody, info, cardFooter);
    cartList.append(card);
  }
    totalPriceInCart();
}

//Lägg till antal
function addAmountonItem(pickedItem){
  for (const productsIn of productsinCart) {

    if(pickedItem.id === productsIn.id)
    {
      pickedItem.quantity ++;
      cartList.replaceChildren();
      displayCart();
    }
  }
   console.log(productsinCart);
}

// tabort antal 
  function removeAmount(item){
     for (const productsIn of productsinCart) {
      if(item.id === productsIn.id)
      {
        if(item.quantity > 0)
        {
             productsIn.quantity --;
             console.log(productsIn)  
        }
        if(productsIn.quantity === 0){
          var index = productsinCart.indexOf(productsIn);
          productsinCart.splice(index, 1);
        } 
      }  
        cartList.replaceChildren();
        displayCart();
    }
}

function sumProduct(product){
  for (const result of productsinCart) {
      
      let total = 0;
      
      total+= (result.price * result.quantity);
      product.price = total;

      console.log(total);
  } 
}
 
function totalPriceInCart(){
  let total = productsinCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (total > 0){
      const cardCart = document.createElement("li");
      const priceCart = document.createElement("p");
  
      cardCart.classList.add("card","sizeSum");
      priceCart.classList.add("p");
      priceCart.innerText = `Summa: ${total} kr`;

        cardCart.append(priceCart);
        cartList.append(cardCart);
    }
}

function cartHeader(){
  const cardH3 = document.createElement("h3")
  
  cardH3.classList.add("h3");
  cardH3.innerText = "Kundvagn";
  cartList.append(cardH3); 
}

function modal(product){

  const modalw = document.querySelector(`#hej${product.id}`);
  const modal = document.createElement("modal");
  const modalBody = document.createElement("modal-body");
  const modalDialog = document.createElement("modal-dialog");
  const modalContent = document.createElement("modal-content");
  const modalHeader = document.createElement("modal-header");
  // const button = document.createElement("btn");
 
  modal.classList.add('modal', 'fade');
  modalDialog.classList.add('modal-dialog');
  modalContent.classList.add('modal-content');
  modalHeader.classList.add('modal-header');
  modalBody.classList.add('modal-body');

  modal.setAttribute("id", `modal`);

  modalHeader.innerText = `${product.productname}`;
  modalContent.innerText = "Innehållsförteckning:";
  
  modal.appendChild(modalBody);
  modalBody.appendChild(modalDialog);
  modalDialog.appendChild(modalContent);
  modalContent.appendChild(modalHeader);
  modalw.appendChild(modal);
}