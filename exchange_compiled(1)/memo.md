# Git Clone 후 사용 방법
cd [프로젝트명]
npm install
npm run dev

------------------------------------------------------------------------------------------------
npm init
npm install react react-dom next

pages 폴더 생성
index.js 파일 생성, 간단한 내용 작성 후 출력 테스트

package.json에서 아래 입력하여
npm run dev 명령어 생성
/*
    "scripts": {
        "dev":"next dev",
        "build":"next build",
        "start":"next start"
    },
*/

/pages/
1. _app.jsx 파일 생성
인자값으로 pageProps 추가 // 서버사이드 렌더링 때문에 사용
2. _document.jsx
styles component 할 때 serverside rendering이 안돼서 css 처리를 위해 기존 코드 복붙하여 사용

.babelrc
1. serverside rendering의 css를 처리하기 위해 추가적인 바벨 설정 추가
2. npm install babel-plugin-styled-components

폴더 구조
> Components    // 화면을 구성하는 최소 단위
> Layouts       // header/footer 컴포넌트, Navigation
> Providers     // Store, Theme
> reducers      // actions, reducer
> saga          // redux의 middle ware인 saga
> pages         // page의 대표 화면
> utils         // 커스텀 hook, 데이터 정리 코드

# /Providers/
rootProvider.js : page 컴포넌트에서 감싸줌

# /Layouts/
ThemeLayout.jsx : page 컴포넌트를 감싸줌, UI적인 부분

# Redux Setting
npm install redux
npm install react-redux
npm install next-redux-wrapper
npm install redux-saga

선택 추가
npm install redux-devtools-extension    // 크롬에서 사용하는 확장 프로그램을 위한 패키지
npm install axios                       // fetch 보다 axios

Redux Setting 시 제일 먼저 할 것
store 만들기
/Providers/createCtx.js                 // 파일 생성
_app.jsx >> wrapper.withRedux 감싸주기
/saga/index.js                          // 파일 생성, 다른 Middleware들을 묶어주는
sagaEffect 사용
/saga/postSaga.js                       // 파일 생성
saga 만듬
/reducers/index.js                      // 파일 생성
index 파일 완성, reducer를 묶어주는 역할
/reducers/post.js                       // 파일 생성
post 관련 된 actions 내용을 넣고, action.type에 따른 state를 바꾸는 작업