"use client";

import { useEffect } from "react";

// TypeScript에서 window 객체에 kakao 네임스페이스가 있음을 알려줍니다.
declare global {
  interface Window {
    kakao: any;
  }
}

// 컴포넌트가 받을 props의 타입을 정의합니다.
interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

export default function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
          const mapOption = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          // ✅ 이 부분에 latitude와 longitude를 넣어 마커 위치를 지정합니다.
          const markerPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
        }
      });
    }
  }, [latitude, longitude]);

  // ✅ 가장 중요: JSX 요소를 return해야 리액트 컴포넌트로 인식됩니다.
  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
    ></div>
  );
}
