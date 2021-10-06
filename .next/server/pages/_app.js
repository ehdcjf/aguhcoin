(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.jsx":
/*!************************!*\
  !*** ./pages/_app.jsx ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.css */ "./index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/configureStore */ "./store/configureStore.js");


var _jsxFileName = "C:\\Users\\82102\\OneDrive\\\uBC14\uD0D5 \uD654\uBA74\\exchange_with_next.js3\\pages\\_app.jsx";




const App = ({
  Component
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 9,
        columnNumber: 17
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 17
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;500;900&display=swap",
        rel: "stylesheet"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 17
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 13
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 13
    }, undefined), " "]
  }, void 0, true);
};

/* harmony default export */ __webpack_exports__["default"] = (_store_configureStore__WEBPACK_IMPORTED_MODULE_3__.default.withRedux(App));

/***/ }),

/***/ "./reducers/category.js":
/*!******************************!*\
  !*** ./reducers/category.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const initialState = {
  menu: [{
    id: '1',
    category: 'HTML',
    url: '/posts/HTML'
  }, {
    id: '2',
    category: '대분류메뉴2',
    url: '/posts/2'
  }, {
    id: '3',
    category: '대분류메뉴3',
    url: '/posts/3'
  }, {
    id: '4',
    category: '대분류메뉴4',
    url: '/posts/4'
  }, {
    id: '5',
    category: '대분류메뉴5',
    url: '/posts/5'
  }]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./reducers/index.js":
/*!***************************!*\
  !*** ./reducers/index.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "./reducers/user.js");
/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category */ "./reducers/category.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const reducer = (0,redux__WEBPACK_IMPORTED_MODULE_1__.combineReducers)({
  index: (state = {}, action) => {
    switch (action.type) {
      case next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0__.HYDRATE:
        return _objectSpread(_objectSpread({}, state), action.payload);

      default:
        return state;
    }
  },
  user: _user__WEBPACK_IMPORTED_MODULE_2__.default,
  category: _category__WEBPACK_IMPORTED_MODULE_3__.default
});
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./reducers/user.js":
/*!**************************!*\
  !*** ./reducers/user.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserLoginAction": function() { return /* binding */ UserLoginAction; },
/* harmony export */   "UserLogin_REQUEST": function() { return /* binding */ UserLogin_REQUEST; },
/* harmony export */   "UserLogin_SUCCESS": function() { return /* binding */ UserLogin_SUCCESS; },
/* harmony export */   "UserLogin_ERROR": function() { return /* binding */ UserLogin_ERROR; },
/* harmony export */   "UserLogoutAction": function() { return /* binding */ UserLogoutAction; }
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initialState = {
  loadding: false,
  IsLogin: false
};
const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
const USER_LOGOUT = "USER_LOGOUT";
const UserLoginAction = data => {
  return async dispatch => {
    dispatch(UserLogin_REQUEST());

    try {
      //fetch 성공적인부분
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(_objectSpread({}, data))
      });
      const result = await response.json(); // {
      //     result:'OK',
      //     msg:'로그인에 성공했습니다.'
      // }

      result.result === 'OK' ? dispatch(UserLogin_SUCCESS(result)) : dispatch(UserLogin_ERROR());
    } catch (e) {
      //error
      dispatch(UserLogin_ERROR());
    }
  };
};
const UserLogin_REQUEST = data => {
  return {
    type: USER_LOGIN_REQUEST
  };
};
const UserLogin_SUCCESS = () => {
  return {
    type: USER_LOGIN_SUCCESS
  };
};
const UserLogin_ERROR = () => {
  return {
    type: USER_LOGIN_ERROR
  };
};
const UserLogoutAction = () => {
  return {
    type: USER_LOGOUT
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, {
        loadding: true
      });

    case USER_LOGIN_SUCCESS:
      return _objectSpread(_objectSpread({}, state), {}, {
        IsLogin: true,
        loadding: false
      });

    case USER_LOGIN_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, {
        loadding: false
      });

    case USER_LOGOUT:
      return _objectSpread(_objectSpread({}, state), {}, {
        IsLogin: false
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./store/configureStore.js":
/*!*********************************!*\
  !*** ./store/configureStore.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers */ "./reducers/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-devtools-extension */ "redux-devtools-extension");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_4__);




 // npm install redux-thunk

const loggerMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  // console.log(action,dispatch,getState)
  console.log(action);
  return next(action);
}; // redux middleware 사용할수있는 설정까지하고 그리고 devtools사용까지. 


const configureStore = () => {
  const middlewares = [loggerMiddleware, (redux_thunk__WEBPACK_IMPORTED_MODULE_4___default())];
  const enhancer =  false ? 0 : (0,redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__.composeWithDevTools)((0,redux__WEBPACK_IMPORTED_MODULE_1__.applyMiddleware)(...middlewares)); // const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

  const Store = (0,redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(_reducers__WEBPACK_IMPORTED_MODULE_2__.default, enhancer);
  return Store;
}; // createStore (reducer) === createContext (상태초기값) 초기값을 상태를 가지고
//              reducer안에 상태초기값을 가지고있어요   
// 첫번째 redux의 
// Store => const Store = createContext(initialState) 
// 두번째


const wrapper = (0,next_redux_wrapper__WEBPACK_IMPORTED_MODULE_0__.createWrapper)(configureStore, {
  debug: true
}); // createWrapper ?  configureStore Store를 가지고있는 함수표현식에대한 함수

/* harmony default export */ __webpack_exports__["default"] = (wrapper); // wrapper ?

/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/***/ (function() {



/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next-redux-wrapper");;

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("redux");;

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/***/ (function(module) {

"use strict";
module.exports = require("redux-devtools-extension");;

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("redux-thunk");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/_app.jsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udC8uL3BhZ2VzL19hcHAuanN4Iiwid2VicGFjazovL2Zyb250Ly4vcmVkdWNlcnMvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL3JlZHVjZXJzL3VzZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zdG9yZS9jb25maWd1cmVTdG9yZS5qcyIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQtcmVkdXgtd3JhcHBlclwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9oZWFkXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiXSwibmFtZXMiOlsiQXBwIiwiQ29tcG9uZW50Iiwid3JhcHBlciIsImluaXRpYWxTdGF0ZSIsIm1lbnUiLCJpZCIsImNhdGVnb3J5IiwidXJsIiwicmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsImNvbWJpbmVSZWR1Y2VycyIsImluZGV4IiwiSFlEUkFURSIsInBheWxvYWQiLCJ1c2VyIiwibG9hZGRpbmciLCJJc0xvZ2luIiwiVVNFUl9MT0dJTl9SRVFVRVNUIiwiVVNFUl9MT0dJTl9TVUNDRVNTIiwiVVNFUl9MT0dJTl9FUlJPUiIsIlVTRVJfTE9HT1VUIiwiVXNlckxvZ2luQWN0aW9uIiwiZGF0YSIsImRpc3BhdGNoIiwiVXNlckxvZ2luX1JFUVVFU1QiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzdWx0IiwianNvbiIsIlVzZXJMb2dpbl9TVUNDRVNTIiwiVXNlckxvZ2luX0VSUk9SIiwiZSIsIlVzZXJMb2dvdXRBY3Rpb24iLCJsb2dnZXJNaWRkbGV3YXJlIiwiZ2V0U3RhdGUiLCJuZXh0IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyZVN0b3JlIiwibWlkZGxld2FyZXMiLCJ0aHVua01pZGRsZXdhcmUiLCJlbmhhbmNlciIsImNvbXBvc2UiLCJjb21wb3NlV2l0aERldlRvb2xzIiwiYXBwbHlNaWRkbGV3YXJlIiwiU3RvcmUiLCJjcmVhdGVTdG9yZSIsImNyZWF0ZVdyYXBwZXIiLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLE1BQU1BLEdBQUcsR0FBRyxDQUFDO0FBQUNDO0FBQUQsQ0FBRCxLQUFpQjtBQUN6QixzQkFDSTtBQUFBLDRCQUNJLDhEQUFDLGtEQUFEO0FBQUEsOEJBQ0k7QUFBTSxXQUFHLEVBQUMsWUFBVjtBQUF1QixZQUFJLEVBQUM7QUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFESixlQUVJO0FBQU0sV0FBRyxFQUFDLFlBQVY7QUFBdUIsWUFBSSxFQUFDLDJCQUE1QjtBQUF3RCxtQkFBVyxFQUFDO0FBQXBFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRkosZUFHSTtBQUFNLFlBQUksRUFBQyxxRkFBWDtBQUFpRyxXQUFHLEVBQUM7QUFBckc7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREosZUFNSSw4REFBQyxTQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBTko7QUFBQSxrQkFESjtBQVVILENBWEQ7O0FBYUEsK0RBQWVDLG9FQUFBLENBQWtCRixHQUFsQixDQUFmLEU7Ozs7Ozs7Ozs7OztBQ2pCQSxNQUFNRyxZQUFZLEdBQUc7QUFDakJDLE1BQUksRUFBQyxDQUNEO0FBQ0lDLE1BQUUsRUFBQyxHQURQO0FBRUlDLFlBQVEsRUFBQyxNQUZiO0FBR0lDLE9BQUcsRUFB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TU0sS0FBSyxHQUFHQyxrREFBVyxDQUFDN0MsOENBQUQsRUFBU3dDLFFBQVQsQ0FBekI7QUFDQSxTQUFPSSxLQUFQO0FBQ0gsQ0FSRCxDLENBUUU7QUFDQTtBQUVGO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTWxELE9BQU8sR0FBR29ELGlFQUFhLENBQUNULGNBQUQsRUFBZ0I7QUFDekNVLE9BQUs7QUFEb0MsQ0FBaEIsQ0FBN0IsQyxDQUVHOztBQUVILCtEQUFlckQsT0FBZixFLENBQXVCLFk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDdkIsZ0Q7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7Ozs7O0FDQUEseUMiLCJmaWxlIjoicGFnZXMvX2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vaW5kZXguY3NzJztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0IHdyYXBwZXIgZnJvbSAnLi4vc3RvcmUvY29uZmlndXJlU3RvcmUnO1xyXG5cclxuY29uc3QgQXBwID0gKHtDb21wb25lbnR9KSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxIZWFkPlxyXG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXCIgLz5cclxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInByZWNvbm5lY3RcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiIGNyb3NzT3JpZ2luPVwidHJ1ZVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Ob3RvK1NhbnMrS1I6d2dodEAxMDA7NTAwOzkwMCZkaXNwbGF5PXN3YXBcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cclxuICAgICAgICAgICAgPC9IZWFkPlxyXG4gICAgICAgICAgICA8Q29tcG9uZW50IC8+IHsvKiDsmrDrpqzqsIDrp4zrk6Ag7YyM7J2865Ok7J20IOyXrOq4sOyXkCDsnITsuZjtlbTsmpQuICovfVxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlci53aXRoUmVkdXgoQXBwKTsiLCJjb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBtZW51OltcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOicxJyxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6J0hUTUwnLFxyXG4gICAgICAgICAgICB1cmw6Jy9wb3N0cy9IVE1MJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDonMicsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OifrjIDrtoTrpZjrqZTribQyJyxcclxuICAgICAgICAgICAgdXJsOicvcG9zdHMvMidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6JzMnLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTon64yA67aE66WY66mU64m0MycsXHJcbiAgICAgICAgICAgIHVybDonL3Bvc3RzLzMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOic0JyxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6J+uMgOu2hOulmOuplOuJtDQnLFxyXG4gICAgICAgICAgICB1cmw6Jy9wb3N0cy80J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDonNScsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OifrjIDrtoTrpZjrqZTribQ1JyxcclxuICAgICAgICAgICAgdXJsOicvcG9zdHMvNSdcclxuICAgICAgICB9LFxyXG4gICAgXVxyXG59XHJcblxyXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlPWluaXRpYWxTdGF0ZSxhY3Rpb24pID0+IHtcclxuICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZHVjZXIiLCJpbXBvcnQgeyBIWURSQVRFIH0gZnJvbSBcIm5leHQtcmVkdXgtd3JhcHBlclwiXHJcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gXCJyZWR1eFwiXHJcblxyXG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInXHJcbmltcG9ydCBjYXRlZ29yeSBmcm9tICcuL2NhdGVnb3J5J1xyXG5cclxuY29uc3QgcmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBpbmRleDogKHN0YXRlPXt9LGFjdGlvbikgPT4ge1xyXG4gICAgICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgSFlEUkFURTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1c2VyLFxyXG4gICAgY2F0ZWdvcnksXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWR1Y2VyIiwiY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgbG9hZGRpbmc6ZmFsc2UsXHJcbiAgICBJc0xvZ2luOmZhbHNlLFxyXG59XHJcblxyXG5jb25zdCBVU0VSX0xPR0lOX1JFUVVFU1QgPSBcIlVTRVJfTE9HSU5fUkVRVUVTVFwiXHJcbmNvbnN0IFVTRVJfTE9HSU5fU1VDQ0VTUyA9IFwiVVNFUl9MT0dJTl9TVUNDRVNTXCJcclxuY29uc3QgVVNFUl9MT0dJTl9FUlJPUiA9IFwiVVNFUl9MT0dJTl9FUlJPUlwiXHJcbmNvbnN0IFVTRVJfTE9HT1VUID0gXCJVU0VSX0xPR09VVFwiXHJcblxyXG5leHBvcnQgY29uc3QgVXNlckxvZ2luQWN0aW9uID0gZGF0YSA9PiB7XHJcbiAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpPT57XHJcbiAgICAgICBkaXNwYXRjaChVc2VyTG9naW5fUkVRVUVTVCgpKVxyXG4gICAgICAgdHJ5e1xyXG4gICAgICAgIC8vZmV0Y2gg7ISx6rO17KCB7J2467aA67aEXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9sb2dpbicse1xyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6XCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkoey4uLmRhdGF9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcblxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgcmVzdWx0OidPSycsXHJcbiAgICAgICAgLy8gICAgIG1zZzon66Gc6re47J247JeQIOyEseqzte2WiOyKteuLiOuLpC4nXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJlc3VsdC5yZXN1bHQgPT09ICdPSycgXHJcbiAgICAgICAgPyBkaXNwYXRjaChVc2VyTG9naW5fU1VDQ0VTUyhyZXN1bHQpKVxyXG4gICAgICAgIDogZGlzcGF0Y2goVXNlckxvZ2luX0VSUk9SKCkpXHJcbiAgICAgICAgXHJcbiAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy9lcnJvclxyXG4gICAgICAgIGRpc3BhdGNoKFVzZXJMb2dpbl9FUlJPUigpKVxyXG4gICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyTG9naW5fUkVRVUVTVCA9IGRhdGEgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOlVTRVJfTE9HSU5fUkVRVUVTVCxcclxuICAgIH1cclxufSBcclxuZXhwb3J0IGNvbnN0IFVzZXJMb2dpbl9TVUNDRVNTID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOlVTRVJfTE9HSU5fU1VDQ0VTUyxcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgVXNlckxvZ2luX0VSUk9SID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOlVTRVJfTE9HSU5fRVJST1IsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyTG9nb3V0QWN0aW9uID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOlVTRVJfTE9HT1VUXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGU9aW5pdGlhbFN0YXRlLGFjdGlvbikgPT4ge1xyXG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcclxuICAgICAgICBjYXNlIFVTRVJfTE9HSU5fUkVRVUVTVDpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbG9hZGRpbmc6dHJ1ZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgVVNFUl9MT0dJTl9TVUNDRVNTOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBJc0xvZ2luOnRydWUsICAgXHJcbiAgICAgICAgICAgICAgICBsb2FkZGluZzpmYWxzZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgVVNFUl9MT0dJTl9FUlJPUjpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbG9hZGRpbmc6ZmFsc2UsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBjYXNlIFVTRVJfTE9HT1VUOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBJc0xvZ2luOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZHVjZXIiLCJpbXBvcnQge2NyZWF0ZVdyYXBwZXJ9IGZyb20gJ25leHQtcmVkdXgtd3JhcHBlcidcclxuaW1wb3J0IHthcHBseU1pZGRsZXdhcmUsIGNyZWF0ZVN0b3JlLCBjb21wb3NlfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi4vcmVkdWNlcnMnXHJcbmltcG9ydCB7Y29tcG9zZVdpdGhEZXZUb29sc30gZnJvbSAncmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uJ1xyXG5pbXBvcnQgdGh1bmtNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXRodW5rJ1xyXG5cclxuLy8gbnBtIGluc3RhbGwgcmVkdXgtdGh1bmtcclxuXHJcbmNvbnN0IGxvZ2dlck1pZGRsZXdhcmUgPSAoeyBkaXNwYXRjaCwgZ2V0U3RhdGUgfSkgPT4gKG5leHQpID0+IChhY3Rpb24pID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFjdGlvbixkaXNwYXRjaCxnZXRTdGF0ZSlcclxuICAgIGNvbnNvbGUubG9nKGFjdGlvbilcclxuICAgIHJldHVybiBuZXh0KGFjdGlvbilcclxufVxyXG5cclxuLy8gcmVkdXggbWlkZGxld2FyZSDsgqzsmqntlaDsiJjsnojripQg7ISk7KCV6rmM7KeA7ZWY6rOgIOq3uOumrOqzoCBkZXZ0b29sc+yCrOyaqeq5jOyngC4gXHJcblxyXG5jb25zdCBjb25maWd1cmVTdG9yZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1pZGRsZXdhcmVzID0gW2xvZ2dlck1pZGRsZXdhcmUsdGh1bmtNaWRkbGV3YXJlXVxyXG4gICAgY29uc3QgZW5oYW5jZXIgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICA/IGNvbXBvc2UoYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmVzKSlcclxuICAgIDogY29tcG9zZVdpdGhEZXZUb29scyhhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpKVxyXG4gICAgLy8gY29uc3QgZW5oYW5jZXIgPSBjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcykpXHJcbiAgICBjb25zdCBTdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsZW5oYW5jZXIpICAgIFxyXG4gICAgcmV0dXJuIFN0b3JlXHJcbn0gLy8gY3JlYXRlU3RvcmUgKHJlZHVjZXIpID09PSBjcmVhdGVDb250ZXh0ICjsg4Htg5zstIjquLDqsJIpIOy0iOq4sOqwkuydhCDsg4Htg5zrpbwg6rCA7KeA6rOgXHJcbiAgLy8gICAgICAgICAgICAgIHJlZHVjZXLslYjsl5Ag7IOB7YOc7LSI6riw6rCS7J2EIOqwgOyngOqzoOyeiOyWtOyalCAgIFxyXG5cclxuLy8g7LKr67KI7Ke4IHJlZHV47J2YIFxyXG4vLyBTdG9yZSA9PiBjb25zdCBTdG9yZSA9IGNyZWF0ZUNvbnRleHQoaW5pdGlhbFN0YXRlKSBcclxuLy8g65GQ67KI7Ke4XHJcbmNvbnN0IHdyYXBwZXIgPSBjcmVhdGVXcmFwcGVyKGNvbmZpZ3VyZVN0b3JlLHtcclxuICAgIGRlYnVnOnByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXHJcbn0pIC8vIGNyZWF0ZVdyYXBwZXIgPyAgY29uZmlndXJlU3RvcmUgU3RvcmXrpbwg6rCA7KeA6rOg7J6I64qUIO2VqOyImO2RnO2YhOyLneyXkOuMgO2VnCDtlajsiJhcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdyYXBwZXIgLy8gd3JhcHBlciA/ICIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtcmVkdXgtd3JhcHBlclwiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9oZWFkXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOzsiXSwic291cmNlUm9vdCI6IiJ9