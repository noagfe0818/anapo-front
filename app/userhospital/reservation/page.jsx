"use client";

import { useState } from "react";
import { Search, Filter, Eye, Edit, Trash2, Plus } from "lucide-react";

import { reservations as mockData } from "@/data/hospital/reservations";
import StatusBadge from "@/components/hospital/StatusBadge";

// 모달 컴포넌트 import
import NewReservationModal from "@/components/hospital/NewReservationModal";
import ViewReservationModal from "@/components/hospital/ViewReservationModal";
import EditReservationModal from "@/components/hospital/EditReservationModal";

export default function ReservationManagement() {
  const [reservations, setReservations] = useState(mockData);

  const [openNew, setOpenNew] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selected, setSelected] = useState(null);

  // 신규 + 수정 폼 데이터
  const [form, setForm] = useState({
    name: "",
    phone: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    memo: "",
    status: "예약확정",
  });

  const updateForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // 상세보기 모달 열기
  const onView = (item) => {
    setSelected(item);
    setOpenView(true);
  };

  // 수정 모달 열기
  const onEdit = (item) => {
    setSelected(item);

    const [date, time] = item.datetime.split(" ");

    setForm({
      name: item.name,
      phone: item.phone,
      department: item.department,
      doctor: item.doctor,
      date,
      time,
      memo: item.memo || "",
      status: item.status,
    });

    setOpenEdit(true);
  };
  const saveEdited = () => {
    const updated = reservations.map((item) =>
      item.code === selected.code
        ? {
            ...item,
            name: form.name,
            phone: form.phone,
            department: form.department,
            doctor: form.doctor,
            datetime: `${form.date} ${form.time}`,
            memo: form.memo,
            status: form.status,
          }
        : item
    );

    setReservations(updated);
    setOpenEdit(false);

    /* 📌 백엔드 연동 예정 (Spring)
  fetch(`/api/reservations/${selected.code}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });
  */
  };

  // 삭제 기능
  const deleteReservation = (code) => {
    setReservations(reservations.filter((r) => r.code !== code));

    /* 📌 백엔드 연동 예정 (Spring)
    fetch(`/api/reservations/${code}`, {
      method: "DELETE"
    });
    */
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-2">예약 관리</h1>
      <p className="text-gray-500 mb-6">
        병원 예약을 관리하고 확인할 수 있습니다
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">전체 예약 목록</h2>

          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => setOpenNew(true)}
          >
            <Plus size={16} /> 새 예약 등록
          </button>
        </div>

        {/* 검색 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="환자명, 연락처로 검색"
              className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-gray-600 text-sm">
            <Filter size={16} />
            전체
          </button>
        </div>

        {/* 테이블 */}
        <table className="w-full text-left text-gray-700">
          <thead>
            <tr className="text-gray-500 border-b text-sm">
              <th className="pb-3">예약번호</th>
              <th className="pb-3">환자명</th>
              <th className="pb-3">연락처</th>
              <th className="pb-3">담당의</th>
              <th className="pb-3">진료과</th>
              <th className="pb-3">예약일시</th>
              <th className="pb-3 pr-5">상태</th>
              <th className="pb-3 pl-5">관리</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {reservations.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition">
                <td className="py-4">{item.code}</td>
                <td className="font-medium">{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.doctor}</td>
                <td>{item.department}</td>
                <td>{item.datetime}</td>
                <td>{StatusBadge(item.status)}</td>

                <td className="flex gap-3 mt-4 text-gray-500">
                  <Eye
                    size={18}
                    className="cursor-pointer hover:text-gray-700"
                    onClick={() => onView(item)}
                  />

                  <Edit
                    size={18}
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => onEdit(item)}
                  />

                  <Trash2
                    size={18}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => deleteReservation(item.code)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="px-4 py-2 rounded-lg border text-gray-600">
            이전
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            1
          </button>
          <button className="px-4 py-2 rounded-lg border text-gray-600">
            2
          </button>
          <button className="px-4 py-2 rounded-lg border text-gray-600">
            3
          </button>
          <button className="px-4 py-2 rounded-lg border text-gray-600">
            다음
          </button>
        </div>
      </div>

      {/* ──────────────── 모달들 ─────────────── */}

      {openNew && (
        <NewReservationModal
          form={form}
          setForm={updateForm}
          onClose={() => setOpenNew(false)}
          onSubmit={(newReservation) => {
            setReservations([...reservations, newReservation]);
            setOpenNew(false);

            /* 📌 백엔드 연동 예정 (Spring)
            fetch("/api/reservations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newReservation),
            });
            */
          }}
        />
      )}

      {openView && selected && (
        <ViewReservationModal
          data={selected}
          onClose={() => setOpenView(false)}
        />
      )}

      {openEdit && selected && (
        <EditReservationModal
          form={form}
          setForm={updateForm}
          selected={selected}
          onClose={() => setOpenEdit(false)}
          onSubmit={saveEdited}
        />
      )}
    </div>
  );
}
