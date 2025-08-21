# gsap 애니메이션 컴포넌트 모음

gsap 라이브러리를 이용하여 애니메이션이 적용된 다양한 컴포넌트(header, footer, navigation...) 구현 모음 및 배운 내용 정리

## ✅ Header1

🔥 https://gsap-components-example.vercel.app/header/1

### required package

- gsap, @gsap/react
- react-icons

### What I Learned

- gsap 의 fromTo 메서드 사용 시 특수 프로퍼티들(duration, delay, etc)은 from 에 넣지 말고 to 에 넣어야 한다.

## ✅ Page transition 1

🔥 https://gsap-components-example.vercel.app/page-transition/1

### required package

- gsap, @gsap/react
- react-icons
- lenis

### What I Learned

- svg mask 기능으로 글씨가 써지는 애니메이션 동작 시 원하는 모양으로 보이도록 하기
- strokeDasharray, strokeDashoffset 을 이용하여 서서히 보여지는 패스 애니메이션 구현

## ✅ Hero 2

🔥 https://gsap-components-example.vercel.app/hero/2

### What I Learned

- css 의 perspective 를 이용하여 3d 처럼 보이도록 구현

```css
.parent {
  transform-style: preserve-3d;
}

.children {
  perspective: 400px;
}
```

perspective 를 적용하기 위해선 부모 요소의 transform-style 을 preserve-3d 로 변경해야 한다.
perspective 를 적용하면 z 값에 따라 요소가 작아 보이거나 커 보이도록 할 수 있다. perspective 값이 클 수록 z 값이 같을 때 크기 변형이 작아보인다.

[persepctive 800px]

![perspective 800px](public/image.png)

[perspective 200px]

![persepctive 200px](public/image-1.png)

## ✅ Card 1

🔥 https://gsap-components-example.vercel.app/card/1

카드 컴포넌트 추가, 삭제 시 유저에게 어떤 카드 컴포넌트에 행위가 적용되고 있는지 알려주는 마이크로 인터렉션 구현

### What I Learned

- ::after, ::before 요소를 활용하여 border 색상, 배경 색상 변경 애니메이션 구현
