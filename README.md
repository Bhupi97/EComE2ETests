# 🛍️ ECommerce End-to-End Automation Framework

An enterprise-grade, scalable automation framework built using **Playwright**, **TypeScript**, and **Node.js** to validate complex user workflows on an e-commerce platform.

> 🛠️ **Project Status: Work-In-Progress (WIP)** > This framework is actively being developed. The core infrastructure is complete, utilizing robust object-oriented patterns, custom dependency injection fixtures, and structural parallel processing safeguards. 
> **Current Progress:** 3 / 26 End-to-End Core Business Workflows Automated.

---

## 🏗️ Architectural Highlights & Coding Standards

Instead of writing flat, procedural scripts, this project is built using sustainable automation architecture designed to withstand real-world enterprise applications:

* **Page Object Model (POM):** Strict separation of concerns. UI locators and page-specific logic live inside isolated Page Classes, ensuring changes to the UI only require updates in a single file rather than breaking multiple test cases.
* **Object-Oriented Programming (OOP) & Encapsulation:** Access modifiers (`private readonly`) protect underlying locator queries. High-level composite business methods (e.g., `completeRegistrationProfile()`) package multiple form-filling steps into clean, atomic actions, improving test script readability.
* **Dependency Injection (Custom Fixtures):** Leverages Playwright's fixture system (`baseTest.ts`) to automatically instantiate, manage, and inject page components cleanly into test files, entirely eliminating boilerplate class creation overrides (`new HomePage()`).
* **Parallel Execution Guardrails:** Accommodates asynchronous parallel workers by utilizing dynamic data seeding (e.g., timestamp-skewed unique emails like `test_${Date.now()}@example.com`) to prevent database/state collision failures across browser contexts.
* **Network Request Interception (Ad-Blocking Router):** Programmatically intercepts, filters, and aborts calls to external tracking and telemetry ad script providers (e.g., DoubleClick, Google AdSense) at the network layer to optimize browser performance, speed up page execution, and eliminate flaky layout shifts.

---

## 📁 Repository Structure

```text
├── .github/workflows/      # CI/CD Pipeline Configuration (GitHub Actions)
├── src/
│   ├── data/               # Static test environments and user data payload JSON profiles
│   ├── fixtures/           # baseTest.ts custom fixture layers (Dependency Injection engine)
│   ├── pages/              # Page Object Models managing encapsulated UI element locators
│   └── tests/              # Highly concise E2E test suites divided via readable business steps
├── .env.example            # Sample configuration blueprint for local environmental variables
├── playwright.config.ts    # Advanced multi-browser routing, parallel, and execution parameters
└── package.json