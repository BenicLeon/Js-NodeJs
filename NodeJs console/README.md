# LV 2 zadatak - JavaScript komandne aplikacije

To use this application, follow these steps:

Run the script in a Node.js environment(node main.js).

Once the application starts, you will be prompted to enter the amount of money you have. Type in the amount and press Enter.

After entering your initial funds, you will see a message with instructions on how to use the commands. You can type help and press Enter to display these instructions at any time.

You can use the following commands:

addfunds: Adds additional funds to your wallet. Example: addfunds 10.

removefunds: Removes funds from your wallet. Example: removefunds 5.

viewshop: Displays the entire shop inventory.

add: Adds an item to your shopping cart. Example: add apple 2 (adds 2 apples to your cart).

viewcart: Displays the contents of your shopping cart.

remove: Removes an item from your shopping cart. Example: remove apple 1 (removes 1 apple from your cart).

total: Displays the total price of the items in your shopping cart.

buy: Buys all items from your shopping cart. If you have enough funds, the purchase will be completed, and the cart will be cleared. Otherwise, you'll be notified of insufficient funds.

help: Displays the list of available commands and their usage.

close: Closes the application.

After each command execution, you will be prompted again to enter a command. You can continue interacting with the application by entering commands until you decide to close it.

> help 
> > help function gives information how to use other functions and what is their function, and it provides examples how to use them.

> addfunds 
> > This function adds the specified amount of money to the user's wallet.

> removefunds 
> > This function removes the specified amount of money from the user's wallet. 

> addProduct
> > This function adds a specified quantity of a product to the shopping cart. If the quantity is not provided or is unavailable, the user will be prompted to enter it. If the product is unavailable or the quantity exceeds the available quantity, the user will be informed and prompted again.

> viewCart
> > This function displays the contents of the shopping cart, including the product name, quantity, and total price.

> viewShop
> > This function displays the contents of the available items to buy, including the product name, quantity, and total price.

> removeProduct
> > This function removes a specified quantity of a product from the shopping cart. If the quantity is not specified, the entire product is removed. If the product is not found in the cart, the user is notified.

> showTotalPrice 
> > This function displays the total price of all products in the shopping cart.

> buyAll 
> > This function buys all products from the shopping cart if the user has enough money. If the user doesn't have enough money, they are informed about the insufficient funds.

> printHelp
> > This function displays helpful information on how to use the program, including all available commands and examples of their usage.

> endShopping 
> >  This function concludes the shopping session and closes the program. 

> askForMoney 
> > This function prompts the user to enter the amount of money they have.

> setUserMoney
> > This function sets the user's available money to the specified amount.

> > close 
> help function gives information how to use other functions and what is their function, and it provides examples how to use them.  
