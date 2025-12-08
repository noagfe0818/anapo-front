//app/api/reservations/[userId]/route.ts

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool(process.env.DATABASE_URL || "");

// --- '내 예약 목록' (GET 함수) ---
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params; //URL에서 [userId] 값을 가져옴

    if (!userId) {
      return NextResponse.json(
        { message: "사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 1. DB에서 특정 유저의 예약 목록 찾기 (Raw SQL)
    const [rows]: any[] = await pool.execute(
      "SELECT * FROM Reservation WHERE userId = ? ORDER BY createdAt DESC", //최신순 정렬
      [userId]
    );

    //    2. 성공! (예약 목록 반환)
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("내 예약 목록 API 에러:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
