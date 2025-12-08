"use client";
import { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Search, UserPlus } from "lucide-react";

// 모달 컴포넌트 import
import PatientCreateModal from "@/components/hospital/PatientCreateModal";
import PatientDetailModal from "@/components/hospital/PatientDetailModal";
import PatientEditModal from "@/components/hospital/PatientEditModal";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // 모달 상태
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // 선택된 환자
  const [selected, setSelected] = useState(null);

  // 새 환자 / 수정용 폼 상태
  const [form, setForm] = useState({
    name: "",
    gender: "남",
    birth: "",
    phone: "",
    subPhone: "",
    email: "",
    address: "",
    history: "",
  });

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* 
    📌 백엔드와 연동될 부분 (Spring + REST API)

    useEffect(() => {
      fetch("/api/patients")
        .then(res => res.json())
        .then(data => setPatients(data));
    }, []);
  */

  // 현재는 임시 Mock 데이터 (백엔드 연동 전)
  useEffect(() => {
    setPatients([
      {
        id: "P001",
        name: "김민수",
        gender: "남",
        age: 35,
        birth: "1989-05-20",
        phone: "010-1234-5678",
        subPhone: "010-9999-8888",
        email: "minsu@email.com",
        address: "서울시 강남구",
        regDate: "2024-03-15",
        visits: 12,
        history: "알레르기 없음",
      },
      {
        id: "P002",
        name: "박지은",
        gender: "여",
        age: 28,
        birth: "1996-02-10",
        phone: "010-2345-6789",
        subPhone: "",
        email: "jieun@email.com",
        address: "서울시 서초구",
        regDate: "2024-05-20",
        visits: 3,
        history: "",
      },
      {
        id: "P003",
        name: "이준호",
        gender: "남",
        age: 42,
        birth: "1983-07-10",
        phone: "010-3456-7890",
        subPhone: "",
        email: "junho@email.com",
        address: "서울시 송파구",
        regDate: "2024-07-10",
        visits: 5,
        history: "",
      },
      {
        id: "P004",
        name: "정수연",
        gender: "여",
        age: 31,
        birth: "1993-09-05",
        phone: "010-4567-8901",
        subPhone: "",
        email: "suyeon@email.com",
        address: "서울시 강동구",
        regDate: "2024-09-05",
        visits: 3,
        history: "",
      },
      {
        id: "P005",
        name: "최동욱",
        gender: "남",
        age: 55,
        birth: "1969-11-22",
        phone: "010-5678-9012",
        subPhone: "",
        email: "dongwook@email.com",
        address: "서울시 마포구",
        regDate: "2023-11-22",
        visits: 24,
        history: "",
      },
      {
        id: "P006",
        name: "강서윤",
        gender: "여",
        age: 26,
        birth: "1999-01-03",
        phone: "010-6789-0123",
        subPhone: "",
        email: "seoyun@email.com",
        address: "서울시 용산구",
        regDate: "2025-01-03",
        visits: 1,
        history: "",
      },
    ]);
  }, []);

  // 검색 필터
  const filtered = patients.filter((p) =>
    `${p.name} ${p.phone} ${p.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const current = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 새 환자 등록 완료
  const handleCreateSubmit = (newPatientData) => {
    const newPatient = {
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
      name: newPatientData.name,
      gender: newPatientData.gender,
      birth: newPatientData.birth,
      age: newPatientData.age, // 폼에서 계산해서 내려줌
      phone: newPatientData.phone,
      subPhone: newPatientData.subPhone,
      email: newPatientData.email,
      address: newPatientData.address,
      history: newPatientData.history,
      regDate: newPatientData.regDate,
      visits: 0,
    };

    setPatients((prev) => [...prev, newPatient]);
    setOpenCreate(false);

    /* 📌 백엔드 저장 예정
    fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatient)
    });
    */
  };

  // 상세 보기 열기
  const openDetailModal = (patient) => {
    setSelected(patient);
    setOpenDetail(true);
  };

  // 수정 모달 열기
  const openEditModal = (patient) => {
    setSelected(patient);
    setForm({
      name: patient.name,
      gender: patient.gender,
      birth: patient.birth || "",
      phone: patient.phone,
      subPhone: patient.subPhone || "",
      email: patient.email || "",
      address: patient.address || "",
      history: patient.history || "",
    });
    setOpenEdit(true);
  };

  // 수정 저장
  const handleEditSubmit = () => {
    if (!selected) return;

    const updated = patients.map((p) =>
      p.id === selected.id
        ? {
            ...p,
            name: form.name,
            gender: form.gender,
            birth: form.birth,
            phone: form.phone,
            subPhone: form.subPhone,
            email: form.email,
            address: form.address,
            history: form.history,
            // 나이 계산은 폼에서 넘겨도 되고, 여기서 다시 계산해도 됨
          }
        : p
    );

    setPatients(updated);
    setOpenEdit(false);

    /* 📌 백엔드 수정 예정
    fetch(`/api/patients/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    */
  };

  // 삭제
  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));

    /* 📌 백엔드 삭제 예정
    fetch(`/api/patients/${id}`, {
      method: "DELETE"
    });
    */
  };

  return (
    <section className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">환자 관리</h1>
      <p className="text-gray-500 mb-6">
        등록된 환자 정보를 관리할 수 있습니다
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-xl">전체 환자 목록</h2>

          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              setForm({
                name: "",
                gender: "남",
                birth: "",
                phone: "",
                subPhone: "",
                email: "",
                address: "",
                history: "",
              });
              setOpenCreate(true);
            }}
          >
            <UserPlus size={18} />새 환자 등록
          </button>
        </div>

        {/* 검색창 */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="환자명, 연락처, 이메일로 검색"
            className="w-full border rounded-lg pl-10 p-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* 테이블 */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-3">환자번호</th>
              <th className="p-3">이름</th>
              <th className="p-3">성별/나이</th>
              <th className="p-3">연락처</th>
              <th className="p-3">이메일</th>
              <th className="p-3">등록일</th>
              <th className="p-3">관리</th>
            </tr>
          </thead>

          <tbody>
            {current.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">
                  {p.gender} / {p.age}세
                </td>
                <td className="p-3">{p.phone}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">{p.regDate}</td>

                <td className="p-3 flex gap-3 justify-center">
                  <Eye
                    className="text-gray-600 hover:text-black cursor-pointer"
                    size={18}
                    onClick={() => openDetailModal(p)}
                  />
                  <Pencil
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    size={18}
                    onClick={() => openEditModal(p)}
                  />
                  <Trash2
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={18}
                    onClick={() => handleDelete(p.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이징 */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-3 py-1 border rounded-lg"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-lg ${
                page === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded-lg"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            다음
          </button>
        </div>
      </div>

      {/* ───────── 모달들 ───────── */}

      {openCreate && (
        <PatientCreateModal
          form={form}
          setForm={updateForm}
          onClose={() => setOpenCreate(false)}
          onSubmit={handleCreateSubmit}
        />
      )}

      {openDetail && selected && (
        <PatientDetailModal
          patient={selected}
          onClose={() => setOpenDetail(false)}
        />
      )}

      {openEdit && selected && (
        <PatientEditModal
          form={form}
          setForm={updateForm}
          onClose={() => setOpenEdit(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </section>
  );
};

export default Patient;
