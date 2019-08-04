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
        address owner = msg.sender;
        _mint(msg.sender, 100);//mints 100 tokens
        shoes.push(Shoe(owner,"","",false));
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function buyShoe (string name, string image) external payable {
        require(shoesSold < 100, "No more shoes left.");//check shoe count condition
        require(msg.value == price, "Price is not enough.");//check price condition
        shoes.push(Shoe(transferOwnership(msg.sender),name,image,true)); //sell
        shoesSold ++;
    }

    function checkPurchases (address _tokenOwner) internal view returns (bool[] memory index){
        require(msg.sender == shoes[_tokenOwner],"Does not belong to the caller of the function";
        bool[] memory array = new bool[](shoes[_tokenOwner]);
        uint index = 0;
        for (uint i = 0; i < shoes.length; i++) {
            if (shoes[i] == _tokenOwner) {
                index[index] = true; //
            }
            else{
                array[index] = false;
            }
            index++; //increment index
        }
        return array;
    }
}