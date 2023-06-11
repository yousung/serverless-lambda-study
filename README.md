# AWS Lambda 강의용 코드

## 1일차
### Serverless Framework Hello World

---

#### AWS 액세스키 획득
- AWS CLI 를 위한 계정 생성 및 Key, Secret key 획득

#### AWS CLI 설치
```shell
# brew aws cli install
brew install awscli

# aws iam 설정
aws configure

# aws config 설정 확인
cat ~/.aws/config
cat ~/.aws/credentials
```
---

### AWS CLI Me?
```shell
aws --region ap-northeast-2 iam get-user
```

### 계정이 여러개이면 ?
```shell
# 계정별 설정
aws configure --profile [계정 alias]

# 계정 alias 사용
aws --profile [계정 alias] --region ap-northeast-2 iam get-user
```

---

### Node 설치
```shell
# nvm install
brew install nvm
mkdir -p ~/.nvm

# 환경에 맞게 node 설치
nvm install --lts
nvm use --lts
```
---

### typescript 설치
```shell
# typescript 전역설치
npm install -g typescript

# typescript 프로젝트 설치
npm install --save-dev typescript
```

```shell
# typescript 확인 (전역)
echo "console.info('Hello Typescript');" > hello.ts
tsc hello.ts
node hello.js
```

```shell
# typescript 확인 (프로젝트)
echo "console.info('Hello Typescript');" > hello.ts
./node_modules/.bin/tsc hello.ts
node hello.js
```

```shell
# 이러한 모든 과정이 귀찮아~
# typescript + node
npx ts-node hello.ts
```
---

### tools
본인이 사용하는 IDE 또는 에디터에 맞게 설치
1. Prettier (Code Formatter)
2. ESLint
3. AWS Toolkit
4. direnv (실습필요)

---

#### Serverless Framework

---
```shell
# Serverless Framework 설치
npm install -g serverless
```
---
```shell
# Serverless 스타트팩으로 시작하기
serverless # or sls
```
---
```shell
# CLI 명령 템플릿 한번에 작성하기
sls create --template aws-nodejs --name hello-world --path hello-world 
```

```shell
# 구조 파악하기
tree
# hello-world
# - handler.js
# - README.md
# - serverless.yml
```
---
```shell
#- package 하기
#    - serverless.yml 파일을 CloudFormation을 위한 선언파일로 변환
#    - lambda 파일 빌드
sls package 
```
---
```shell
# 패키지 내용 확인하기
unzip hello-world.zip
```
---
```shell
# 배포하기
sls deploy
```
---
```shell
# 실행하기
sls invoke -f hello
```
---
```shell
# log 보기 
sls logs -f hello
# (* 함수를 한번도 실행 안하거나, 너무 빠르게 요청하면 에러)
```

|옵션| 설명                                         |
|---|--------------------------------------------|
|-t, --tail| 새로 추가되는 로그를 계속 출력                          |
|--startTime| 지정된 시간까지만 과거 데이터 조회 (기본값10m)               |
|--filter| 지정된 패턴에 맞는 로그만 출력                          |
|-i,--interbal| --tail 옵션사용시 얼마 주기로 로그를 확인할지 확인(기본값1000ms) |

---
```shell
# 특정 function 배포
 sls deploy function -f hello
```
---
```shell
# 배포 상태 확인
 sls info
```
---
```shell
# 배포 삭제
 sls remove
```


---
### typescript 로 만들기
```shell
# template 로 만들기 (따라하지말 것)
sls create --template aws-nodejs-typescript --name hello-world-ts --path hello-api-ts
# 구조 확인
tree
```

기존 nodejs 프로젝트를 typescript로 만들기
```shell
# 기존 프로젝트 복사
cp -R hello-api-js hello-api-ts
cd hello-api-ts

# npm init
npm init -y

# typescript (자기버전에 맞게 types/node 설치)
npm install --save-dev typescript @types/node@18

# 기존 파일 변경
mv handle.js handle.ts

# typescript 컴파일 후 확인
tsc handle.ts
node handle.js

# tsconfig 설정
tsc --init

# 세부 옵션은 tsconfig.json 참조
tsc

# strict 옵션 때문에 event 의 자료형이 any 라서 에러남
npm install --save-dev @types/aws-lambda

# hello.ts 파일을 참고하여 코드를 고쳐봅시다. 다시 테스트

# webpack 적용
sls plugin install --name serverless-webpack
# serverless.yml 파일 package.json 에 추가된 것 확인

# ts-node 설치
npm install --save-dev ts-loader
# webpack.config.js 파일 작성

# 작성후 package 확인
sls package
# 패키지 내용 확인

# source-map 적용
npm install --save source-map-support
# handle.ts 에 import 'source-map-support/register' 추가
# webpack.config.js 에   stats: "normal", 추가


# serverless.yaml -> serverless.ts 로 변환
npm install --save-dev @serverless/typescript
# serverless.ts 작성
# ts-node가 있어야지 작동됨
npm install --save-dev ts-node
# 설치 확인
sls package
```