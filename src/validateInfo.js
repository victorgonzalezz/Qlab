import valid from "card-validator";

export default function validateInfo(values) {
  
  let errors = {};
  let creditCard = valid.number(values.cardNumber);
  let cardExpiration = `${values.expirationMonth -1}/${values.expirationYear}`

  creditCard.cardholderName = valid.cardholderName(values.cardName);
  creditCard.expirationDate = valid.expirationDate(cardExpiration);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);

  errors.show = true;
  errors.variant = "danger";
  errors.message = "An unknown error occured. Please try again later"
  errors.cname = false;
  errors.cnumber = false;
  errors.ctype = false;
  errors.cexp = false;
  errors.ccvv = false;
  errors.cpostal = false;

  // 1 Card Number Verification
  if (values.cardNumber === null || !values.cardNumber.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
  }
  // 2 Cardholder Name Verification
  if (values.cardName === null || !values.cardName.trim()) {
    errors.message = "Name is not complete";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Name is invalid";
  }

    // 3, 4 Card Expiration Verification
    if (values.expirationMonth === null || !values.expirationMonth.trim() || values.expirationYear === null || !values.expirationYear.trim()){
      errors.message = "Credit card expiration date is not complete";
    } else if (creditCard.expirationDate.isValid) {
      errors.cexp = true;
    } else {
      errors.message = "Credit card expiration date is invalid";
    }


    //5 Card CVV expiration
    if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
      errors.message = "CVV is not complete";
    } else if (creditCard.cvv.isValid) {
      errors.ccvv = true;
    } else {
      errors.message = "CVC is invalid";
    }
  

  if (
    errors.cname &&
    errors.cnumber &&
    errors.cexp &&
    errors.ccvv
  ) {
    errors.variant = "success";
    errors.message = "Credit Card is valid";
  }
  
  return errors;
}