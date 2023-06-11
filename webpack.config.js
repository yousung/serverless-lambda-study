// 웹팩 설정파일은 자바스크립트 기반임으로 자바스크립트 문법을 따라야함. 예) import -> require
// 해당 파일도 ts 로 가능하지만 해야할일이 serverless-webpack 이 js로 작성되어서 할게 너무 많음. ( 따로 공부해보세요 )
const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  stats: "normal",
  // 빌드시 개발환경을 구분하기 위함
  // 추후에 추가될 serverless-offline 플러그인을 위해서 구분지어두면 좋음
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  // 웹팩 진입점
  // serverless.yml 파일의 package.individually 옵션 설정에 따라서 모든 함수를 하나의 파일로, 또는 함수마다 다른 파일로 빌드 할 수 있다.
  entry : slsw.lib.entries,
  // 옵션의 빌드한 결과물이 실제 코드의 어느 위치에 대응하는 source-map 파일 생성 옵션
  // 생각해볼 문제가 많은 아이 ( 학습 및 개발중에는 사용하는 것으로 합의 보고 진행 )
  devtool: "source-map",
  // 웹팩이 처리할 파일 설정
  resolve: {
    // 확장자가 다음과 같은 경우 웹팩이 처리한다
    extensions: [".mjs", ".json", ".ts", ".js"],
  },
  //  결과물 생성
  output: {
    // 모듈 표준을 commonjs2로
    libraryTarget: "commonjs2",
    // .webpack 디렉토리에
    path: path.join(__dirname, '.webpack'),
    // 다음과 같은 결과물로 생성
    filename: "[name].js",
  },
  // node 용으로 결과물 생성
  // 브라우저나 일렉트론js의 경우 값이 바뀐다. lambda 는 node 임으로 node
  target: "node",
  module: {
    // ts-loader 설정
    rules: [
      {
        // 모든 .ts 파일에
        test: /\.ts$/,
        // ts-loader 를 적용하지만,
        loader: "ts-loader",
        // node_modules 은 제외
        exclude: "/node_modules/"
      }
    ]
  }
}