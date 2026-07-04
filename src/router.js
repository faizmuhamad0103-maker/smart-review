import { dashboardPage } from "./pages/dashboard";
import { redirectPage } from "./pages/redirect";

export async function router() {
  const path = window.location.pathname;

  if (path === "/") {
    await dashboardPage();
    return;
  }

  if (path.startsWith("/r/")) {
    const id = path.split("/")[2];
    await redirectPage(id);
    return;
  }

  document.querySelector("#app").innerHTML = `
    <h1>404</h1>
    <p>Halaman tidak ditemukan.</p>
  `;
}