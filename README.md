
Overview
The **LNB Calculator** is a tool designed to scrape and calculate specific data from web pages using Puppeteer, a Node.js library. This project is focused on fetching match results and processing this data to provide insightful information.

##
Features
- **Web Scraping**: Utilizes Puppeteer for scraping web pages.
- **Data Processing**: Processes and stores the scraped data in JSON format.
- **Automation**: Automates the entire process of data fetching and calculation.

##
Installation Instructions
Follow the steps below to install and set up the project on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GonzaBarberis/calculadora_lnb.git
   ```
   
2. **Navigate to the Project Directory**:
   ```bash
   cd calculadora_lnb
   ```

3. **Install Dependencies**:
   Ensure you have Node.js installed. Then, install the required npm packages:
   ```bash
   npm install
   ```

##
Usage Examples
Here's how you can use the LNB Calculator:

1. **Running the Script**:
   To start the data scraping and processing, execute the following command in your terminal:
   ```bash
   node index.js
   ```

2. **Viewing the Results**:
   The results will be stored in the `JSON/matches.json` file. You can view and manipulate this data as needed.

##
Code Summary
The main code for the project is located in `index.js`. Here's a brief overview:

- **Dependencies**: The script requires `puppeteer-core`, `fs`, and `path` modules.
- **File Paths**: The JSON data from scraped matches is stored at `JSON/matches.json`.
- **Key Variables**:
  - `rawData`: To store raw data fetched from web pages.
  - `matches`: For processed match data.
  - `yaBusco`: A flag to check if the data fetching has been done.
- **Main Function**:
  - `conseguirResultados()`: An asynchronous function to launch Puppeteer, scrape data, and save it to JSON format.

##
Contributing Guidelines
We welcome contributions to the LNB Calculator project! Here’s how you can get involved:

1. **Fork the Repository**: Click the 'Fork' button on the repository's GitHub page.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/calculadora_lnb.git
   ```
3. **Create a New Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make Your Changes**: Implement your changes and commit them with descriptive messages.
5. **Push to Your Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Submit a Pull Request**: From your fork’s GitHub page, open a pull request to merge your changes into the main repository.

##
License
This project is licensed under the MIT License. For more details, please refer to the `LICENSE` file in the repository.
```

This README file includes all the required sections and provides a comprehensive guide to understanding, installing, using, and contributing to the LNB Calculator project.