# Handcraft Items Shop

A beautiful, modern e-commerce website for handcrafted items built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd handcraft-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── ProductGrid.tsx # Product display
│   ├── CartModal.tsx   # Shopping cart
│   ├── AuthModal.tsx   # Login/Register
│   └── ...
├── context/            # React context for state management
│   ├── CartContext.tsx # Shopping cart state
│   ├── AuthContext.tsx # User authentication
│   └── OrderContext.tsx # Order management
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ✨ Features

### 🛍️ E-commerce Functionality
- Product catalog with search and filtering
- Shopping cart with quantity management
- User authentication (login/register)
- Complete checkout process
- Order management with cancellation (14-day window)

### 🎨 Design Features
- Modern dark theme with amber accents
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and hover effects
- Professional product showcase
- Beautiful gradient backgrounds

### 🔍 Search Functionality
- Dropdown search interface
- Real-time product filtering
- Recent searches history
- Popular search suggestions

### 📱 Mobile Responsive
- Touch-friendly interface
- Optimized for all screen sizes
- Mobile-specific navigation
- Responsive modals and forms

## 🔧 Customization

### Adding New Products
Edit the products array in `src/components/ProductGrid.tsx`:

```typescript
const products = [
  {
    id: 1,
    name: "Your Product Name",
    price: 99,
    image: "https://your-image-url.jpg",
    rating: 4.8,
    category: "Category",
    description: "Product description"
  },
  // Add more products...
];
```

### Changing Colors
The color scheme uses Tailwind CSS classes. Main colors:
- Primary: `amber-500` to `orange-500`
- Background: `slate-800` to `slate-900`
- Text: `white` and `slate-300`

### Backend Integration
To connect with a PHP backend, update the API calls in:
- `src/context/AuthContext.tsx` - Authentication endpoints
- `src/context/CartContext.tsx` - Cart management
- `src/context/OrderContext.tsx` - Order processing

## 🌐 Backend API Endpoints (PHP)

Create these endpoints in your PHP backend:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Fetch all products
- `GET /api/products/{id}` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `PUT /api/orders/{id}/cancel` - Cancel order

### Custom Orders
- `POST /api/custom-orders` - Submit custom order request

## 📦 Production Build

To build for production:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## 🚀 Deployment

You can deploy the built files to any web server:
- Upload the `dist` folder contents to your web server
- Configure your server to serve the `index.html` file for all routes
- Ensure your PHP backend is accessible from the frontend

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.