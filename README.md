# FTCfinalExam21
Final exam: Fintech and Cryptocurrencies question 2.1
Tasks
1. Create a truffle project
2. Write a smart contract called CoShoe that holds non-fungible tokens:
  a. Each shoe is a struct called Shoe comprised of:
    i. owner (address)
    ii. name (string)
    iii. image (string: url to the image)
    iv. sold (bool)
  b. Define a state variable called price and set it to 0.5 Ether, converted to Wei.
  c. Define a state variable called shoesSold that holds the number of shoes that
  have already been sold. Set it to 0.
  d. Define a public array called shoes that holds instances of Shoe
  e. Implement a constructor that mints 100 CoShoe tokens. The owner of each
  token is the address deploying the contract, name and image are empty strings
  (“”), and sold is equal to false. Add the instances of Shoe to the array
  shoes.
  f. Implement a function called buyShoe that
    i. Takes the input parameters name, image
    ii. Checks that there is still a pair of shoes left that has not been sold yet,
    otherwise it throws an error
    iii. Checks that the value that is attached to the function call equal the
    price, otherwise it throws an error
    iv. Transfers the ownership of a Shoe to the caller of the function by setting
    owner within the Shoe struct, setting name and image to the input
    variables, and changing sold to true
    v. Don’t forget to update soldShoes
  g. Implement a function called checkPurchases that
    i. returns an array of bools that are set to true if the equivalent index in
       shoes belongs to caller of this function
       Example: [true, false, false, false, false, true, false, false, …]
    ii. Remember to implement it in a gas saving manor
3. Test the following functionalities:
  a. 100 tokens are minted on deployment
  b. buyShoe correctly transfers ownership, sets the name and the image, sets sold, and updates soldShoes count
  c. buyShoe reverts if the price is not equal to 0.5 ether
  d. checkPurchases returns the correct number of trues
4. Compile your contract
5. Include a 2_deploy_contract.js in the migrations folder
6. Deploy your contract to a network of your choice (this can be an emulated network)
