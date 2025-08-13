# LoaSearch - 로스트아크 캐릭터 검색 서비스

Lost Ark 공식 API를 활용하여 캐릭터 검색, 장비·보석·각인·팔찌 등 세부 정보를 제공하는 웹 서비스입니다.  

---

##  배포 링크
- **사이트 (Netlify)** 👉 https://loasearch.netlify.app
- **GitHub Repository** 👉 [cheolwankim/loasearch](https://github.com/cheolwankim/loasearch)

---

## 🛠 기술 스택

| 영역         | 기술 |
|--------------|------|
| 프레임워크   | React 18 |
| 언어         | TypeScript |
| 스타일       | Tailwind CSS |
| 라우팅       | react-router-dom |
| 데이터 요청  | Axios |
| 빌드/설정    | Create React App, react-app-rewired, customize-cra |
| 배포         | Netlify |

---

## 핵심 기능 요약
- **캐릭터 검색**
  - 닉네임 입력 시 Lost Ark API 호출 → 캐릭터 프로필 및 장비 정보 표시
- **장비 / 보석 / 각인 / 팔찌 상세 정보 표시**
  - 인게임과 동일하게 표시
---

## 주요 화면
<img width="1029" height="284" alt="Image" src="https://github.com/user-attachments/assets/b22a0bdb-6754-4114-8039-594931a3fa60" />

<br><br><br>





<img width="1027" height="548" alt="Image" src="https://github.com/user-attachments/assets/3ffabdae-081c-4090-9a95-d269da4b800a" />


---

## 핵심 구현 경험

1. **Lost Ark API 연동**
   - 인증키를 사용해 Axios로 API 요청
   - 캐릭터 프로필, 장비, 각인, 보석, 팔찌 데이터를 각각 파싱
2. **툴팁 데이터 파싱**
   - tooltipParser.ts를 중심으로 복잡한 JSON 데이터에서 필요한 필드 추출
   - 품질, 등급, 옵션 티어 색상 규칙 구현
3. **UI 컴포넌트 분리**
   - `components/Character`, `components/Equipment`, `components/Sidebar`로 폴더 구조화
4. **SPA 라우팅 문제 해결**
   - Netlify에서 `_redirects` 설정으로 새로고침 404 문제 해결
5. **Webpack Alias 적용**
   - `@`를 `src`로 매핑하여 import 경로 단축 (`config-overrides.js` 활용)

---

## 실행 방법

### 프론트엔드 실행
```bash
git clone https://github.com/cheolwankim/loasearch.git
cd loasearch
npm install
npm start
