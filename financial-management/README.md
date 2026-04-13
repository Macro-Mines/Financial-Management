# Finagement: Interactive Financial Management Platform

![Finagement Banner](https://img.shields.io/badge/Finagement-Master_Finance-c9a96e?style=for-the-badge&labelColor=1a1a1a)
[![React](https://img.shields.io/badge/React_19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Finagement** (Finance + Management) is a premium, interactive educational platform designed to help learners master the core principles of corporate finance. Built with a "Dune-inspired" dark aesthetic, the application combines high-fidelity visual tools, interactive calculators, and a structured curriculum to make financial learning both engaging and efficient.

---

## 🏗️ Core Modules

The platform is structured into index-linked modules that cover the fundamental pillars of financial management:

1.  **Time Value of Money (TVM)**: Mastery of Future Value, Present Value, and the compounding/discounting mechanics.
2.  **Cost of Capital (WACC)**: In-depth analysis of equity, debt, and the weighted average cost of capital.
3.  **Leverage Analysis**: Understanding Operating, Financial, and Combined leverage.
4.  **Capital Structure**: Visualizing the optimal mix of debt and equity through industry-standard theories.
5.  **Capital Budgeting**: Evaluating investment projects using NPV, IRR, and Payback periods.
6.  **Dividend Decisions**: Analyzing how firms distribute wealth to shareholders using classical models.

---

## ✨ Premium Features

### 💎 Advanced UX & Design
- **Monolith Aesthetic**: A sleek, dark-mode design using the "Dune" palette (Gold, Stone, Sand) with grainy overlays and asymmetric gradients.
- **Skeleton Loading**: Professional, pixel-perfect skeleton placeholders that eliminate layout shift and provide a premium "bone-js" inspired loading state.
- **Dynamic Pagination**: A custom, scrollable pagination handle that auto-centers the active module and features subtle masked edges for navigation clarity.
- **Interactive Tilt Cards**: 3D-perspective cards for module navigation that react to mouse movements.

### 📊 Practical Tools
- **Financial Calculators**: Real-time calculators integrated into pages for instant analysis of NPV, WACC, and PV/FV formulas.
- **Currency Marquee**: A dynamic scrolling showcase of global currency assets.
- **Interactive Radar Effect**: Visual radar indicators to guide users through functional areas of finance.

### ⚡ Performance & Reliability
- **Smooth Scroll Reset**: Integrated global navigation utility that ensures every page load starts from the top, regardless of where the action was triggered.
- **Optimized Routing**: Client-side navigation powered by `react-router-dom` for instantaneous transitions.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) & Vanilla CSS |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) |
| **Physics/Math** | [Matter-js](https://brm.io/matter-js/) & [Poly-decomp](https://github.com/schteppe/poly-decomp.js) |
| **Charts** | [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) & [Material Symbols](https://fonts.google.com/icons) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Macro-Mines/Financial-Management.git
    cd financial-management
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📁 Project Structure

```text
src/
├── assets/          # Images, logos, and currency assets
├── components/      # UI components (Skeleton, Pagination, Layout)
├── data/            # Module metadata and central source of truth
├── pages/           # Module-specific pages and calculators
├── utils/           # Shared utility functions
└── App.jsx          # Route definitions and global wrappers
```

---

## 👤 Author
**Abhinav Raj, MBA F.T.**

Developed with a mission to simplify complex financial models through modern web technology.

---

## 📄 License
This project is for educational purposes. All rights reserved.
