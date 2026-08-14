import Swal from "sweetalert2";

import {
  getAllClients,
  deleteClient
} from "../services/clientServices";

import { copyToClipboard } from "../utils/copyToClipboard";

import { downloadQR } from "../utils/generateQR";

import { generateWhatsAppUrl } from "../utils/whatsapp";


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

                <td>
                  ${client.businessName}
                </td>


                <td>
                  ${
                    client.active
                      ? "🟢 Aktif"
                      : "🔴 Nonaktif"
                  }
                </td>


                <td>

                  <button
                    class="copy-btn"
                    data-url="${client.shortUrl}"
                  >
                    📋 Copy
                  </button>


                  <button
                    class="qr-btn"
                    data-url="${client.shortUrl}"
                    data-name="${client.businessName}"
                  >
                    📥 QR
                  </button>


                  <button
                    class="wa-btn"
                    data-id="${client.id}"
                    data-phone="${client.whatsapp || ""}"
                    data-template="${client.templateCategory || ""}"
                    data-business="${client.businessName}"
                  >
                    💬 Chat WA
                  </button>


                  <button
                    class="delete-btn"
                    data-id="${client.id}"
                  >
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


  // COPY

  document
    .querySelectorAll(".copy-btn")
    .forEach((button) => {

      button.addEventListener("click", () => {

        copyToClipboard(
          button.dataset.url
        );

      });

    });


  // QR

  document
    .querySelectorAll(".qr-btn")
    .forEach((button) => {

      button.addEventListener("click", () => {

        downloadQR(
          button.dataset.url,
          button.dataset.name
        );

      });

    });


  // WHATSAPP

  document
    .querySelectorAll(".wa-btn")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const phone =
          button.dataset.phone;

        const template =
          button.dataset.template;

        const businessName =
          button.dataset.business;


        if (!phone) {

          Swal.fire({
            icon: "warning",
            title: "Nomor WhatsApp belum ada",
            text: "Client ini belum memiliki nomor WhatsApp.",
          });

          return;

        }


        if (!template) {

          Swal.fire({
            icon: "warning",
            title: "Template belum dipilih",
            text: "Client ini belum memiliki template chat.",
          });

          return;

        }


        try {

          const url =
            generateWhatsAppUrl(
              phone,
              template,
              businessName
            );


          window.open(
            url,
            "_blank"
          );


        } catch (error) {

          Swal.fire({
            icon: "error",
            title: "Gagal membuka WhatsApp",
            text: error.message,
          });

        }

      });

    });


  // DELETE

  document
    .querySelectorAll(".delete-btn")
    .forEach((button) => {

      button.addEventListener(
        "click",
        async () => {

          const result =
            await Swal.fire({

              title: "Hapus client?",

              text: "Data tidak bisa dikembalikan.",

              icon: "warning",

              showCancelButton: true,

              confirmButtonText: "Ya",

              cancelButtonText: "Batal",

            });


          if (!result.isConfirmed)
            return;


          await deleteClient(
            button.dataset.id
          );


          await renderClientTable();


          Swal.fire({

            icon: "success",

            title: "Berhasil",

            text: "Client dihapus.",

            timer: 1200,

            showConfirmButton: false,

          });

        }
      );

    });

}