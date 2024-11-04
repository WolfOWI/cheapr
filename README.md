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
   <a href="https://youtu.be/K2DtZRP9LBY?si=4abhtoUpneIFh21x">View Demo</a>
    ·
    <a href="https://github.com/WolfOWI/cheapr/issues">Report Bug</a>
    ·
    <a href="https://github.com/WolfOWI/cheapr/issues">Request Feature</a>
</p>
<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [What is Rosemont Estates?](#what-is-rosemont-estates)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features and Functionality](#features-and-functionality)
  - [Login \& Signup](#login--signup)
  - [Home](#home)
  - [Listing (With Filtering)](#listing-with-filtering)
  - [Individual Listing](#individual-listing)
  - [Edit Listing](#edit-listing)
  - [Create Listing](#create-listing)
  - [Profile](#profile)
  - [Admin New Listings Dash](#admin-new-listings-dash)
  - [Admin Potential Buyers](#admin-potential-buyers)
  - [Admin Potential Tenants](#admin-potential-tenants)
  - [Admin Closed Deals](#admin-closed-deals)
  - [Admin Rejected Homes](#admin-rejected-homes)
- [Concept Process](#concept-process)
  - [Ideation \& Wireframing](#ideation--wireframing)
  - [ER Diagram](#er-diagram)
- [Development Process](#development-process)
  - [Implementation Process](#implementation-process)
    - [Highlights](#highlights)
    - [Challenges](#challenges)
  - [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
  - [Mockups](#mockups)
  - [Video Demonstration](#video-demonstration)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)
- [Contact](#contact)

<!--PROJECT DESCRIPTION-->

## About the Project

<!-- header image of project -->

![image1][image1]

### What is Rosemont Estates?

Rosemont Estates is a luxury real estate platform designed to connect discerning buyers and renters with the most exquisite properties on the market. Whether you're looking for a serene getaway, a stately mansion, or an elegant modern home, Rosemont Estates offers a curated selection of high-end properties to meet every need. Our platform provides a seamless experience for users to browse, compare, and connect with agents, ensuring that every transaction is handled with the utmost professionalism and care.

### Built With

- [React](https://react.dev)
- [React Router](https://reactrouter.com/en/main)
- [PHP](https://www.php.net/)
- [MySQL](https://www.mysql.com/)
- [Node.js](https://nodejs.org/en)
- [Leaflet Geosearch](https://www.npmjs.com/package/leaflet-geosearch)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chakra UI](https://v2.chakra-ui.com/)
- [Material UI Icons](https://mui.com/material-ui/material-icons/)

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of [Node.js](https://nodejs.org/) installed on your machine.

### Installation

Here are the steps to clone this repository, set up the MySQL database, and run the project locally:

1. **Clone the Repository**:

   - Open GitHub Desktop or your terminal/command prompt.
   - If using GitHub Desktop:
     - Click on `File` -> `Clone repository...`.
     - In the `URL` tab, enter `https://github.com/WolfOWI/cheapr.git` and choose the local path where you want to save the repository.
     - Click `Clone`.
   - If using the terminal:
     - Run the following command to clone the repository:
       ```sh
       git clone https://github.com/WolfOWI/cheapr.git
       ```
   - Navigate to the cloned repository directory:
     ```sh
     cd cheapr
     ```

2. **Install Dependencies**:

   - Ensure you are in the `root` directory inside the cloned repository.
   - Run the following command to install all required dependencies:
     ```sh
     npm install
     ```

3. **Set Up MySQL Database**:

   - Ensure that you have MySQL installed on your machine. You can download it from [MySQL](https://www.mysql.com/).
   - Open your MySQL client (like phpMyAdmin, MySQL Workbench, or the command line).
   - Create a new database for the project:
     ```sql
     CREATE DATABASE rosemont_estates;
     ```
   - Import the database schema and data:
     - If using phpMyAdmin:
       - Open phpMyAdmin and select the `rosemont_estates` database.
       - Click on the `Import` tab.
       - Choose the SQL file located in the `database` directory of your cloned repository (`database/rosemont_estates.sql`).
       - Click `Go` to import the database.
     - If using the command line:
       ```sh
       mysql -u your_username -p rosemont_estates < database/rosemont_estates.sql
       ```
       Replace `your_username` with your MySQL username and enter your password when prompted.

4. **Run Backend Server**:

   - Ensure that your local server (like Apache or Nginx) is running and configured to serve PHP files.
   - Place the project files in your server’s root directory (e.g., `htdocs` for XAMPP or `www` for WAMP/MAMP).
   - Make sure the server points to the correct directory where the project is stored.
   - Open your browser and navigate to `http://localhost/cheapr` to verify that the backend server is correctly serving the application.

5. **Run the Frontend Server**:

   - After installing the dependencies, run the following command to start the frontend server:
     ```sh
     npm start
     ```
   - The frontend server should now be running on `http://localhost:3000`.

6. **Access the Application**:

   - Open your web browser and go to `http://localhost:3000`.
   - You should see the homepage of the Rosemont Estates application.

By following these steps, you will have the Rosemont Estates project fully set up and running on your local machine. This setup ensures that your MySQL database is correctly configured.

## Features and Functionality

### Login & Signup

The Login and Signup feature allows users to create an account or log in to the Rosemont Estates platform. Users can sign up as either a regular user or an agent, with the platform customising their experience accordingly. Once logged in, users can access personalised features, such as managing their listings or browsing potential properties.

![feature1][fimage1]
![feature2][fimage2]

### Home

The Home page serves as the central hub for users, featuring a welcoming hero section, a brief introduction to the platform, and quick links to browse listings, view user profiles, and more.

![feature3][fimage3]

### Listing (With Filtering)

The Listing feature provides users with a comprehensive view of all available properties. Users can apply filters based on a text search of location (suburbs, cities, provinces, zip codes) max & min price range, number of interior spaces, number of exterior areas, and home features to narrow down their search and find properties that meet their specific needs. The filtering is responsive and updates in real-time as users adjust their preferences.

![feature4][fimage4]
![feature5][fimage5]

### Individual Listing

The Individual Listing page offers detailed information about a specific property, including high-resolution images (between 1 and 5, which would dynamically change layout), price, property features, and more. Users can also save the property to their favorites or notify the agent directly from this page using the "Show Interest" button.

![feature6][fimage6]

### Edit Listing

The Edit Listing feature is available to users who have created property listings. It allows them to modify their own property details, update images, and change availability status. This ensures that property information remains accurate and up-to-date.

![feature7][fimage7]

### Create Listing

The Create Listing feature enables users to add new properties to the Rosemont Estates platform. Once submitted, the property will be sent to the admins for approval, and will have a "Pending" status on the user's profile page.

![feature8][fimage8]

### Profile

The Profile page allows users to manage their account information, view saved (favourited) properties, and access their listings. It provides a personalised space for users to keep track of their interactions with the platform and update their contact details as needed.

![feature9][fimage9]

### Admin New Listings Dash

The Admin New Listings Dash is designed for agents and admin users to manage newly submitted property listings. From this dashboard, they can review, approve, or reject listings, ensuring that only verified properties are published on the platform.

![feature10][fimage10]

### Admin Potential Buyers

This feature allows agents and admin users to view and manage potential buyers interested in properties listed for sale (users that clicked on the "Interested" button). Agents can contact interested buyers directly with the email button, dismiss an interest, or mark a property as sold, which would delete all interests of any user in that respective property.

![feature11][fimage11]

### Admin Potential Tenants

Similar to the Potential Buyers feature, the Admin Potential Tenants section helps agents manage renters interested in properties available to rent.

![feature12][fimage12]

### Admin Closed Deals

The Admin Closed Deals feature provides a record of all successfully closed property deals. Agents can review the history of sales and rentals, ensuring that all transactions are properly documented and finalised, and also relist the property.

![feature13][fimage13]

### Admin Rejected Homes

The Admin Rejected Homes feature allows agents and admins to review properties that were submitted but not approved for listing. Here, the admin/agent can request a reevaluation, which will move it back to the main admin listings screen. Furthermore, admins and agents can easily change their real estate in the admin sidebar, which would filter the listings/buyers/renters by real estate agency.

![feature14][fimage14]
![feature15][fimage15]

## Concept Process

The `Conceptual Process` consisted of visual research (including research colour, design elements, typography, etc.), high-fidelity wireframing (to be used as reference for development), and planning the architecture of the Reosemont Estates website.

### Ideation & Wireframing

![image5][image5]
<br>
![image6][image6]

### ER Diagram

![image8][image8]

## Development Process

The Development Process involved the technical implementation of both the frontend and backend of the Rosemont Estates application. This section highlights the key functionalities developed, challenges faced, and solutions implemented.

### Implementation Process

- Implemented user authentication and session management using PHP and MySQL to ensure secure login and role-based access.
- Developed dynamic filtering functionality for property listings, allowing users to search by location, price range, number of rooms, exterior areas and features.
- Created a responsive frontend using React, Tailwind and Chakra UI, ensuring a seamless user experience across devices.
- Integrated a custom email button feature, allowing direct communication between potential buyers/tenants and agents.
- Designed and implemented the admin dashboard with features for managing property listings, potential buyers, and tenants, as well as handling rejected and closed deals.
- Set up role-based page access controls to ensure that users and agents have appropriate permissions across different sections of the site (such as editing buttons only appearing for users who own specific properties)

#### Highlights

- Successfully implemented a fully functional role-based access control system, ensuring that users only have access to the appropriate sections of the site.
- Developed a comprehensive filtering system for property listings, providing users with powerful tools to find the properties that match their needs.
- Added dynamic design rendering changes, depending on content (such as houses with 1-5 images)

#### Challenges

- **State Synchronisation:** One of the primary challenges was synchronising state across multiple components, particularly when managing session data. This issue was addressed by implementing a centralised state management approach, often within the parent component or page, to ensure consistency and reliability across the application.

- **React-PHP Integration:** Integrating React with PHP posed several difficulties, especially in maintaining seamless communication between the frontend and backend. Although the process was complex and at times frustrating, it provided valuable insights into managing the interoperability between different programming environments. Continuous debugging and testing were essential in overcoming these hurdles and ensuring a smooth integration.

### Future Implementation

- **Enhanced Analytics**: Implementing analytics features for admin users to track property views, user interactions, and other key metrics.
- **Automated Property Valuation**: Integrating an AI-based system for estimating property values based on market trends.
- **Advanced Filtering Options**: Adding more detailed filtering options, such as neighborhood amenities, or proximity to public transportation.

## Final Outcome

### Mockups

![image9][image9]
<br>
![image10][image10]

<!-- VIDEO DEMONSTRATION -->

### Video Demonstration

To see a run through of the application, click below:

[View Demonstration](https://youtu.be/K2DtZRP9LBY?si=4abhtoUpneIFh21x)

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

[image1]: src/assets/mockups/macbook_mockup.png
[fimage1]: src/assets/mockups/01login.png
[fimage2]: src/assets/mockups/02signup.png
[fimage3]: src/assets/mockups/03home.png
[fimage4]: src/assets/mockups/04listings.png
[fimage5]: src/assets/mockups/05filter.png
[fimage6]: src/assets/mockups/06individual.png
[fimage7]: src/assets/mockups/07edit.png
[fimage8]: src/assets/mockups/08create.png
[fimage9]: src/assets/mockups/09profile.png
[fimage10]: src/assets/mockups/10adminListings.png
[fimage11]: src/assets/mockups/11potBuyers.png
[fimage12]: src/assets/mockups/12potTenants.png
[fimage13]: src/assets/mockups/13closedDeals.png
[fimage14]: src/assets/mockups/14RejectedHomes.png
[fimage15]: src/assets/mockups/15agencyChange.png
[image5]: src/assets/mockups/LoginDesign.jpg
[image6]: src/assets/mockups/HomeDesign.jpg
[image8]: src/assets/mockups/rosemontERD.png
[image9]: src/assets/mockups/imac_light_mockup.png
[image10]: src/assets/mockups/imac_dark_mockup.png

<!-- Refer to https://shields.io/ for more information and options about the shield links at the top of the ReadMe file -->

[behance-shield]: https://img.shields.io/badge/-Behance-black.svg?style=flat-square&logo=behance&colorB=555
[behance-url]: https://www.behance.net/wolfbotha
