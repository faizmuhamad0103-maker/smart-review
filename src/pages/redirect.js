import { getClient } from "../services/clientServices";

export async function redirectPage(id) {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="redirect-page">

      <div class="card">

        <h1>⭐ Smart Review ⭐️</h1>

        <h2 id="business-name">Loading...</h2>

        <p>
          Terima kasih sudah berkunjung.
        </p>

        <p>
          Anda akan diarahkan ke halaman Google Review...
        </p>

        <div class="loader"></div>

      </div>

    </div>
  `;

  const client = await getClient(id);

  if (!client) {
    app.innerHTML = `
      <h2>Client tidak ditemukan.</h2>
    `;
    return;
  }

  document.querySelector("#business-name").textContent =
    client.businessName;

  setTimeout(() => {
      window.location.href = client.googleReviewUrl;
  }, 1000);
}