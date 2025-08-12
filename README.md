# LoopQA Technical Evaluation – Playwright Data-Driven Test Suite

## 📹 Demo Video
[![Watch the demo](https://img.youtube.com/vi/jov7jCoLUNU/0.jpg)](https://youtu.be/jov7jCoLUNU)  

---

## 📄 Overview
This repository contains my solution for the LoopQA technical evaluation.  
The objective was to create a **data-driven Playwright test suite** using **JavaScript/TypeScript** that minimizes code duplication and improves scalability.

The tests dynamically adapt to scenarios driven from a JSON object, ensuring a **clean and maintainable structure** as new cases are added.

---

## Acceptance Criteria & Implementation

### **1. Data-Driven Test Cases**
- All test cases are dynamically generated from a JSON file in the `data/` folder.
- The suite verifies all relevant details regarding Card titles, statutes, and tags.

### **2. Environment Configuration**
- Credentials are stored securely in a `.env` file.
- `.env` is excluded from version control via `.gitignore`.

### **3. Page Object Model (POM)**
- Implemented the **Page Object Model** pattern for better maintainability.
- Page-specific actions and selectors are encapsulated in separate classes under `pages/`.

### **4. Data Folder**
- All test data is organized under the `data/` directory for easy updates.

---

## 🛠 Technologies Used
- [Playwright](https://playwright.dev/) – End-to-end testing framework
- JavaScript / TypeScript
- dotenv – Environment variable management
- Node.js

---

## Run the Tests
- npx playwright test
- npx playwright show-report
