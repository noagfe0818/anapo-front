"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Edit, Save, X } from "lucide-react";

const Hospitalinfo = () => {
  const [info, setInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newDept, setNewDept] = useState({
    name: "",
    description: "",
    doctors: 0,
  });

  useEffect(() => {
    const mockData = {
      name: "MEDICARE 종합병원",
      phone: "02-1234-5678",
      email: "info@medicare.com",
      address: "서울특별시 강남구 테헤란로 123",
      hours: {
        월요일: "09:00 - 18:00",
        화요일: "09:00 - 18:00",
        수요일: "09:00 - 18:00",
        목요일: "09:00 - 18:00",
        금요일: "09:00 - 18:00",
        토요일: "09:00 - 13:00",
        일요일: "휴무",
      },
      departments: [
        {
          name: "내과",
          description: "일반 내과 진료 및 만성질환 관리",
          doctors: 8,
        },
        { name: "외과", description: "외과 수술 및 응급 처치", doctors: 6 },
        { name: "소아과", description: "소아 청소년 전문 진료", doctors: 5 },
      ],
    };

    setInfo(mockData);
    setEditData(mockData);
  }, []);

  if (!info || !editData) return <div>로딩 중...</div>;

  const handleSave = () => {
    setInfo(editData);
    setIsEditing(false);
  };

  const addDepartment = () => {
    if (!newDept.name.trim()) return;

    setEditData({
      ...editData,
      departments: [...editData.departments, newDept],
    });

    setNewDept({ name: "", description: "", doctors: 0 });
  };

  const deleteDepartment = (idx) => {
    setEditData({
      ...editData,
      departments: editData.departments.filter((_, i) => i !== idx),
    });
  };

  const updateDepartment = (idx, field, value) => {
    const updated = [...editData.departments];
    updated[idx][field] = value;

    setEditData({ ...editData, departments: updated });
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">병원 정보 관리</h1>
          <p className="text-gray-500 mt-1">
            병원의 기본 정보 및 운영 정보를 관리합니다
          </p>
        </div>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Save size={18} />
            저장
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Edit size={18} />
            편집
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ========= 기본 정보 ========= */}
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-lg">📘 기본 정보</span>
          </div>

          <div className="space-y-4">
            {/* 병원명 */}
            <div>
              <p className="text-gray-500 text-sm">병원명</p>
              {isEditing ? (
                <input
                  className="w-full border rounded-lg p-2 mt-1"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              ) : (
                <p className="text-lg font-medium">{info.name}</p>
              )}
            </div>

            {/* 전화번호 / 이메일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">전화번호</p>
                {isEditing ? (
                  <input
                    className="w-full border rounded-lg p-2 mt-1"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={16} className="text-gray-500" />
                    {info.phone}
                  </div>
                )}
              </div>

              <div>
                <p className="text-gray-500 text-sm">이메일</p>
                {isEditing ? (
                  <input
                    className="w-full border rounded-lg p-2 mt-1"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={16} className="text-gray-500" />
                    {info.email}
                  </div>
                )}
              </div>
            </div>

            {/* 주소 */}
            <div>
              <p className="text-gray-500 text-sm">주소</p>
              {isEditing ? (
                <input
                  className="w-full border rounded-lg p-2 mt-1"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={16} className="text-gray-500" />
                  {info.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========= 운영 시간 카드 ========= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-blue-600" />
            <span className="font-semibold text-lg">운영 시간</span>
          </div>

          <div className="space-y-3">
            {Object.entries(editData.hours).map(([day, time]) => (
              <div key={day} className="flex justify-between text-gray-700">
                <span>{day}</span>

                {isEditing ? (
                  <input
                    className="border rounded-lg p-1 w-32 text-right"
                    value={time}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        hours: { ...editData.hours, [day]: e.target.value },
                      })
                    }
                  />
                ) : (
                  <span
                    className={
                      time === "휴무" ? "text-red-500 font-semibold" : ""
                    }
                  >
                    {time}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========= 진료 과목 ========= */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">🩺 진료 과목</span>
          <button className="text-blue-600 font-medium hover:underline">
            + 과목 추가
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editData.departments.map((d, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 relative hover:bg-gray-50 transition"
            >
              {isEditing && (
                <button
                  onClick={() => deleteDepartment(idx)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}

              {isEditing ? (
                <input
                  className="w-full border rounded-lg p-1 font-medium"
                  value={d.name}
                  onChange={(e) =>
                    updateDepartment(idx, "name", e.target.value)
                  }
                />
              ) : (
                <p className="font-medium">{d.name}</p>
              )}

              {isEditing ? (
                <input
                  type="number"
                  className="text-gray-500 text-sm mt-1 border rounded-lg p-1 w-20"
                  value={d.doctors}
                  onChange={(e) =>
                    updateDepartment(idx, "doctors", Number(e.target.value))
                  }
                />
              ) : (
                <span className="text-gray-500 text-sm">{d.doctors}명</span>
              )}

              {isEditing ? (
                <textarea
                  className="border rounded-lg p-2 mt-2 w-full"
                  value={d.description}
                  onChange={(e) =>
                    updateDepartment(idx, "description", e.target.value)
                  }
                />
              ) : (
                <p className="text-gray-500 text-sm mt-2">{d.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hospitalinfo;
