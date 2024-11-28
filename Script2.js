window.onload = function(e){
    e.preventDefault(); 

var Myproducts = localStorage.getItem("products");

    if(! Myproducts ){
        alert("no products found");
        return;
    }

    const Mproducts = JSON.parse(Myproducts);

    if ( Mproducts.length == 0){
        alert("no products found");
        return;
    }

    const productContainer = document.querySelector(".Selproducts");

        for (let i = 0; i < Mproducts.length; i++) {
            productContainer.innerHTML += `
            <div class="product">
                <img src="${Mproducts[i].image}" alt="${Mproducts[i].name}" style="width: 190px; height: auto;">
                <label><strong>${Mproducts[i].name}</strong></label>
                <p>Price: ${Mproducts[i].price}</p>
                <p>Description: ${Mproducts[i].description}</p>
            </div>
        `;            
        }

    }
