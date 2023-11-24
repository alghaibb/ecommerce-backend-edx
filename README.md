# E-commerce Back End 

## Description

This project is a backend e-commerce application designed to manage product and category data efficiently. It serves as the core engine that powers the server-side functionality of an e-commerce platform. The primary objectives of this project include:

Building a robust backend infrastructure for e-commerce applications.
Managing product and category data using a MySQL database.
Implementing RESTful API endpoints for data retrieval and manipulation.
Ensuring data accuracy, security, and optimal performance.
The backend is developed using JavaScript, Node.js, Express.js, Sequelize, and MySQL. It provides essential APIs for creating, updating, and retrieving product and category information.

For a video demonstration of the backend's functionality, you can check this [video](https://drive.google.com/file/d/1Vl75_oR17BR3OGncweQynZ1ffzhAhp5T/view).

## Table of Contents

- [Demo](#demo)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Demo

- Check out the [video](https://drive.google.com/file/d/1Vl75_oR17BR3OGncweQynZ1ffzhAhp5T/view) of the project.

## Screenshots

![Screenshot #1](/assets/images/screenshot-1.png)


![Screenshot #2](/assets/images/screenshot-2.png)


![Screenshot #3](/assets/images/screenshot-3.png)


## Installation

```bash
npm install
```

## Usage

To use this backend e-commerce application, follow these steps:

Installation: Ensure that you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from nodejs.org. Clone the repository and navigate to the project folder in your terminal.

```bash
git clone https://github.com/yourusername/ecommerce-backend-edx.git
cd ecommerce-backend-edx
```

**Database Configuration**: Set up your MySQL database and update the database configuration in the project. You can do this by modifying the config/connection.js file with your database credentials.

**Install Dependencies**: Install the project dependencies using npm.

```bash
npm install
```

**Database Setup**: Run the database migration to create the necessary tables in your MySQL database.

```bash
npm run db:migrate
```

**Starting the Server**: Start the Node.js server.

```bash
npm start
```

**API Endpoints**: The backend provides several API endpoints for managing products and categories. You can interact with these endpoints using tools like Postman or by integrating them into your frontend application.

For example, you can use a tool like Postman or Insomnia to make GET, POST, PUT, and DELETE requests to the following endpoints:

**/api/products** - to manage products
**/api/categories** - to manage categories

Here's an example of making a GET request to retrieve all products:

```http
GET http://localhost:3001/api/products
```
**Customization**: Customize the backend as needed to fit your specific e-commerce application requirements. You can add authentication, implement additional API endpoints, or enhance the database schema.

**Testing**: Ensure to thoroughly test the backend's functionality, including error handling and data validation.

**Deployment**: Once you are satisfied with the backend, you can deploy it to a production environment to serve as the backend for your e-commerce application.

Feel free to refer to the project's code and documentation for more details on specific API endpoints and customization options.

If you have any questions or need further assistance, please don't hesitate to reach out.

## Technologies Used

-   JavaScript
-   Node.js
-   Express.js
-   Sequelize
-   MySQL

## Contributing

If you'd like to contribute to the project, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE).

## Contact

-   Mahmoud Jaderi
-   Email: mjaderi97@gmail.com
-   GitHub: [github.com/alghaibb](https://github.com/alghaibb)
-   Portfolio: [Visit my portfolio](https://alghaibb-portfolio.vercel.app/)

Feel free to reach out if you have any questions or feedback!
