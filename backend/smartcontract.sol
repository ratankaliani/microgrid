pragma solidity ^0.6.4;

contract CoinFlip {
    address public player1;
    bytes32 public player1Commitment;

    uint256 public betAmount;

    address public player2;
    bool public player2Choice;

    uint256 public expiration = 2**256-1;

    uint256 constant NULL = 0;

    constructor (bytes32 commitment) public payable {
        player1 = msg.sender;
        player1Commitment = commitment;
        betAmount = msg.value;
    }

}