# Restaurant Manager

A modern, responsive web application for restaurant table and order management. Built with vanilla JavaScript, HTML5, and CSS3 with Bootstrap styling.

## 🚀 Features

- **Table Management**: Visual representation of 9 restaurant tables with real-time status updates
- **Order Taking**: Intuitive interface for adding items to table orders
- **Category-based Menu**: Organized product catalog with categories (Beverages, Toasts, Pastries)
- **Interactive Ordering**: Numeric keypad for quick quantity selection
- **Bill Calculation**: Automatic total calculation with itemized breakdown
- **Order Modification**: Add/remove items and adjust quantities directly from the bill
- **Payment Processing**: Complete order processing with table liberation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5.3.0, Custom CSS with modern gradients and animations
- **Architecture**: Object-oriented programming with ES6 classes
- **Responsive**: Mobile-first design approach

## 📁 Project Structure

```
restaurant-manager/
├── css/
│   └── styles.css          # Custom styling and responsive design
├── js/
│   ├── class.js           # Core classes (Producto, Catalogo, Cuenta, etc.)
│   └── script.js          # Main application logic and DOM manipulation
├── index.html             # Main HTML structure
└── README.md             # Project documentation
```

## 🏗️ Architecture

The application follows an object-oriented architecture with the following core classes:

- **`Producto`**: Represents menu items with ID, name, price, and category
- **`Catalogo`**: Manages the complete product catalog
- **`LineaCuenta`**: Represents individual line items in an order
- **`Cuenta`**: Manages orders for specific tables
- **`Gestor`**: Main controller handling table and order management

## 🎯 How to Use

1. **Select a Table**: Click on any of the 9 numbered tables
2. **Choose Category**: Select from Beverages, Toasts, or Pastries
3. **Pick Product**: Choose specific items from the selected category
4. **Set Quantity**: Use the numeric keypad (1-9) to specify quantity
5. **Review Order**: View itemized bill with prices and totals
6. **Modify Order**: Use +/- buttons to adjust quantities or remove items
7. **Process Payment**: Complete the order and free the table

## 📱 Responsive Design

The application adapts to different screen sizes:

- **Desktop** (≥1200px): Full three-panel layout
- **Tablet** (768px-1199px): Optimized spacing and sizing
- **Mobile** (<768px): Compact layout with adjusted controls

## 🎨 Visual Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Status Indicators**: 
  - 🟢 Green tables: Available
  - 🔴 Red tables: Occupied
- **Interactive Elements**: Hover effects and smooth transitions
- **Professional Typography**: System fonts for optimal readability

## 🍽️ Menu Categories

### Beverages (Bebidas)
- Coffee with milk, Tea, Hot chocolate, etc.
- Price range: €0.95 - €1.95

### Toasts (Tostadas)
- Various bread options with different toppings
- Price range: €1.15 - €2.85

### Pastries (Bollería)
- Croissants, napoleons, cream spirals, etc.
- Price range: €0.95 - €1.65

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/restaurant-manager.git
   ```

2. **Navigate to project directory**
   ```bash
   cd restaurant-manager
   ```

3. **Open in browser**
   ```bash
   # Simply double-click on index.html to open it directly in your web browser

   ```

4. **Start managing your restaurant!**

## 🔧 Development

The application is built with vanilla JavaScript and requires no build process or dependencies. All external libraries are loaded via CDN:

- Bootstrap 5.3.0 for responsive grid and components
- Custom CSS for modern styling and animations

## 📝 Features in Detail

### Table Management
- Visual table grid with real-time status updates
- Automatic color coding (green = free, red = occupied)
- Click-to-select functionality

### Order Processing
- Dynamic form updates based on category selection
- Instant bill calculation and display
- Confirmation dialogs for destructive actions

### Bill Management
- Itemized breakdown with quantities and prices
- Real-time total updates
- Individual item modification controls

---

*Why no one forgets where it all started*