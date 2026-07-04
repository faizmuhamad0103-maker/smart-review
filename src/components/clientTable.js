import { getAllClients } from "../services/clientServices";
import { copyToClipboard } from "../utils/copyToClipboard";

export async function renderClientTable() {
  const clients = await getAllClients();

  if (clients.length === 0) {
    document.querySelector("#table-container").innerHTML =
      "<p>Belum ada client.</p>";
    return;
  }

  document.querySelector("#table-container").innerHTML = `
    <table>

      <thead>
        <tr>
          <th>Nama Bisnis</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>

        ${clients
          .map(
            (client) => `
              <tr>

                <td>${client.businessName}</td>

                <td>${client.active ? "🟢 Aktif" : "🔴 Nonaktif"}</td>

                <td>
                  <button
                    class="copy-btn"
                    data-url="${client.shortUrl}">
                    📋 Copy Link
                  </button>
                </td>

              </tr>
            `
          )
          .join("")}

      </tbody>

    </table>
  `;

  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", () => {
      copyToClipboard(button.dataset.url);
    });
  });
}