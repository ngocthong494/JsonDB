
// const { fake, address } = require("faker");
// const faker = require("faker");
// const fs = require("fs");

// // -----------------------------------------------------------
// // create users

// const randomUserList = (n) => {
//     if(n <= 0) return;
//     const userList = []

//     // loop and push category;

//     Array.from(new Array(n)).forEach(() => {

//         const user = {
//             id: faker.datatype.uuid(),
//             firstName: faker.name.firstName(),
//             lastName: faker.name.lastName(),
//             email: faker.internet.email(),
//             phone: faker.phone.phoneNumber(),
//             password: faker.finance.bic(),
//             retypePassword: faker.finance.bic(),
//             birthday: faker.date.past(),
//             sex: faker.name.prefix(),
//             address: faker.address.streetAddress(),
//             district: faker.address.streetName(),
//             city:  faker.address.cityName(),
//             createdAt: Date.now(),
//             updatedAt: Date.now(),
//         };

//         userList.push(user)
//     })
//     return userList;
// }

// // -----------------------------------------------------------
// // create categories

// const randomCategoryList = (n) => {
//     if(n <= 0) return;
//     const categoryList = []

//     // loop and push category;

//     Array.from(new Array(n)).forEach(() => {

//         const category = {
//             id: faker.datatype.uuid(),
//             name: faker.commerce.department(),
//             createdAt: Date.now(),
//             updatedAt: Date.now(),
//         };

//         categoryList.push(category)
//     })
//     return categoryList;
// }

// // -----------------------------------------------------------
// // create products


// const randomProductList = (categoryList, numberOfProducts) => {
//     if(numberOfProducts <= 0) return [];
//     const productList = []

//     // random data

//     for(const category of categoryList) {

//         Array.from(new Array(numberOfProducts)).forEach(() => {

//             const product = {
//                 categoryId: category.id,
//                 id: faker.datatype.uuid(),
//                 name: faker.commerce.productName(),
//                 price: Number.parseFloat(faker.commerce.price()),
//                 bigPicture: '',
//                 thumbnailUrl: [
//                 "http://landing.engotheme.com/html/hamadryad/demo/images/products/dotw/dotw4.jpg",
//                 "http://landing.engotheme.com/html/hamadryad/demo/images/products/dotw/dotw1.jpg",
//                 "http://landing.engotheme.com/html/hamadryad/demo/images/products/dotw/dotw2.jpg",
//                 "http://landing.engotheme.com/html/hamadryad/demo/images/products/dotw/dotw3.jpg"
//                  ],
//                 description: faker.commerce.productDescription(),
//                 rating: {},
//                 createdAt: Date.now(),
//                 updatedAt: Date.now(),
//             };
    
//             productList.push(product)
//         })
//     }

//     return productList;
// }


// // -----------------------------------------------------------
// // create images

// // const randomImageList = (productList, numberOfImageList) => {
// //     if(numberOfImageList <= 0) return [];
// //     const imageList = [];

// //     // random data

// //     for(const product of productList) {

// //         Array.from(new Array(numberOfImageList)).forEach(() => {

// //             const image = {
// //                 productId: product.id,
// //                 id: faker.datatype.uuid(),
// //                 thumbnailUrl: faker.image.imageUrl(400, 400),
// //                 createdAt: Date.now(),
// //                 updatedAt: Date.now(),
// //             };
    
// //             imageList.push(image)
// //         })
// //     }

// //     return imageList;
// // }

// // -----------------------------------------------------------
// // create orders

// const randomOrderList = (userList, numberOfOrder) => {
//     if(numberOfOrder <= 0) return [];
//     const orderlist = [];

//     // random data

//     for(const user of userList) {

//         Array.from(new Array(numberOfOrder)).forEach(() => {

//             const order = {
//                 userId: user.id,
//                 userName: user.firstName + user.lastName,
//                 addressName: "",
//                 id: faker.datatype.uuid(),
//                 createdAt: Date.now(),
//                 updatedAt: Date.now(),
//             };
    
//             orderlist.push(order)
//         })
//     }

//     return orderlist;
// }

// // -----------------------------------------------------------
// // create orderDetails

// const randomOrderDetailsList = (orderList, numberOfOrderDetails) => {
//     if(numberOfOrderDetails <= 0) return [];
//     const orderDetailList = [];

//     // random data

//     for(const order of orderList) {

//         Array.from(new Array(numberOfOrderDetails)).forEach(() => {

//             const orderDetail = {
//                 orderId: order.id,
//                 id: faker.datatype.uuid(),
//                 productId: "",
//                 quantity: 0,
//                 unitPrice: 0,
//                 totalPrice: 0,
//                 discount: 0,
//                 createdAt: Date.now(),
//                 updatedAt: Date.now(),
//             };
    
//             orderDetailList.push(orderDetail)
//         })
//     }

//     return orderDetailList;
// }

// // -----------------------------------------------------------
// // create address

// const randomAddressList = (n) => {
//     if(n <= 0) return [];
//     const addressList = [];

//     // random data
//         Array.from(new Array(n)).forEach(() => {

//             const address = {
//                 id: faker.datatype.uuid(),
//                 name: '',
//                 createdAt: Date.now(),
//                 updatedAt: Date.now(),
//             };
    
//             addressList.push(address)
//         })

//     return addressList;
// }

// // IFFE
// (() => {
//     // random data
//     const userList = randomUserList(3)
//     const categoryList = randomCategoryList(3)
//     const productList = randomProductList(categoryList, 10 )
//     // const imageList = randomImageList(productList, 4)
//     const orderList = randomOrderList( userList , 1)
//     const orderDetailList = randomOrderDetailsList(orderList, 1)
//     const addressList = randomAddressList(1)
//     // frepare db object
//     const db = {
//         users: userList,
//         categories: categoryList,
//         products: productList,
//         // images: imageList,
//         orders: orderList,
//         orderDetails: orderDetailList,
//         address: addressList,
//     };
//     // write db object to db.json
//     fs.writeFile('db.json', JSON.stringify(db), () => {
//         console.log('generate-data successfully')
//     });
// })();