pragma solidity ^0.5.1;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract CoShoe is ERC721{
    
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

    constructor () ERC721 () public {
        uint256 internal shoeSupply = 100;//mints 100 tokens
        Shoe storage shoe;
        shoe.name = "";
        shoe.image = "";
        shoe.sold = false;
        shoes.push(shoe);
    }

    function buyShoe (string name, string image) external payable {
        require(shoeSupply >= 1);//check shoe count condition
        require(msg.value == price);//check price condition
        shoe
        shoesSold ++;
    }

    function checkPurchases (address _tokenOwner) internal returns (bool[] memory index){
        return shoes[_tokenOwner]; //bool or uint256 _tokenId
    }
}