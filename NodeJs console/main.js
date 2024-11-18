const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let shoppingCart = [];
let items = [
  {
    name: 'Banana',
    price: 2,
    quantity: 10,
  },
  {
    name: 'Apple',
    price: 1,
    quantity: 10,
  },
  {
    name: 'Mango',
    price: 3,
    quantity: 10,
  },
  {
    name: 'Orange',
    price: 1,
    quantity: 10,
  },
  {
    name: 'Avocado',
    price: 5,
    quantity: 10,
  }
];

function addProduct(name, quantity) {
  if (!quantity) {
    console.log("Please provide quantity of the item\n");
    askQuestion();
  } else {
    const itemIndex = items.findIndex((item) => item.name === name);
    let price = items[itemIndex].price;
    if (itemIndex === -1) {
      console.log(`Product "${name}" not found.\n`);
      askQuestion();
      return;
    }

    const item = items[itemIndex];

    if (quantity > item.quantity) {
      console.log(
        `Error: Requested quantity exceeds available quantity for ${name}.\n`
      );
      askQuestion();
      return;
    }

    const cartItemIndex = shoppingCart.findIndex((item) => item.name === name);
    if (cartItemIndex !== -1) {
      shoppingCart[cartItemIndex].quantity += quantity;
      console.log(`Added ${quantity}x ${name} to the cart.\n`);
    } else {
      shoppingCart.push({ name: name, price: price, quantity: quantity });
      console.log(`Added ${quantity}x ${name} to the cart.\n`);
    }
    items[itemIndex].quantity -= quantity; 
    askQuestion();
  }

}
function viewCart() {
  console.log("Shopping cart contents:");
  shoppingCart.forEach((item) => {
    console.log(
      `${item.name} - ${item.quantity}x - ${item.price * item.quantity} $`
    );
  });
  askQuestion();
}
function viewShop() {
  console.log("Shop contents:");
  items.forEach((item) => {
    console.log(
      `${item.name} - ${item.quantity}x - ${item.price }$`
    );
  });
  askQuestion();
}

function removeProduct(name, quantity) {
  let removed = false; 
 
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];

    if (item.name === name) {
      if (quantity && quantity <= item.quantity) {
        
        shoppingCart[i].quantity -= quantity;
        console.log(`Removed ${quantity} ${name} from the cart.\n`);
      } else {
        
        shoppingCart.splice(i, 1);
        console.log(`Removed all ${name} from the cart.\n`);
      }
      removed = true; 
      break; 
    }
  }

  if (!removed) {
    console.log(`Product "${name}" not found in the cart.\n`);
  }

  askQuestion();
}


function showTotalPrice() {
  let totalPrice = 0;
  shoppingCart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  console.log(`Total price of the shopping cart: ${totalPrice} $`);
  askQuestion();
}

function buyAll() {
  let totalPrice = 0;
  shoppingCart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  if (userMoney < totalPrice) {
    console.log(`Error: Insufficient funds to buy all items from the Cart.\n`);
    console.log(`You need ${totalPrice}$.`);
    askQuestion();
    return;
  }
  userMoney -= totalPrice;
  shoppingCart.length = 0;
  console.log(`You bought all items for ${totalPrice} $.`);
  console.log(`Your remaining money: ${userMoney} $`);
  askQuestion();
}

function printHelp() {
  console.log(
    "addfunds->adds additional funds to your wallet \nfunction call->addfunds money\nexample->addfunds 10\n\n" +
    "add->adds an item to the cart \nfunction call->add name quantity\nexample->add apple 1\n\n" +
    "viewcart->displays the entire cart\nfunction call->viewcart\n\n" +
    "viewshop->displays the entire shop\nfunction call->viewshop\n\n" +
    "remove->removes an item from the cart or specific quantity of that item \n" +
    "function call->remove name quantity or remove name\nexample->remove apple 1 or remove apple\n\n" +
    "total->displays the total price of the cart\nfunction call->total\n\n" +
    "addfunds->adds aditional funds to user wallet\nfunction call->addfunds amount\nexample->addfunds 50\n\n" +
    "removefunds->removes  funds from users wallet\nfunction call->removefunds amount\nexample->removefunds 50\n\n" +
    "buy->Buys all content from the cart\nfunction call->buy\nexample->buy\n\n" +
    "help->displays this help message\nfunction call->help\n\n" +
    "close->closes the cart\nfunction call->close\n\n"
  );
  askQuestion();
}

function endShopping() {
  console.log("Thank you for shopping!");
  rl.close();
}

function askForMoney() {
  rl.question("Please enter the amount of money you have: ", (answer) => {
    setUserMoney(answer);
  });
}

function setUserMoney(money) {
  const parsedMoney = parseFloat(money);

  if (!Number.isInteger(parsedMoney)) {
    console.log("Please enter a valid integer number");
    askForMoney();
  } else {
    userMoney = parsedMoney;
    console.log(`You have: ${userMoney} $.`);
    askQuestion();
  }
}
function addFunds(money) {
  if(isNaN(money)){
    console.log("Please enter a valid number!\n");
    askQuestion();
  }
  else{
  userMoney += money;
  console.log(`You have: ${userMoney} $.`);
  askQuestion();
}
}
function removeFunds(money) {
  if(isNaN(money)){
    console.log("Please enter a valid number!\n");
    askQuestion();
  }
  else{
  userMoney -= money;
  console.log(`You have: ${userMoney} $.`);
  askQuestion();
}
}

function askQuestion() {
  console.log("For instructions on how to use commands, type help\n");
  rl.question(
    "Please enter a command (help, addfunds, removefunds, viewshop, add, viewcart, remove, total, buy, close): ",
    (answer) => {
      processInput(answer);
    }
  );
}

function processInput(input) {
  const words = input.split(" ");
  const command = words[0].toLowerCase();
  const options = words.slice(1);

  switch (command) {
    case "help":
      printHelp();
      break;
    case "addfunds":
      addFunds(parseInt(options[0]));
      break;
    case "removefunds":
      removeFunds(parseInt(options[0]));
      break;
    case "viewshop":
      viewShop();
      break;
    case "add":
      addProduct(options[0],parseInt(options[1]));
      break;
    case "viewcart":
      viewCart();
      break;
    case "buy":
      buyAll();
      break;
    case "remove":
      removeProduct(options[0],parseInt(options[1]));
      break;
    case "total":
      showTotalPrice();
      break;
    case "close":
      endShopping();
      break;
    default:
      console.log("Unknown command. Please try again.");
      askQuestion();
  }
}

askForMoney();
