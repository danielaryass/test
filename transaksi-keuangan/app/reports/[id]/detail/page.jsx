"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import useSWR,{mutate} from "swr";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { formatter } from "@/libs/format";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Page({ params }) {
  const { id } = params;
  const { data, error, isLoading } = useSWR(
    `/api/reports/detail/${id}`,
    fetcher
  );
  const router = useRouter();
  const handleDelete = async () => {

    Swal.fire({
      title: "Apakah kamu yakin ingin menghapus transaksi ini?",
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
          const response = await axios.delete(`/api/reports/detail/${id}`);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Transaksi berhasil dihapus",
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
              text: `Transaksi gagal dihapus karena ${error.message}`,
            });
          }
      } else if (result.isDenied) {
        Swal.fire("Aksi telah dibatalkan", "", "info");
      }
    });
  };
  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if(data.status == false){
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <p className="text-xl text-center py-2 font-semibold">
          Tidak ada transaksi dengan id {id}
        </p>
      </div>
    );
  }
  return (
    <main className="flex justify-center">
      <section className="max-w-[854px] py-8 w-full px-2">
        <h2 className="pb-1 border-b-2 border-zinc-950 w-full mb-4 font-semibold">
          Detail Transaksi
        </h2>
        <div className="flex gap-2">
          <Link
            href={`/reports/${id}/edit`}
            className="rounded-md bg-blue-500 px-4 py-2 hover:bg-blue-700 text-white font-semibold flex justify-center items-center"
          >
            Edit Transaksi
          </Link>
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-white font-semibold flex justify-center items-center"
            onClick={handleDelete}
          >
            Hapus Transaksi
          </button>
          <button className="rounded-md bg-gray-600 px-4 py-2 text-white font-semibold flex justify-center items-center"
          onClick={() => router.push("/")}
          >
            Kembali ke Beranda
          </button>
        </div>
        <div className="my-4 w-full bg-zinc-800 rounded-md">
          <div className="flex flex-col p-4">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="date"
                className="text-sm text-white font-semibold"
              >
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={data?.data?.Transaction.date}
                disabled
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
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={data?.data?.Transaction.description}
                disabled
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
                type="text"
                name="amount"
                id="amount"
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={formatter.format(data?.data?.Transaction.amount)}
                disabled
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="status"
                className="text-sm text-white font-semibold"
              >
                Status
              </label>
              <input
                type="text"
                name="status"
                id="status"
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={data?.data?.Transaction.status}
                disabled
              />
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
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={data?.data?.Transaction.receiver}
                disabled
              />
            </div>
            {/* jk */}
            <div className="flex flex-col mb-4">
              <label htmlFor="jk" className="text-sm text-white font-semibold">
                Jenis Kelamin
              </label>
              <input
                type="text"
                name="jk"
                id="jk"
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={
                  data?.data?.Transaction.jk == "L" ? "Laki-laki" : "Perempuan"
                }
                disabled
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="jk" className="text-sm text-white font-semibold">
                No Telepon
              </label>
              <input
                type="text"
                name="no_telp"
                id="no_telp"
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={data?.data?.Transaction.no_telp}
                disabled
              />
            </div>
            {/* ADDRESS */}
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
                className="border border-gray-300 text-white p-2 rounded-md focus:outline-none focus:border-zinc-950"
                value={data?.data?.Transaction.address}
                disabled
              ></textarea>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
