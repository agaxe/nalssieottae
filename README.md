![배너](https://user-images.githubusercontent.com/54921653/113668850-d16e1480-96ed-11eb-95a4-e3345349aaa1.jpg)

웨일 브라우저의 초기화면이나 크롬 확장 프로그램인 Momentum 을 보면 한 화면에 시간을 바로 확인할 수 있도록 화면 중앙에 시간이 표시되어있는데 이걸 시간이 아닌 날씨를 한눈에 바로 확인할 수 있으면 좋을 것 같아 제작한 날씨 웹 어플리케이션 '날씨어때?' 입니다.

## 시안

[Figma](https://www.figma.com/file/AM9e3KQWYQwjAaRHlJCLww/%EB%82%A0%EC%94%A8%EC%96%B4%EB%95%8C)

## 사용 기술

- Javascript
- CSS
- OpenWeatherMap API
- Kakao API

## 실행

1. 실행을 하기 전 API key 가 필요합니다.

    - [OpenWeatherMap API 키](https://home.openweathermap.org/api_keys)
    - [kakao REST API 키](https://developers.kakao.com/)
    
2. config.js 에 발급받은 API 키를 추가해주세요.

    ```javascript
    const config = {
        WEATHER_API_KEY: '발급받은_OpenWeatherMap_API_키',
        KAKAO_API_KEY: '발급받은_kakao_REST_API_키'
    };
    ```

3. VSCode 를 사용하는 경우 [Live Server Extenstion](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 을 사용하거나 별도의 웹 서버를 통해 index.html 을 실행해주세요.

