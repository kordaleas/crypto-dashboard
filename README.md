# Crypto Dashboard

A modern cryptocurrency dashboard built with Angular that displays real-time market data from CoinGecko API. Features include advanced filtering, sorting, and data visualization capabilities.

## Features

- Real-time cryptocurrency market data
- Interactive data table with multi-attribute filtering
- Market cap visualization using Highcharts
- Advanced search functionality
- Server-side pagination
- Responsive design

## Tech Stack

- Angular 18
- NgRx for state management
- Tailwind CSS for styling
- Highcharts for data visualization
- RxJS for reactive programming
- CoinGecko API integration

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/kordaleas/crypto-dashboard.git
```

2. Install dependencies:
```bash
npm install
```

3. Install Angular CLI globally:
```bash
npm install -g @angular/cli
```

4. Start the development server:
```bash
ng serve
```

5. Navigate to `http://localhost:4200/` in your browser.

## Project Structure

```plaintext
src/
├── app/
│   ├── core/           # Core functionality (state management, services)
│   ├── features/       # Feature modules
│   ├── models/         # Interfaces and types
│   └── shared/         # Shared components and utilities
```


## State Management
The application uses NgRx for state management with the following flow:

- Actions trigger API calls through Effects
- Reducers update the state based on API responses
- Selectors provide reactive data to components

## API Integration
The dashboard integrates with CoinGecko's public API:

Endpoint: https://api.coingecko.com/api/v3/coins/markets

Parameters customization for currency, pagination, and sorting

## Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

