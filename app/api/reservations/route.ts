//app/api/reservations/route.ts

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { randomUUID } from "crypto";

const pool = mysql.createPool(process.env.DATABASE_URL || "");

// --- '예약하기' (POST 함수) ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, hospitalName, doctorName, reservationDate } = body;

    if (!userId || !hospitalName || !reservationDate) {
      return NextResponse.json(
        { message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    const newId = randomUUID();

    //   1. DB에 예약 정보 삽입
    await pool.execute(
      `INSERT INTO Reservation (id, userId, hospitalName, doctorName, reservationDate, status)
        VALUES (?, ?, ?, ?, ?, '예약완료')`,
      [
        newId,
        userId,
        hospitalName,
        doctorName || null,
        //    ✅ 2. 'new Date()'를 다시 살려서, 문자열을 DATETIME 객체로 변환
        new Date(reservationDate),
      ]
    );

    //    3. 성공 응답
    return NextResponse.json(
      { message: "예약이 완료되었습니다.", reservationId: newId },
      { status: 201 }
    );
  } catch (error) {
    console.error("예약 API 에러:", error);
    return NextResponse.json(
      { message: "서버 오류 (예약 실패)" },
      { status: 500 }
    );
  }
}
