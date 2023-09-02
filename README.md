<div align="center">
<img height="130px" width="130px" src="./src/assets/images/logo.png">
</div>
  
# DASHBOARD

Frontend : Angular

<details>
  <summary>Pages Features</summary>

  ### Weather
  - See weather forecast for 4 days
  - View weather stats hourly for a selected day
  - Change weather city

  ### Finance
  - See finance forecast for 25 years
  - View your invested money vs interests
  - Change saving strategy

  ### Tasks List
  - See your tasks
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