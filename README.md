<div align="center">
<img height="130px" width="130px" src="./src/assets/images/logo.png">
</div>
  
# DASHBOARD, a personal everyday dashboard

Frontend : Angular

<details>
  <summary>Pages Features</summary>

### Home

- See a summary of your recent tasks, main city weather and total finances

### Cities

- See weather of your selected cities
- Add, update or delete a city

### Cities/Weather

- See weather forecast of your main city for the next 4 days
- See temperature, precipitation and wind values at every hour in a graph
- Change city

### Cities/Trips

- See your visited or to visit places
- Add, update or delete any country or trip
- Filter places

### Finances

- See finance cards
- Add, update or delete a card

### Finances/Expenses

- See your expenses in a graph
- Add, update or delete an expense

### Finances/Stock Exchange

- See a compound interests simulator

### Finances/Real Estate

- See a real estate simulator

### Tasks

- See your tasks and their state
- Add, update or delete a task

### Dark/Light Mode

- Select dark/light mode

</details>

<details>
  <summary>Run Locally</summary>

### Clone the project

```bash
  git clone https://github.com/Brice150/DASHBOARD.git
```

### Install dependencies

```bash
  npm install
```

### Start the server

```bash
  ng serve -o
```

</details>

<details>
  <summary>API Reference</summary>

### Weather

```https
  GET /api.open-meteo.com/v1/meteofrance?latitude=${latitude}&longitude=${longitude}&${params}
```

</details>
