"use client";
import useSWR,{mutate} from "swr";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/LoadingSpinner";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Page({ params }) {
  const { id } = params;
  const { data, error, isLoading } = useSWR(
    `/api/reports/detail/${id}`,
    fetcher
  );

  if (isLoading) {
    return (
      <main className="flex w-full justify-center h-[80vh] items-center">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="flex w-full justify-center">
      <Form data={data} id={id} />
    </main>
  );
}

const Form = ({ data, id }) => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = formData;
    Swal.fire({
      title: "Apakah kamu yakin ingin mengubah transaksi ini?",
      showDenyButton: true,
      confirmButtonText: "Ya",
      denyButtonText: "Tidak",
      customClass: {
        actions: "my-actions",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            const response = await axios.put(`/api/reports/detail/${id}`, data);
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Transaksi berhasil dirubah",
              });
            }
            setTimeout(() => {
              router.push("/");
            }, 1500);
      
              mutate(`/api/reports/detail/${id}`);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: `Transaksi gagal dirubah karena ${error.message}`,
            });
          }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  };
  const [formData, setFormData] = useState({
    date: data?.data?.Transaction.date,
    description: data?.data?.Transaction.description,
    amount: data?.data?.Transaction.amount,
    status: data?.data?.Transaction.status,
    receiver: data?.data?.Transaction.receiver,
    jk: data?.data?.Transaction.jk,
    no_telp: data?.data?.Transaction.no_telp,
    address: data?.data?.Transaction.address,
  });
  return (
    <section className="max-w-[854px] w-full py-8 px-2">
      <h2 className="pb-1 border-b-2 border-zinc-950 w-full mb-4 font-semibold">
        Edit Transaksi
      </h2>
      <div className="my-4 w-full bg-zinc-800 rounded-md">
        <form
          className="w-full p-4 rounded-md bg-zinc-600"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-4">
            <label htmlFor="date" className="text-sm text-white font-semibold">
              Tanggal
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="text-sm text-white font-semibold"
            >
              Deskripsi
            </label>
            <textarea
              name="description"
              id="description"
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="amount"
              className="text-sm text-white font-semibold"
            >
              Nominal
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
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
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Pilih Status</option>
              <option value="debit" selected={formData.status == "debit"}>
                Debit
              </option>
              <option value="kredit" selected={formData.status == "kredit"}>
                Kredit
              </option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="receiver"
              className="text-sm text-white font-semibold"
            >
              Penerima
            </label>
            <input
              type="text"
              name="receiver"
              id="receiver"
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.receiver}
              onChange={(e) =>
                setFormData({ ...formData, receiver: e.target.value })
              }
            />
          </div>
          {/* jk */}
          <div className="flex flex-col mb-4">
            <label htmlFor="jk" className="text-sm text-white font-semibold">
              Jenis Kelamin
            </label>
            <select
              name="status"
              id="status"
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.jk}
              onChange={(e) =>
                setFormData({ ...formData, jk: e.target.value })
              }
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L" selected={formData.jk == "L" ? true: false}>
                Laki-Laki
              </option>
              <option value="P" selected={formData.jk == "P" ? true: false}>
                Perempuan
              </option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="jk" className="text-sm text-white font-semibold">
              No Telepon
            </label>
            <input
              type="text"
              name="no_telp"
              id="no_telp"
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.no_telp}
              onChange={(e) =>
                setFormData({ ...formData, no_telp: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="address"
              className="text-sm text-white font-semibold"
            >
              Alamat
            </label>
            <textarea
              name="address"
              id="address"
              className="border border-gray-300 text-zinc-950 p-2 rounded-md focus:outline-none focus:border-zinc-950"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex w-full gap-4">
            <button
              type="submit"
              className="bg-blue-600 rounded-md w-1/2  py-1 text-white font-semibold"
            >
              Edit Transaksi
            </button>
            {/* back */}
            <button
              type="button"
              className="bg-red-600 rounded-md w-1/2  py-1 text-white font-semibold"
              onClick={() => router.push("/")}
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
