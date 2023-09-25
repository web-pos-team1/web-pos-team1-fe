# P.O.S(Power Of Search)
P.O.S는 `안정성`과 `사용성`에 집중한 클라우드 기반 웹POS 시스템입니다.<br/>

#### [시연영상](https://youtu.be/Vr5r86-4ZD4)

#### [최종 산출물](https://drive.google.com/drive/folders/1DRXou06yzREKfCMPpMTFjdskvF2JchIj?usp=sharing)

## 💻 프로젝트 소개
 P.O.S는 RFP(Request for Proposal)와 현장조사를 통해 수집한 요구사항을 기반으로 개발되었습니다. 
 고객의 편의를 최우선으로 생각하며, 다국어 기능, 포인트 적립 및 사용, 결제(신용카드, 카카오페이, 삼성페이 등), 선물 및 배송 기능, 전자영수증 문자 발급 등 다양한 기능을 제공합니다.
 <br/>
<br/>
 ## 🌟 프로젝트 주제 및 기획의도
- 물류/유통업에서 가장 기본이 되는 기능은 상품 결제를 위한 `POS(Point Of Sale) 시스템`은 코로나19 이후로 비대면 서비스의 필요성 증대로 최근 가장 각광받고 있는 시스템임
- POS는 단순 상품 결제 기능만 있는 것이 아닌 상품별 이벤트 특가(에누리), 포인트 적용 등의 추가 기능이 요구됨
- 상품 선택 시 상품 코드별 자동 에누리, 포인트, 선물하기, 주문/배달 등의 기능을 제공함으로서 보다 더 `다양한 기능을 제공하는 Kiosk system을 개발`하고자 함
<br/>
<br/>
## ✨ 프로젝트 개요
<br/>

- ## 📝 프로젝트 계획도

<img src="https://postfiles.pstatic.net/MjAyMzA4MjhfMTQ4/MDAxNjkzMjMzNDY2MDI1.TuPz-rmhOtef_D9ILPaEuqCBf6U9PIiNFpjlDSncvjIg.pthD7pJspXPFPWAlOa4tEImUAaQ2PZBSlAJeF38q-a4g.PNG.dinuovo26/ProjectPlan.png?type=w966" width="800">

<br/>

- ## 👩🏻 User-flow
<img src="https://postfiles.pstatic.net/MjAyMzA4MjhfMTgx/MDAxNjkzMjMzNDY2MDEz.W4XPbd1rbujAZd33AogHh8X5ZP1t8NAgrNRlMmFmOJYg.2J9jv9B5fJorHtXFVeZ2fPPtMqW6uPXZtKYVzR9w6l4g.PNG.dinuovo26/UserFlow.png?type=w966" width="800">

<br/>

## ⚙️ 개발 환경 및 수행 도구
<img src="https://postfiles.pstatic.net/MjAyMzA4MjhfMTAy/MDAxNjkzMjMzNDY1MzEy.CjxG92_mfK_IfMzp4xdOHar-_kDmmMC2p2_AVlla_pkg.K0Jy-DZQmOzmXZEf22R0SAFFNFB_zb1BrxKdGDsgU_cg.PNG.dinuovo26/DevelopmentSetting.png?type=w966" width="800">
<img src="https://postfiles.pstatic.net/MjAyMzA4MjhfMjkw/MDAxNjkzMjMzNDY2MjUz.qD5n3FJ1x8u8Z4qD-nCIBrR_KbMX2-UHMSuUgSl3bwog.guK_C6vBLq4wbWjRXpEgQFH0PFWiUMGYwp4b5Vzsyccg.PNG.dinuovo26/VersionInfo.png?type=w966" width="800">
<br/>
<br/>

## 📆 개발 기간 
- 23.04.24 ~ 23.06.20
 
## ⚙ 기술 스택

**BackEnd**
- Java OpenJDK 11
- Redis 4.3.1
- Spring Boot 2.7.11
- MariaDB 10.6.10
- Jacoco 0.8.4

**FrontEnd**
- Node 16.20.0
- Next.js 13.1.6
- React 18.2.0
- TypeScript

**Cowork tools**
- GitHub
- Notion
- Google Drive
- Miro
- Figma <br/>

## 🚀 Demo
<h3>1. 다국어 기능 & 직원 호출 버튼</h3>
<p>현장 조사를 통해 발견된 다국어 지원 부족의 문제를 해결하기 위해, 한국어, 영어, 일본어, 중국어 언어 옵션을 제공합니다.</p>
<img src="https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/45fec16f-1a49-40aa-a9da-faf3d8b7e0fc" width="300"></br>
<h3>2. 장바구니 담기</h3>
<p>상품의 바코드를 바코드 리더로 인식하여 상품을 담거나, 화면 터치를 통해 상품을 선택하여 담는 기능을 제공합니다.</p>
<img src="https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/61260cb7-f0cb-47b5-ba6d-e920663e4848" width="300"></br>
<h3>3. 포인트 적립 </h3>
<p>회원은 전화번호를 입력하여 인증되면 최종 결제 금액의 0.1%가 적립됩니다.</p>
<img src="https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/4a1af15e-5e47-4d96-a59a-64e2737fecd0" width="300"></br>
<h3>4. 배송 </h3>
<p>
SSG 서비스에는 픽업, 배송 및 선물 서비스가 포함되어 있습니다. 회원은 등록된 주소와 원하는 배송 시간을 선택할 수 있으며, 배송과 관련된 문자 메시지가 전송됩니다. </p>

<table>
  <tr>
    <td><img src="https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/8d498e67-b791-4b4a-bb26-509a4de9078c" width="300" /></td>
   <td><img src="https://velog.velcdn.com/images/kyunghwan1207/post/8d60da0d-372b-404b-9abe-abe6e441348b/image.png" width="300" /></td>
  </tr>
</table>

<br/>
<h3>5. 상품권 사용 & 포인트 사용 & 결제 </h3>
<p>
상품권은 바코드를 인식하거나 상품권 번호를 입력하여 사용할 수 있습니다. 결제 단계에서 포인트 사용 기능을 제공하여 10포인트 단위로 포인트를 사용할 수 있으며 신용/체크카드, 모바일페이, 카카오페이, 삼성페이로 결제가 가능합니다. 결제가 완료되면 문자메세지로 전자 영수증이 발급됩니다.
</p>
<table>
  <tr>
    <td><img src="https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/126c8793-5be0-4ecd-b1f3-214f134105fc" width="300"/> </td>
   <td><img src="https://velog.velcdn.com/images/kyunghwan1207/post/73df0890-efe0-463c-bda9-ef51761781bd/image.png" width="300"/></td>
   <td><img src="https://velog.velcdn.com/images/kyunghwan1207/post/ebfb4999-0a25-41f3-8c1e-f0561f2dcab4/image.png" width="300"/></td>
  </tr>
</table>
</br>

<br/>


## 📌 주요 기능
### 사용자(비회원, 회원)

#### 사용자 공통 기능
- 바코드 스캐너를 통해 상품 장바구니에 추가
- 화면 터치를 통해 상품 장바구니에 추가
- Iamport 외부 결제 API를 통한 실제 결제 진행(※PG사로 NICE 페이먼츠 사용, 신용카드 수수료 3.2% 적용)
- 상품권 사용 (구매금액보다 초과된 상품권 사용불가)
- 3만원 이상 구매시 배송서비스 이용가능

#### 회원
- 사용자의 휴대폰 문자로 전자영수증 발급
- 사용자의 포인트 적립 및 사용 (10p 이상, 10p단위 - 신세계포인트정책 준수)
- 배송 완료시 배송 완료 문자 전송

### 관리자(HQ,Branch)

#### HQ (Headquarter, 본사)
- 전체 가게 매출 및 가게별 매출 현황 조회
- 파이차트를 통해 가게별 매출 비율 확인
- 라인차트를 통해 일일 매출 현황 확인
- 일주일, 1달, 3달 등 기간별 매출 정보 조회
- 매출 내역을 CSV 파일로 저장
- 매출 내역을 오름차순, 내림차순 정렬 조회

#### Branch (점주)
- 주문 취소 가능 (발급받은 전자영수증의 일련번호를 바코드스캐너로 스캔하여 손쉽게 입력가능)
- 주문 취소 시 주문 취소 전자영수증 발행
- 영수증 재발급
- 재고 수량이 30 미만인 상품 조회
- 재고 수량이 30 미만인 상품에 대한 발주 신청

## 프로젝트에 적용한 정책
#### [모바일쿠폰, 지류 상품권 정책 & 결제 수수료](https://branched-vibraphone-8ee.notion.site/ecea8fe4cb414236ae97b0fd259c8dd5)
#### [신세계 포인트 정책](https://branched-vibraphone-8ee.notion.site/188450811b714bcc88f14d35a3eaff23?pvs=4)

## ERD
#### [ERD Cloud 접속 링크](https://www.erdcloud.com/d/mEymNF59NqR2xosaE)
<img src="https://velog.velcdn.com/images/kyunghwan1207/post/466e4e3f-8d18-4b1d-9713-e961469f38f7/image.png" />
<br/>
<br/>

## 🌈 WBS
<img src = "https://postfiles.pstatic.net/MjAyMzA4MjhfMjI2/MDAxNjkzMjMzNDY2NzE0.smjhUQizPkKAGKx2cqS-VmpO9QKB6xELy-cCy5dq9-gg.TaERxAFOJHYv7tdIueET-be9QsjlaA2PxcB-VsLlfoMg.PNG.dinuovo26/WBS.png?type=w966" width="800" />



<br/>

## 🔀 Infrastructure
<img src = "https://velog.velcdn.com/images/kyunghwan1207/post/c44568e1-7816-41e3-b8ea-9cac5673ae88/image.png" width="800" />


## 👨‍👧‍👦팀 소개
|                                                                 FullStack                                                                 |                                                                 FE                                                                 |                                                                 FullStack                                                                  |                                                                 BE                                                                 |                                                                 BE                                                                 |
|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------:|
| <img src = "https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/5c29a339-8060-4770-8487-aa77184f3e71" width = "65"> | <img src = "https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/f7417913-c605-4791-92b6-dba217c9760f" width = "100">  |  <img src = "https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/93b55252-d15e-4efe-a641-265117528044" width = "100">  | <img src = "https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/c3d19c2c-8b5f-42e7-9911-0418022a018a" width = "100">  | <img src = "https://github.com/web-pos-team1/web-pos-team1-be/assets/75387909/853c9081-67ec-4da4-a2b1-f0bec541cfe0" width = "100">  
|                                                                [고경환](https://github.com/kyunghwan1207)                                                                 |                                                                [허선아](https://github.com/Nabom2)                                                                 |                                                                 [권혜진](https://github.com/mysterymrlee)                                                                 |                                                                [김진아](https://github.com/jinaa11)                                                                 |                                                                [유하경](https://github.com/yhk313)                                                                 |
