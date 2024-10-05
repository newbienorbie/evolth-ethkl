const users = [
  {
    image: "https://randomuser.me/api/portraits/men/70.jpg",
    name: "John Doe",
    uid: "000001",
    email: "john.doe@example.com",
    balance: "$1234.56",
    ownership: [
      {
        logo: "../../public/bmw.svg",
        id: 1,
        title: "BMW",
        fractionHolding: "29 (1%)",
        status: "Active",
        value: "238 ETH ($51)",
      },
      {
        logo: "../../public/nike.svg",
        id: 2,
        title: "Nike",
        fractionHolding: "15 (2%)",
        status: "Active",
        value: "150 ETH ($35)",
      },
    ],
  },
  {
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    name: "Jane Smith",
    uid: "000002",
    email: "jane.smith@example.com",
    balance: "$789.10",
    ownership: [
      {
        logo: "../../public/google.svg",
        id: 1,
        title: "Google",
        fractionHolding: "10 (3%)",
        status: "Active",
        value: "300 ETH ($75)",
      },
      {
        logo: "../../public/netflix.svg",
        id: 1,
        title: "Netflix",
        fractionHolding: "10 (3%)",
        status: "Sold",
        value: "300 ETH ($75)",
      },
    ],
  },
  {
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    name: "Alice Johnson",
    uid: "000003",
    email: "alice.johnson@example.com",
    balance: "$456.78",
    ownership: [
      {
        logo: "../../public/redbull.svg",
        id: 1,
        title: "Red Bull",
        fractionHolding: "20 (4%)",
        status: "Active",
        value: "500 ETH ($100)",
      },
      {
        logo: "../../public/youtube.svg",
        id: 1,
        title: "Red Bull",
        fractionHolding: "20 (4%)",
        status: "On Sale",
        value: "500 ETH ($100)",
      },
      {
        logo: "../../public/f-logo1.png",
        id: 1,
        title: "Red Bull",
        fractionHolding: "20 (4%)",
        status: "Sold",
        value: "500 ETH ($100)",
      },
    ],
  },
];

export default users;
