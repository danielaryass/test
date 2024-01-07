"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { formatter } from "@/libs/format";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import useSWR,{mutate} from "swr";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Page({ params }) {
  const { keyword } = params;
  const keywordUri = decodeURIComponent(keyword);
  const router = useRouter();
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    `/api/reports/search/${keyword}/${page}`,
    fetcher
  );
  const handlePagination = (type) => {
    if (type === "prev") {
      if (page === 1) return;
      setPage(page - 1);
    } else {
      if (page === data?.data?.Pagination.TotalPages) return;
      setPage(page + 1);
    }
  };
  const handleDelete = async (id) => {

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
      
              mutate(`/api/reports/search/${keyword}/${page}`);
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
  return (
    <main className="flex w-full justify-center">
      <section className="max-w-[854px] w-full py-4 px-2">
        <h2 className="text-xl font-semibold border-b-2 border-zinc-950 mb-2">
          Hasil pencarian untuk:{" "}
          <span className="text-blue-600">{keywordUri}</span>
        </h2>

        {isLoading ? (
          <div className="h-[60vh] w-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : data?.data?.Transactions?.length === 0 ? (
          <p className="text-xl text-center py-2">
            Tidak ada transaksi dengan deskripsi {keyword}
          </p>
        ) : (
          <div className="w-full px-2">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
              <table class="w-full text-sm text-left  text-white">
                <thead class="text-xs  uppercase  bg-zinc-950 text-white w-full">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Deskripsi
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Nominal
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" class="flex justify-center py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.Transactions?.map((item) => (
                    <tr
                      class="border-b text-white bg-zinc-600 border-zinc-900  hover:bg-zinc-400"
                      key={item.id}
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                      >
                        {formatDate(item.date)}
                      </th>
                      <td class="px-6 py-4">{item.description}</td>
                      <td class="px-6 py-4">{formatter.format(item.amount)}</td>
                      <td class="px-6 py-4">{item.status}</td>
                      <td class="px-6 py-2 text-right flex items-center gap-4">
                      <Link
                          href={`/reports/${item.id}/edit`}
                          class="font-medium text-blue-600  hover:text-white"
                        >
                          <Pencil size={32} />
                        </Link>
                        <Link
                          href={`/reports/${item.id}/detail`}
                          class="font-medium text-green-600 hover:text-white"
                        >
                          <Eye size={32} />
                        </Link>
                        <button className="font-medium text-red-600 hover:text-white" onClick={(e)=>handleDelete(item.id)}>
                          <Trash size={32} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data?.data?.Pagination.TotalPages === 1 ? null : (
            <div className="w-full flex justify-center">
              <div className="flex gap-4 items-center py-2">
                <button
                  className="bg-blue-600 rounded-md px-2 py-1 text-white font-semibold"
                  onClick={() => handlePagination("prev")}
                >
                  Prev
                </button>
                <p className="text-xl">
                  {page} of {data?.data?.Pagination.TotalPages}
                </p>
                <button
                  className="bg-blue-600 rounded-md px-2 py-1 text-white font-semibold"
                  onClick={() => handlePagination("next")}
                >
                  Next
                </button>
              </div>
            </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
