"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function Page() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    for (let key in data) {
      if (!data[key]) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: `Field ${key} tidak boleh kosong`,
        });
        return; // Stop execution if any value is empty
      }
    }
    try {
      const response = await axios.post("/api/reports", data);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Transaksi berhasil ditambahkan",
        });
      }
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Transaksi gagal ditambahkan karena ${error.message}`,
      });
    }
  };
  return (
    <main className="py-8 flex justify-center">
      <section className="max-w-[854px] w-full px-2 md:px-0">
        <h2 className="font-semibold border-b-2 border-zinc-900 mb-2 ">
          Tambah Transaksi
        </h2>
        <form
          className="w-full p-4 rounded-md bg-zinc-600"
          onSubmit={handleSubmit}
        >
          {/* input date, description, amount, status (debit,kredit), recei ver, jk(L, P), no_telp, address */}
          <div className="flex flex-col mb-4">
            <label htmlFor="date" className="text-sm text-white font-semibold">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="text-sm text-white font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            ></textarea>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="amount"
              className="text-sm text-white font-semibold"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="status"
              className="text-sm text-white font-semibold"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            >
              <option value="debit">Debit</option>
              <option value="kredit">Kredit</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="receiver"
              className="text-sm text-white font-semibold"
            >
              Receiver
            </label>
            <input
              type="text"
              name="receiver"
              id="receiver"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="jk" className="text-sm text-white font-semibold">
              Jenis Kelamin
            </label>
            <select
              name="jk"
              id="jk"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="no_telp"
              className="text-sm text-white font-semibold"
            >
              No. Telp
            </label>
            <input
              type="text"
              name="no_telp"
              id="no_telp"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="address"
              className="text-sm text-white font-semibold"
            >
              Address
            </label>
            <textarea
              name="address"
              id="address"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-zinc-950"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <button className="bg-zinc-300 hover:bg-zinc-400 hover:text-white text-zinc-950 font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
