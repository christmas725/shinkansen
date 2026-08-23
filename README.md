# Tokyo Station Shinkansen Departure Board v0.4

도쿄역 도카이도·산요 신칸센 출발 전광판 프로토타입입니다.

## v0.4 변경사항

- JR도카이 공식 **발차순서 안내(東京・下り)** 페이지를 서버에서 브라우저로 렌더링해 실시간 정보 추출 시도
- 약 **45초 간격** 자동 갱신
- 실시간 데이터가 정상일 때 `JR LIVE / JR 실시간` 표시
- 실시간 정보가 실패하거나 JR 페이지 구조가 변경되면 기존 **공식 시각표 기반 FALLBACK** 자동 사용
- 지연: 시각표상의 출발시각은 유지하고 `12分遅れ / 12 min late / 12분 지연`을 별도 표시
- `運休 / CANCELLED / 운휴`
- `発車未定 / DEPARTURE TBD / 출발 미정`
- `番線未定 / TRACK TBD / 번선 미정`
- 임시열차 표시
- TEST 시각 사용 중에는 실시간 정보를 사용하지 않고 시각표 모드로 고정
- v0.3의 자유석 안내 및 정차역 슬라이드(언어별 2회) 유지

## 파일 구조

```text
index.html
styles.css
app.js
api/
  realtime.js
package.json
vercel.json
```

## 실행 방식

### 1. 정적 미리보기

`index.html`을 직접 열어도 기존 시각표 기반 전광판은 작동합니다.

정적 환경에서는 `/api/realtime` 서버 함수가 없기 때문에 상태가 `FALLBACK`으로 표시됩니다.

### 2. Vercel 배포 — 실시간 모드

프로젝트 폴더를 Vercel에 배포하면 `api/realtime.js`가 서버리스 함수로 동작합니다.

```bash
npm install
vercel
```

또는 Git 저장소를 Vercel에 연결해서 그대로 배포할 수 있습니다.

Node.js 22 이상을 사용하도록 `package.json`에 지정되어 있습니다.

## 실시간 데이터 테스트

서버 함수가 배포된 뒤 다음 주소로 접속하면 파서 대신 테스트용 실시간 데이터를 반환합니다.

```text
/api/realtime?mock=1
```

이 기능은 API 응답 형태 확인용이며 실제 전광판은 기본적으로 `/api/realtime`을 호출합니다.

## 상태 표시

- `JR LIVE / JR 실시간`: JR도카이 페이지에서 열차 데이터를 정상적으로 읽은 상태
- `CONNECTING`: 실시간 데이터 요청 중
- `TIMETABLE FALLBACK`: 실시간 데이터를 읽지 못해 내장 시간표 사용 중
- `TEST MODE`: 사용자가 TEST 시각을 지정한 상태

## 실시간 정보 소스

JR Central / JR東海 발차순서 안내:

```text
https://traininfo.jr-central.co.jp/shinkansen/pc/ja/ti04.html?station=1&bound=2
```

JR도카이는 이 화면에서 검색 시점의 최신 발차순서, 열차명·번호, 시각표상의 발차시각, 번선, 행선지, 정차역 및 지연 시분을 제공한다고 안내하고 있습니다.

## 주의

JR도카이가 공개한 개발자용 공식 JSON API를 사용하는 구조가 아니라, 공식 웹페이지를 브라우저로 렌더링한 뒤 표시 내용을 해석하는 방식입니다. 따라서 JR 사이트의 HTML/JavaScript 구조가 바뀌면 실시간 파서가 동작하지 않을 수 있습니다. 이 경우 전광판은 자동으로 시각표 FALLBACK을 사용합니다.

실제 역 안내와 본 페이지 정보가 다를 수 있으므로 운행 판단에는 JR도카이 공식 안내를 우선해야 합니다.
