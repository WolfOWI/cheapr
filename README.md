<!-- Repository Information & Links-->
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/WolfOWI/cheapr?color=red)
![GitHub watchers](https://img.shields.io/github/watchers/WolfOWI/cheapr?color=red)
![GitHub language count](https://img.shields.io/github/languages/count/WolfOWI/cheapr?color=red)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/WolfOWI/cheapr?color=red)
[![Behance][behance-shield]][behance-url]

<!-- HEADER SECTION -->
<h5 align="center" style="padding:0;margin:0;">Wolf Botha</h5>
<h5 align="center" style="padding:0;margin:0;">21100255</h5>
<h6 align="center">Development 200 Term 4 - 2024</h6>
</br>
<p align="center">

  <a href="https://github.com/WolfOWI/cheapr">
    <img src="frontend/src/assets/logos/logo_color.svg" alt="Logo" width="140" height="140">
  </a>
  
  <h3 align="center">Cheapr</h3>

  <p align="center">
    Shop Smarter, Not Harder<br>
      <a href="https://github.com/WolfOWI/cheapr"><strong>Explore the docs »</strong></a>
   <br />
   <br />
   <a href="https://main.d3vqv1xbk5be9s.amplifyapp.com/">Visit Site</a>
   .
   <a href="https://youtu.be/aAPpwbr8Lz8">Video Demo</a>
    ·
    <a href="https://github.com/WolfOWI/cheapr/issues">Report Bug</a>
    ·
    <a href="https://github.com/WolfOWI/cheapr/issues">Request Feature</a>
</p>
<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [What is CHEAPR?](#what-is-cheapr)
  - [Open Brief Document](#open-brief-document)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Features and Functionality](#features-and-functionality)
  - [Home Page](#home-page)
  - [Login \& Signup Page](#login--signup-page)
  - [Groceries Page](#groceries-page)
  - [Individual Product Page](#individual-product-page)
  - [Store Planner Page](#store-planner-page)
  - [Add Product Page](#add-product-page)
  - [Admin: All Listed Page](#admin-all-listed-page)
  - [Admin: New Products Page](#admin-new-products-page)
  - [Admin: Flagged Products Page](#admin-flagged-products-page)
  - [Admin: Rejected Products Page](#admin-rejected-products-page)
  - [Admin: Create Menu](#admin-create-menu)
  - [Admin: Create Subcategory Page](#admin-create-subcategory-page)
  - [Admin: Create Product Type Page](#admin-create-product-type-page)
  - [Admin: Create Product Page](#admin-create-product-page)
  - [Admin: Edit Product Page](#admin-edit-product-page)
- [Concept Process](#concept-process)
  - [Wireframing \& Old Designs](#wireframing--old-designs)
- [Development Process](#development-process)
- [Milestone Check Document](#milestone-check-document)
  - [Implementation Process](#implementation-process)
    - [Highlights](#highlights)
    - [Challenges](#challenges)
  - [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
  - [Mockups](#mockups)
  - [Video Demonstration](#video-demonstration)
  - [Deployed Links](#deployed-links)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)
- [Contact](#contact)

<!--PROJECT DESCRIPTION-->

## About the Project

<!-- header image of project -->

![image1][image1]

### What is CHEAPR?

CHEAPR is a community-driven grocery platform designed to help users find the best deals across four grocery stores. CHEAPR attempts to lessen the financial pressures of the rising cost of food & groceries in a post-COVID South Africa, allowing shoppers to easily browse and compare the cheapest prices of different groceries in Pick n Pay, Woolworths, Checkers and Spar.
[Visit CHEAPR](https://main.d3vqv1xbk5be9s.amplifyapp.com/)

### Open Brief Document

This project was based on this [Open Brief Proposal Document](<docs/Open_Brief_Proposal_Document(Cheapr).pdf>).

### Built With

- [Firebase](https://firebase.google.com/)
- [ExpressJS](https://expressjs.com/)
- [React](https://react.dev)
- [React Router](https://reactrouter.com/en/main)
- [Node.js](https://nodejs.org/en)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of [Node.js](https://nodejs.org/) installed on your machine.

### Installation Steps

Follow these steps to clone, configure, and run the Cheapr project on your local machine.

1. **Clone the Repository**:

   - Open GitHub Desktop.
   - Select `File` -> `Clone repository...`.
   - In the `URL` tab, enter `https://github.com/WolfOWI/cheapr.git`, choose your local path, and click `Clone`.

2. **Install Dependencies**:

   - **Frontend**:  
     Open a terminal, navigate to the `frontend` folder, and install the dependencies:

     ```sh
     cd frontend
     npm install
     ```

   - **Backend**:  
     Open a separate terminal, navigate to the `backend` folder, and install backend dependencies:
     ```sh
     cd backend
     npm install
     ```

3. **Set Up Firebase Project**:

   - **Create a Firebase Project**:
     Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

   - **Database**:

     - Create a Realtime Database in Firebase.
     - Set up security rules to restrict read and write access based on authentication.
     - Included in the root of the CHEAPR repository is a [database backup](cheapr-database-backup.json).
     - Import the provided backup file on Firebase to populate the initial data. (Please note: you will have to manually add images to each product.)

   - **Authentication**:

     - In Firebase, enable Email/Password authentication under **Authentication** > **Sign-in Method**.

   - **Storage**:
     - Enable Firebase Storage for image uploads and update security rules to restrict access based on user authentication.

4. **Set Up Environment Variables**:

   - **Backend Environment Variables**:

     - In the `backend` folder, create a `.env` file with the following content:

       ```sh
       FIREBASE_PROJECT_ID=your_project_id
       FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
       FIREBASE_PRIVATE_KEY=""
       FIREBASE_CLIENT_EMAIL=your_firebase_client_email
       FIREBASE_DATABASE_URL=https://<your_project_id>-default-rtdb.firebaseio.com
       FIREBASE_STORAGE_BUCKET=<your_bucket_name>.appspot.com
       ```

     - Replace placeholders with your Firebase project credentials.

   - **Frontend Environment Variables**:
     - In the `frontend` folder, create a `.env` file with:
       ```sh
       REACT_APP_API_URL=http://localhost:3001
       ```

5. **Run the Backend Server**:

   - In the `backend` directory, start the backend server:
     ```sh
     npm start
     ```
   - The backend server will run at `http://localhost:3001`.

6. **Run the Frontend Server**:

   - In the `frontend` directory, start the frontend server:
     ```sh
     npm start
     ```
   - The frontend server will run at `http://localhost:3000`.

7. **Access the Application**:

   - Open `http://localhost:3000` in your browser to access the Cheapr application.

By following these steps, you will have the CHEAPR project up and running on your local machine with your API keys securely stored in the `.env` file. This ensures that your keys are not publicly displayed or included in your repository.

## Features and Functionality

### Home Page

The Home page serves as an overall explanation of what users can expect on the CHEAPR website. The page includes a welcoming hero header, a brief introduction to why users should use CHEAPR, the stores featured on CHEAPR as well as a final call to action to sign up.

![feature1][fimage1]

### Login & Signup Page

The Login and Signup feature allows users to create an account or log in to the CHEAPR platform. Once logged in, users can access personalised features, such as managing their shopping planner or browsing all the different products.

![feature2][fimage2]
![feature3][fimage3]

### Groceries Page

The Groceries page is the main hub for users to browse and discover the cheapest prices of a wide variety of grocery items available across the 4 South African stores. The cheapest price / prices are highlighted in red, and if a price is on a temporary special discount, a symbol would appear next to each price. Users can filter products by category, subcategory, and product type, to easily find what they need. Additionally, they can sort items based on factors like price or alphabetically, and add selected products to their shopping planner (aka the cart).

![feature4][fimage4]

### Individual Product Page

The Individual Product page provides users with detailed information about a specific product prices across various stores. Users can see the date of when each price was updated, check if a product is on special, and decide which store offers the best deal. There are also options to add more than 1 of the product to a shopping planner directly from this page. The user can also update any price(s) with the Update Pricing popup modal, or report a product and write a message that will flag the item, removing it from the public listings, and send it an admin for review.

![feature5][fimage5]

### Store Planner Page

The Store Planner page is a personalised feature that allows users to organises and groups their grocery shopping list based on the cheapest price, making it easier to plan what items to buy where. Users can increase/decrese the quantity of an item, delete it, or "jump" the item to another store that has the same price (which occurs frequently). Furthermore, the total cost of all the items (and their quantities), as well as how much is saved by using CHEAPR is indicated at the bottom of the page.

![feature6][fimage6]

### Add Product Page

On the Add Product Page (same concept & design as Admin Create Product Page listed further down below), users can create new products by filling in the text fields, and clicking submit. The newly submitted products will appear on the Admin's "New Products Page" for review, and once accepted, will be listed on CHEAPR.

### Admin: All Listed Page

The Admin All Listed Products page provides administrators with a complete overview of all public products currently listed on CHEAPR. Admins can manage each listings, and either update product details or delete items, to ensure data accuracy across the platform.

![feature7][fimage7]

### Admin: New Products Page

The Admin New Products page allows administrators to review newly added products by regular users. Admins can approve or reject these items based on quality standards, ensuring that only verified products are listed on the CHEAPR platform.

![feature8][fimage8]

### Admin: Flagged Products Page

The Admin Flagged Products page displays products that have been flagged by users for potential issues, such as incorrect pricing or outdated information. Admins can read the message submitted by the user, review flagged items, make corrections, reject them if necessary, or re-approve the item, ensuring that the platform remains reliable and user-friendly.

![feature9][fimage9]

### Admin: Rejected Products Page

The Admin Rejected Products page is where administrators can view products that have been rejected by admins. This page allows admins to review these items further, and either approve them or delete them completely from the database.

![feature10][fimage10]

### Admin: Create Menu

The Admin Create Menu is a transition page, that provides admins with the option to add new subcategories, product types, or individual products, by simply clicking/tapping on one of the menu buttons.

![feature11][fimage11]

### Admin: Create Subcategory Page

This page allows administrators to add subcategories within a main grocery category (Food, Drinks, Household). For convenience, the existing subcategories are displaying underneath. The admin can select which category the new subcategory will fall under, and enter the name to create it.

![feature12][fimage12]

### Admin: Create Product Type Page

Similar to the "Admin: Create Subcategory Page", the Create Product Type Page allows admins to create a new product type (a sub-subcategory), by selecting the main category, subcategory, and entering the product type name. The existing product types are also displayed for convenience and to prevent doubled creation.

![feature13][fimage13]

### Admin: Create Product Page

The Admin Create Product page is where admins can add new products, by entering the name, measurement, unit, select the appropriate categorisation, upload an image (max 2MB), and the pricing information. Unlike the standard user's "Add Product Page", this page immediately creates and lists a product on CHEAPR, and does not require approval first, since an administrator is creating it.

![feature14][fimage14]

### Admin: Edit Product Page

This page is for administrators to modify the details of existing products, which not only includes the pricing, but all other information as well as changing the product image. This page is essential for keeping product information current and correct, such as adjusting prices or updating spell mistakes, etc., ensuring that users have access to the most accurate data.

![feature15][fimage15]

## Concept Process

The `Conceptual Process` for CHEAPR involved creating a comprehensive project brief to outline the application's objectives, core requirements, and desired user experience. Key tasks included defining a color palette and design elements within Figma and ensuring consistency in the design system with TailwindCSS and Bootstrap. The design phase centered on creating high-fidelity wireframes in Figma, which served as a foundational reference for development. As development progressed, designs were occasionally adapted to reflect new requirements and technical considerations.

![image5][image5]

![image6A][image6A]

![image6B][image6B]

### Wireframing & Old Designs

![image7A][image7A]

![image7B][image7B]

![image7C][image7C]

## Development Process

The Development Process focused on building both the frontend and backend of CHEAPR, implementing essential functionality, and tackling development challenges. This section outlines key features, highlights, and solutions to the issues encountered during implementation.

### Milestone Check Document

During the development process, the milestone check document acted as a checklist of all functionality and features to be completed. Please note, that this document is now outdated, as all checklist items have been completed. [Milestone Check Document](docs/Milestone_Check_Document.pdf)

### Implementation Process

- Integrated Firebase authentication for user sign-up and login, providing secure, role-based access to the platform.
- Developed dynamic price comparison functionality, allowing users to view grocery products from various stores, filter by categories, and easily identify the best deals.
- Created a responsive and user-friendly frontend with React, Bootstrap, and TailwindCSS, optimised for seamless use across devices.
- Established a shopping planner feature, allowing users to save selected items and plan their shopping.
- Built an admin dashboard with tools for managing product listings, reviewing flagged items, approving new products, and overseeing user-submitted data.
- Implemented Firebase Realtime Database for storing product data and used Firebase Storage for managing product images, ensuring efficient data management and secure storage.

#### Highlights

- **Personalised Shopping Planner:** Developed a user-driven planner feature that automatically calculates and groups products under the cheapest store, with the ability to "jump" or move items if they are the same price.
- **Category & Product Data Structuring:** Structured data in Firebase in such a way that product information is kept separate from the categorisation of each item - only a productId is stored under the product type in the categories node, thus keeping the data neat and organised.

#### Challenges

- **Complex Data:** Managing and organising large volumes of product data, categories, subcategories, and prices across multiple stores presented a significant challenge. Ensuring the right balance between data normalisation and ease of access was essential to avoid redundancy and keep the system fast, especially as the dataset grew.

- **State Consistency:** Maintaining a consistent state across the app, particularly for user actions like adding/removing items from the planner, required diligent state management and testing.

### Future Implementation

- **Additional Stores**: Include more South African grocery stores, providing users with a broader range of options and price comparisons.

- **Web Scraping Price Data**: Implement web scraping or API integrations to automatically gather up-to-date product prices from various online grocery stores (if allowed/legal).

- **Cart Product Notifications**: Implement a feature where users can receive notifications when their carted products drop in price, helping them save money on regular purchases.

## Final Outcome

### Mockups

![image9][image9]
<br>
![image10][image10]

<!-- VIDEO DEMONSTRATION -->

### Video Demonstration

To see a run through of the application, click below:

[View Demonstration](https://youtu.be/aAPpwbr8Lz8)

### Deployed Links

To test the website out yourself, visit these URLs:

[AWS Deployment](https://main.d3vqv1xbk5be9s.amplifyapp.com/) (More Stable)

[Heroku Deployment](https://cheapr-aa8d65bdb223.herokuapp.com/)

Please Note: The Heroku deployment operates under a limited RAM capacity due to pricing constraints. As a result, there may be instances where the server reaches its memory limit, potentially affecting website performance. However, this occurs infrequently under normal use. For optimal and more consistent performance during testing, we recommend using the AWS Amplify deployment link.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/WolfOWI/cheapr/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- AUTHORS -->

## Authors

- **Wolf Botha** - [WolfOWI](https://github.com/WolfOWI)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.\

<!-- LICENSE -->

## Contact

- **Wolf Botha** - [wolfmeyerbotha@gmail.com](mailto:wolfmeyerbotha@gmail.com)
- **Project Link** - https://github.com/WolfOWI/cheapr

<!-- MARKDOWN LINKS & IMAGES -->

[image1]: docs/readme_media/mockupA.png
[fimage1]: docs/readme_media/01HomePage.png
[fimage2]: docs/readme_media/02SignUp.png
[fimage3]: docs/readme_media/03Login.png
[fimage4]: docs/readme_media/04Groceries.png
[fimage5]: docs/readme_media/05Individual.png
[fimage6]: docs/readme_media/06Planner.png
[fimage7]: docs/readme_media/07AdminMain.png
[fimage8]: docs/readme_media/08AdminNew.png
[fimage9]: docs/readme_media/09AdminFlag.png
[fimage10]: docs/readme_media/10AdminReject.png
[fimage11]: docs/readme_media/11AdminCreate.png
[fimage12]: docs/readme_media/12AdminSubCat.png
[fimage13]: docs/readme_media/13AdminPType.png
[fimage14]: docs/readme_media/14AdminProductCreate.png
[fimage15]: docs/readme_media/15AdminEditProd.png
[image5]: docs/readme_media/ConceptualPrcoess.png
[image6A]: docs/readme_media/Colours.png
[image6B]: docs/readme_media/tailwindConfigImage.png
[image7A]: docs/readme_media/oldDesign01.png
[image7B]: docs/readme_media/oldDesign02.png
[image7C]: docs/readme_media/oldDesign03.png
[image9]: docs/readme_media/mockupB.png
[image10]: docs/readme_media/mockupC.png

<!-- Refer to https://shields.io/ for more information and options about the shield links at the top of the ReadMe file -->

[behance-shield]: https://img.shields.io/badge/-Behance-black.svg?style=flat-square&logo=behance&colorB=555
[behance-url]: https://www.behance.net/wolfbotha
