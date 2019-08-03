pragma solidity ^0.5.1;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract CoShoe {
    
    struct Shoe{
        address owner;
        string name;
        string image; //url to the image
        bool sold;
    }
    //state variables
    uint price = 0.5 ether; //change to wei
    uint shoesSold = 0;
    Shoe[] public shoes;//public array

    constructor() public {
        //mints 100 tokens
        Shoe memory shoe;
        shoe.name = "";
        shoe.image = "";
        shoe.sold = false;
        shoes.push(shoe);
    }

    function buyShoe (string name, string image) external {
        require();//check condition
        shoesSold ++;
    }

    function checkPurchases () internal returns (bool[] memory index){
        
    }
}