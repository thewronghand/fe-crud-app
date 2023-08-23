# 게시판 어플리케이션 Peony

코드스테이츠 미니 해커톤 과제물로 구현한, 기본적인 CRUD 기능을 갖춘 게시판 앱입니다.

## 새로 도입한 스택 / 구현한 것

**Firebase** 를 채용했습니다.
- Firestore를 이용한 게시물 DB 구현
- Firebase Auth를 이용한 구글 OAuth 로그인 구현
- Firebase Hosting을 통한 애플리케이션 배포
- Firebase 사용을 위한 초기 보일러플레이트 세팅 학습

**Recoil**을 채용했습니다.
- Redux와 Recoil 차이점 학습
- 프로젝트 기간 제한 (1주) 및 프로젝트 규모를 고려하여 Redux 대신 Recoil 채용
- 복잡한 보일러플레이트 세팅이 필요 없는, 간결하고 직관적인 상태 관리 로직 적용

**Pinterest식 레이아웃**을 구현했습니다.
- 5개의 column에 게시물이 작성 순으로 렌더링되고, 게시물의 height에 따라 불규칙하게 정렬되도록 구현
