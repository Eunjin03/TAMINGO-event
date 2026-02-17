

# 📸 TAMINGO! SNAP

> **데모데이의 소중한 순간을 TAMING!만의 프레임에 담다** 
> <br/>UMC 9th Demo Day TAMINGO!부스의 행사를 위해 제작된 실시간 웹캠 사진 촬영 및 커스텀 프레임 합성 서비스입니다.
<img width="1440" height="899" alt="스크린샷 2026-02-18 오전 5 00 32" src="https://github.com/user-attachments/assets/5de35402-3538-45cc-9ac2-951cde7bd93a" />
<br/>
<br/>

## 🌟 Key Features

* **Real-time Shooting**: `react-webcam`을 활용한 실시간 웹캠 미리보기 및 캡처.
* **Custom Frame Composite**: HTML5 Canvas API를 사용하여 사용자의 사진과 브랜드 프레임을 정밀하게 합성.
* **Instant Cloud Storage**: Supabase Storage를 연동하여 합성된 고해상도 이미지를 즉시 서버에 업로드.
* **QR Code Sharing**: 업로드된 이미지의 Public URL을 QR 코드로 변환하여 사용자가 개인 모바일 기기로 사진을 즉시 소장할 수 있도록 지원.
* **Live Participant Count**: 실시간으로 축적된 데이터베이스를 조회하여 스냅 촬영 총 참여자 수를 홈 화면에 역동적으로 표시.

<br/>

## 🛠 Tech Stack

| Category | Tech Stack |
| --- | --- |
| **Frontend** | React (Vite), TypeScript, Tailwind CSS (v4) |
| **Backend** | Supabase (Storage, Auth Policies) |
| **Libraries** | react-webcam, qrcode.react, react-countup, react-router-dom |
| **Deployment** | Vercel (https://tamingo-event.vercel.app/) |

<br/>

## 📐 Technical Challenges & Solutions

### 1. 정밀한 이미지 레이어링 및 합성 (Canvas API)

* **문제**: 웹캠에서 캡처한 사진과 고해상도 디자인 프레임의 크기가 달라 합성이 어려움.
* **해결**: Canvas API를 활용하여 프레임 크기를 기준으로 도화지를 설정하고, 지정된 좌표에 사진을 먼저 드로잉한 후 프레임 PNG를 덮어씌우는 방식으로 완벽한 결과물 구현.

### 2. 서버리스 아키텍처 및 보안 (Supabase)

* **문제**: 별도의 백엔드 서버 없이 클라이언트에서 직접 이미지 업로드가 필요함.
* **해결**: Supabase Storage를 연동하고, `anon` 유저도 지정된 버킷에 `INSERT` 및 `SELECT`가 가능하도록 **Row Level Security (RLS)** 정책을 설정하여 보안과 효율성을 동시에 확보.

### 3. 사용자 경험 (UX) 최적화

* **애니메이션**: Tailwind CSS v4의 `@theme` 기능을 활용해 배경 요소가 둥둥 떠다니는 `float` 애니메이션과 `react-countup`을 통한 실시간 참여자 수 카운팅 연출.
* **모바일 연동**: 데모데이 현장에서 기기를 연결하는 번거로움 없이 QR 코드 스캔만으로 사진을 저장할 수 있는 워크플로우 구축.

<br/>

## 🚀 Getting Started

```bash
# 의존성 설치
yarn install

# 환경 변수 설정 (.env)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 개발 서버 실행
yarn run dev

```

<br/>

## 💡 Project Structure

```text
src/
├── assets/          # 프레임 및 정적 이미지
├── components/      # 공용 컴포넌트
├── pages/
│   ├── start        # 웹캠 촬영 페이지
│   ├── shooting     # 웹캠 촬영 페이지
│   ├── deco         # 프레임 선택 및 합성/업로드 페이지
│   └── result       # 결과물 조회 및 QR 코드 표시 페이지
├── router/
│   └── AppRoutes    # 라우팅 관리
└── supabase.ts      # Supabase 클라이언트 설정 

```

<br/>

**지니/오은진** | UMC 9th Project TAMINGO! - PM
<br/> [TAMINGO! 레포지토리 바로가기](https://github.com/TAMINGO-UMC)
<br /> [TAMINGO! 랜딩페이지 바로가기](https://makeus-challenge.notion.site/TAMINGO-2f8b57f4596b8040bfacdc211e708229?source=copy_link)



