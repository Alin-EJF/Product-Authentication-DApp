export const contractAddress = "0xf5A9A483d1Ff407140Ca22C051cBfE16fF2F8F59";

export const contractAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "productDescription",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dateOfRegistration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "geoLocation",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "batch",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "certifications",
        type: "string[]",
      },
    ],
    name: "ProductRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "geoLocation",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dateOfRegistration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "updatedBy",
        type: "address",
      },
    ],
    name: "ProductUpdated",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "lastUpdatedBy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "productCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "products",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        internalType: "string",
        name: "productDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "dateOfRegistration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "batch",
        type: "string",
      },
      {
        internalType: "string",
        name: "manufacturer",
        type: "string",
      },
      {
        internalType: "string",
        name: "distributor",
        type: "string",
      },
      {
        internalType: "string",
        name: "retailer",
        type: "string",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isRegistered",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        internalType: "string",
        name: "productDescription",
        type: "string",
      },
      {
        internalType: "string",
        name: "geoLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "batch",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "certifications",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "manufacturer",
        type: "string",
      },
      {
        internalType: "string",
        name: "distributor",
        type: "string",
      },
      {
        internalType: "string",
        name: "retailer",
        type: "string",
      },
    ],
    name: "registerProduct",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "geoLocation",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "certifications",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "distributor",
        type: "string",
      },
      {
        internalType: "string",
        name: "retailer",
        type: "string",
      },
    ],
    name: "updateProduct",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "addOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getProduct",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productName",
            type: "string",
          },
          {
            internalType: "string",
            name: "productDescription",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "dateOfRegistration",
            type: "uint256",
          },
          {
            internalType: "string[]",
            name: "geoLocations",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "batch",
            type: "string",
          },
          {
            internalType: "uint256[]",
            name: "prices",
            type: "uint256[]",
          },
          {
            internalType: "string[]",
            name: "certifications",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "manufacturer",
            type: "string",
          },
          {
            internalType: "string",
            name: "distributor",
            type: "string",
          },
          {
            internalType: "string",
            name: "retailer",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isRegistered",
            type: "bool",
          },
        ],
        internalType: "struct ProductRegistration.Product",
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
