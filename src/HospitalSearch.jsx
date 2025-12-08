import { useState } from "react";
import { Search, MapPin, Star, Phone, Clock, Navigation, Menu, X, ArrowLeft } from "lucide-react";


// 팀원 프로젝트에 맞게 import 경로 수정 필요
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Card, CardContent } from "./ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { ScrollArea } from "./ui/scroll-area";
// import { KakaoMap } from "./KakaoMap";
// import { ImageWithFallback } from "./ImageWithFallback";

// 임시로 간단한 UI 컴포넌트들 (팀원이 실제 UI 라이브러리로 교체 필요)
const Input = ({ className, ...props }) => (
  <input className={`border rounded px-3 py-2 ${className}`} {...props} />
);

const Button = ({ children, className, variant, size, ...props }) => (
  <button 
    className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`} 
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`bg-white border rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// 간단한 지도 컴포넌트 (실제로는 KakaoMap으로 교체)
const SimpleMap = ({ hospitals, selectedHospital, onHospitalSelect, className }) => (
  <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
    <div className="text-center">
      <div className="text-lg font-semibold mb-2">병원 지도</div>
      <div className="text-sm text-gray-600">
        {hospitals.length}개 병원이 표시됩니다
      </div>
      {selectedHospital && (
        <div className="mt-2 p-2 bg-blue-100 rounded">
          선택된 병원: {selectedHospital.name}
        </div>
      )}
    </div>
  </div>
);

const mockHospitals = [
  {
    id: "1",
    name: "순천향대학교 부천병원",
    address: "경기도 부천시 조마루로 170",
    phone: "032-621-5114",
    rating: 4.6,
    distance: "0.8km",
    specialties: ["내과", "외과", "소아과", "정형외과"],
    openHours: "08:00 - 17:30",
    image: "https://images.unsplash.com/photo-1719934398679-d764c1410770?w=300",
    latitude: 37.5045,
    longitude: 126.7644
  },
  {
    id: "2",
    name: "나사렛국제병원",
    address: "경기도 부천시 진달래로 29",
    phone: "1588-2012",
    rating: 4.4,
    distance: "1.2km",
    specialties: ["내과", "신경과", "심장내과", "산부인과"],
    openHours: "08:30 - 17:00",
    image: "https://images.unsplash.com/photo-1719934398679-d764c1410770?w=300",
    latitude: 37.5065,
    longitude: 126.7634
  },
  {
    id: "3",
    name: "부천세종병원",
    address: "경기도 부천시 호현로 489",
    phone: "032-340-1000",
    rating: 4.5,
    distance: "1.5km",
    specialties: ["정형외과", "신경외과", "내과", "외과"],
    openHours: "09:00 - 18:00",
    image: "https://images.unsplash.com/photo-1719934398679-d764c1410770?w=300",
    latitude: 37.5025,
    longitude: 126.7674
  }
];

export default function HospitalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [filteredHospitals, setFilteredHospitals] = useState(mockHospitals);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedHospitalDetail, setSelectedHospitalDetail] = useState(null);

  const handleSearch = () => {
    const filtered = mockHospitals.filter(hospital => {
      const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === "all" || hospital.specialties.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    });
    setFilteredHospitals(filtered);
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleHospitalDetailView = (hospital) => {
    setSelectedHospitalDetail(hospital);
    setIsListOpen(false);
  };

  return (
    <div className="relative h-[800px] overflow-hidden rounded-lg">
      {/* 전체 화면 지도 */}
      <div className="w-full h-full relative overflow-hidden rounded-lg">
        <SimpleMap 
          hospitals={filteredHospitals}
          selectedHospital={selectedHospital}
          onHospitalSelect={handleHospitalSelect}
          className="w-full h-full"
        />
      </div>
      
      {/* 병원 목록 토글 버튼 */}
      <Button 
        onClick={() => setIsListOpen(!isListOpen)}
        className="absolute top-4 left-4 z-40 bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
      >
        <Menu className="h-5 w-5 mr-2" />
        병원 목록
      </Button>

      {/* 병원 목록 슬라이드 패널 */}
      <div 
        className={`absolute top-0 left-0 h-full w-[400px] bg-white shadow-xl z-30 transition-transform duration-300 ease-in-out ${
          isListOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
        }`}
      >
        {/* 패널 헤더 */}
        <div className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Navigation className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">병원 검색</h2>
            </div>
            <Button 
              onClick={() => setIsListOpen(false)}
              className="p-2 w-auto h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">내 주변 병원을 검색하고 진료과별로 필터링할 수 있습니다.</p>
        </div>
        
        <div className="p-6 space-y-4 h-full overflow-hidden flex flex-col">
          {/* 검색 필터 */}
          <Card className="flex-shrink-0">
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="병원명, 지역으로 검색"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                <select 
                  value={selectedSpecialty} 
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="all">전체</option>
                  <option value="내과">내과</option>
                  <option value="외과">외과</option>
                  <option value="소아과">소아과</option>
                  <option value="산부인과">산부인과</option>
                  <option value="정형외과">정형외과</option>
                  <option value="신경과">신경과</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 병원 목록 */}
          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="font-medium mb-3 flex-shrink-0">병원 목록 ({filteredHospitals.length}개)</h3>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="space-y-3 pr-2">
                {filteredHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className={`bg-white border-2 p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedHospital?.id === hospital.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      handleHospitalSelect(hospital);
                      handleHospitalDetailView(hospital);
                    }}
                  >
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900">{hospital.name}</h3>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{hospital.openHours}</span>
                      </div>
                      
                      <div className="flex items-start text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{hospital.address}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-900">{hospital.rating}</span>
                        </div>
                        <span className="text-blue-600 text-sm font-medium">{hospital.distance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 병원 상세 정보 패널 */}
      {selectedHospitalDetail && (
        <div 
          className={`absolute top-0 left-0 h-full w-[400px] bg-white shadow-xl z-40 transition-transform duration-300 ease-in-out ${
            selectedHospitalDetail ? 'transform translate-x-0' : 'transform -translate-x-full'
          }`}
        >
          {/* 패널 헤더 */}
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Button 
                onClick={() => {
                  setSelectedHospitalDetail(null);
                  setIsListOpen(true);
                }}
                className="mr-3 p-2 w-auto h-auto"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">병원 상세 정보</h2>
            </div>
          </div>
          
          <div className="h-full overflow-hidden flex flex-col">
            {/* 병원 이미지 */}
            <div className="relative h-48 bg-gray-200 overflow-hidden flex-shrink-0">
              <img
                src={selectedHospitalDetail.image}
                alt={selectedHospitalDetail.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                1/4
              </div>
            </div>
            
            {/* 병원 정보 */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{selectedHospitalDetail.name}</h3>
                  <p className="text-gray-600">{selectedHospitalDetail.specialties.join(", ")}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{selectedHospitalDetail.rating}</span>
                    </div>
                    <span>·</span>
                    <span>리뷰 200+</span>
                    <span>·</span>
                    <span className="text-blue-600 font-medium">{selectedHospitalDetail.distance}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600">진료와 함께하는 특별한 순간</p>
                </div>
                
                {/* 운영시간 */}
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{selectedHospitalDetail.openHours}</span>
                </div>
                
                {/* 주소 */}
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span>{selectedHospitalDetail.address}</span>
                </div>
                
                {/* 액션 버튼들 */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button className="bg-gray-100 text-gray-900">
                    출발
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    예약하기
                  </Button>
                </div>
                
                {/* 하단 아이콘 메뉴 */}
                <div className="flex justify-around pt-6 border-t">
                  <div className="flex flex-col items-center space-y-1">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span className="text-xs text-gray-600">문의</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Star className="h-5 w-5 text-gray-600" />
                    <span className="text-xs text-gray-600">저장</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Navigation className="h-5 w-5 text-gray-600" />
                    <span className="text-xs text-gray-600">길찾기</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Search className="h-5 w-5 text-gray-600" />
                    <span className="text-xs text-gray-600">공유</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 지도 컨트롤 */}
      <div className="absolute top-4 right-4 space-y-2 z-30">
        <Button className="w-10 h-10 p-0">+</Button>
        <Button className="w-10 h-10 p-0">-</Button>
      </div>
    </div>
  );
}