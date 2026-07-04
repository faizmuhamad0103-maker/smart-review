import { renderClientForm } from "../components/clientForm";
import { renderClientTable } from "../components/clientTable";

export async function dashboardPage() {

  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="container">

      <h1>Smart Review Gmaps</h1>

      <div id="form-container"></div>

      <hr>

      <h2>Daftar Client</h2>

      <div id="table-container"></div>

    </div>
  `;

  async function refreshTable() {
    await renderClientTable();
  }

  renderClientForm(refreshTable);

  await refreshTable();

}