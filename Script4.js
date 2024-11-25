
document.getElementById("DeleteOffer").onclick = function (e) {
    e.preventDefault(); 

    let MyOffers = document.getElementsByClassName("offers"); 
    let MyCheckBox = document.getElementsByClassName("offer");

    let ischecked = false ;
    let OffersSelected = [] ;

   for(let i = MyCheckBox.length - 1 ; i >= 0 ; i-- ){

    if(MyCheckBox[i].checked ){
        ischecked = true ;
        OffersSelected.push (i);
    }
   }

   if ( confirm("Do you want to delete Offer?") ){

   for(let i = OffersSelected.length - 1 ; i >= 0 ; i-- ){
    let index = OffersSelected[i];
            MyOffers[index].remove();
      }
    }

if (!ischecked){
    alert("Please select at least one offer.");
    }

    alert("Selected offers have been deleted.");
};



// the form java script..

document.getElementById("AddO").onclick = function (e) {
    e.preventDefault(); 
    
    var OfferImage = document.getElementById("addImage").files[0];// chatgbt
    var OfferLabel = document.getElementById("offersLabel").value;
    var offersDescription = document.getElementById("offerDescription").value;

    if (offersDescription == "" || OfferLabel == "" || !OfferImage){
        alert("You should fill all inputs"); 
        return;
    }

    // check label..
    var isString = OfferLabel.search(/^[A-Z][a-z]+(?: [A-Z][a-z]+)*\.?$/);      
    if( isString == -1 ){
        alert("The label Must start with capital letter and at least two words");
        return ;
    }

    // check Discription 
    var offerDescriptionCheck = offersDescription.search(/^[A-Z][a-z]+(?: [a-z]+)*\.?$/); 
    if( offerDescriptionCheck == -1 ){
        alert("The Description Must start with capital letter");
        return;
    }

    //add Offer
var MyNewOffer = {
    label: OfferLabel,
    image: URL.createObjectURL(OfferImage),
    description: offersDescription
};

    document.getElementById("offersList").innerHTML += 
    ` <div class="offers">
      <input type="checkbox" class="offer" />
      <img src="${MyNewOffer.image}" alt="" width="90" height="90" class="MyPic" />
      <label for="offer1" class="OfferLabel">${MyNewOffer.label}</label>
      <p id = "Desc">${MyNewOffer.description} </p>

    </div`;

    alert("offer added sucssesfuly");
    };

