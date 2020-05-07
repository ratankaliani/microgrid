export const REACT_APP_BACKEND_URL = "http://localhost:8000/api";
export const PRIMARY_0 = "#131842";
export const PRIMARY_1 = "#5598DF";
export const SECONDARY_0 = "#7C72DC";
export const SECONDARY_1 = "#BDBD89";

export const data1 = [
    {x: 0, y: 0},
    {x: 1, y: 0.2},
    {x: 2, y: 0.2},
    {x: 3, y: 0.4},
    {x: 4, y: 0.8},
    {x: 5, y: 0.6},
    {x: 6, y: 0.6},
    {x: 7, y: 0.2},
    {x: 8, y: 0.4},
    {x: 9, y: 0.2},
    {x: 10, y: 0.4},
];

export const data2 = [
    {x: 0, y: 0},
    {x: 1, y: 0.2},
    {x: 2, y: 0.4},
    {x: 3, y: 0.6},
    {x: 4, y: 0.8},
    {x: 5, y: 0.8},
    {x: 6, y: 0.8},
    {x: 7, y: 0.8},
    {x: 8, y: 1.6},
    {x: 9, y: 1.8},
    {x: 10, y: 2.0},
];

export const data3 = [
    {x: 0, y: 0},
    {x: 1, y: 2.3},
    {x: 2, y: 2.6},
    {x: 3, y: 3.7},
    {x: 4, y: 3.9},
    {x: 5, y: 2.7},
    {x: 6, y: 2.2},
    {x: 7, y: 2.4},
    {x: 8, y: 3.3},
    {x: 9, y: 3.0},
    {x: 10, y: 2.9},
];

export const data4 = [
    {x: 0, y: 0},
    {x: 1, y: 2.3},
    {x: 2, y: 3.3},
    {x: 3, y: 7.0},
    {x: 4, y: 10.9},
    {x: 5, y: 13.2},
    {x: 6, y: 15.4},
    {x: 7, y: 15.9},
    {x: 8, y: 19.2},
    {x: 9, y: 20.3},
    {x: 10, y: 23.2},
];

export const testUsers = {
    "0x01019876789": {
        userID: "0x01019876789",
        publicAddress: "0x01019876789",
        energyConsumed: data1,
        energyConsumedAgg: data2
    },
    "0x09876545678": {
        userID: "0x09876545678",
        publicAddress: "0x09876545678",
        energyConsumed: data3,
        energyConsumedAgg: data4
    }
}

export const discountContractAddress = "0xd46373E60D32a7179A589420485f578716Cb1496";
export const discountContractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "seller",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "closed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "energyAmount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "purchase",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_totalPrice",
				"type": "uint256"
			}
		],
		"name": "updateTotalPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_seller",
				"type": "address"
			}
		],
		"name": "updateSeller",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_totalPrice",
				"type": "uint256"
			},
			{
				"name": "_energyAmount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]