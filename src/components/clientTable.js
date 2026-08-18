import Swal from "sweetalert2";

import { copyToClipboard } from "../utils/copyToClipboard";

import { downloadQR } from "../utils/generateQR";

import { generateWhatsAppUrl } from "../utils/whatsapp";
import {
  getAllClients,
  deleteClient,
  updateClient
} from "../services/clientServices";

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
                  ${client.active
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
                    class="link-btn"
                    data-id="${client.id}"
                    data-url="${client.googleReviewUrl || ""}"
                    data-business="${client.businessName}"
                  >
                    🔗 masukan url toko
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


    // GOOGLE REVIEW LINK

document
  .querySelectorAll(".link-btn")
  .forEach((button) => {

    button.addEventListener("click", async () => {

      const id = button.dataset.id;
      const businessName = button.dataset.business;
      const currentUrl = button.dataset.url;

      const result = await Swal.fire({

        title: `Google Review - ${businessName}`,

        input: "url",

        inputLabel: "Masukkan Google Maps Review URL",

        inputValue: currentUrl,

        inputPlaceholder: "https://g.page/r/...",

        showCancelButton: true,

        confirmButtonText: "Simpan",

        cancelButtonText: "Batal",

        inputValidator: (value) => {

          if (!value) {
            return "Link Google Review wajib diisi";
          }

        }

      });

      if (!result.isConfirmed) return;

      try {

        await updateClient(id, {
          googleReviewUrl: result.value
        });

        await renderClientTable();

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Google Review Link berhasil disimpan.",
          timer: 1200,
          showConfirmButton: false,
        });

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.message,
        });

      }

    });

  });
}