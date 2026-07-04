import Swal from "sweetalert2";
import { getAllClients, deleteClient } from "../services/clientServices";
import { copyToClipboard } from "../utils/copyToClipboard";
import { downloadQR } from "../utils/generateQR";

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
📋 Copy
</button>

<button
class="qr-btn"
data-url="${client.shortUrl}"
data-name="${client.businessName}">
📥 QR
</button>

<button
class="delete-btn"
data-id="${client.id}">
🗑 Delete
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


    document.querySelectorAll(".qr-btn").forEach((button) => {

        button.addEventListener("click", () => {

            downloadQR(

                button.dataset.url,

                button.dataset.name

            );

        });

    });

    document.querySelectorAll(".delete-btn").forEach((button) => {

  button.addEventListener("click", async () => {

    const result = await Swal.fire({

      title: "Hapus client?",

      text: "Data tidak bisa dikembalikan.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Ya",

      cancelButtonText: "Batal",

    });

    if (!result.isConfirmed) return;

    await deleteClient(button.dataset.id);

    await renderClientTable();

    Swal.fire({

      icon: "success",

      title: "Berhasil",

      text: "Client dihapus.",

      timer: 1200,

      showConfirmButton: false,

    });

  });

});

}