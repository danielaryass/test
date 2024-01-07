"use client";
import useSWR, {mutate} from "swr";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { formatter } from "@/libs/format";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Home() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR(`/api/reports/${page}`, fetcher);
  const router = useRouter();
  const handlePagination = (type) => {
    if (type === "prev") {
      if (page === 1) return;
      setPage(page - 1);
    } else {
      if (page === data?.data?.Pagination.TotalPages) return;
      setPage(page + 1);
    }
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
          setTimeout(() => {
            router.push("/");
          }, 1500);
      
              mutate(`/api/reports/${page}`);
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
    <main className=" flex justify-center">
      <section className="max-w-[854px] w-full py-8 px-2">
        <div className="mb-4">
          <Link
            href={"/add-transaction"}
            className="bg-blue-600 rounded-md px-4 py-2 text-white font-semibold"
          >
            Tambahkan Transaksi
          </Link>
        </div>
        <h2 className="font-semibold text-lg px-2 border-b-2 border-zinc-950 mb-2">
          List Transaksi{" "}
        </h2>
        {/* search button */}

        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                    <th scope="col" class="px-6 py-3">
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
                      <td class="px-2 py-4 text-right flex gap-4">
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
          </>
        )}
      </section>
    </main>
  );
}

const Loading = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};
