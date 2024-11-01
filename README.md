
# Heat Exchanger Dashboard

A React-based dashboard that displays real-time temperature data for a fluid heat exchanger system. The dashboard includes a live temperature graph with alert notifications if the temperature crosses a set threshold.

## Live Demo
Check out the live demo of the dashboard here: [Heat Exchanger Dashboard](https://pradeish29.github.io/heat-exchanger-dashboard/)

## Features
- **Real-time Data Visualization**: Displays temperature readings of a fluid using a line graph.
- **Alert System**: Notifies users when the temperature crosses a defined threshold.
- **User-Friendly Interface**: Simple and intuitive layout built using React and Chart.js.
- **Responsive Design**: Compatible with both desktop and mobile views.

## Project Structure
The project follows a typical React folder structure:
```
temperature-dashboard/
├── public/
│   ├── index.html
│   └── data/
│       └── temperature-data.csv (dummy data)
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── TemperatureChart.js
│   │   └── Alert.js
│   ├── App.js
│   ├── index.js
│   └── styles/
│       └── App.css
└── README.md
```

## Installation and Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/pradeish29/heat-exchanger-dashboard.git
   cd heat-exchanger-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run locally**:
   Start the application in your local environment:
   ```bash
   npm start
   ```

   The app will be accessible at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

## Usage
The dashboard displays a real-time graph of fluid temperature data from a CSV file or dummy dataset. Users can view temperature changes and receive an alert if the temperature exceeds a preset threshold.

## Dependencies
- **React**: Core framework for building the user interface.
- **Chart.js**: For rendering the temperature graph.
- **gh-pages**: For deploying the app to GitHub Pages.

## Issues and Troubleshooting
If you encounter any issues, such as data not loading on GitHub Pages, ensure the `homepage` field in `package.json` is set correctly:
```json
"homepage": "https://pradeish29.github.io/heat-exchanger-dashboard"
```

Check the [console logs](https://developer.chrome.com/docs/devtools/console/) for errors, and refer to the deployment documentation if necessary.

## Contributing
Feel free to fork this repository, submit issues, or make pull requests to improve the functionality or fix bugs.

## License
This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
