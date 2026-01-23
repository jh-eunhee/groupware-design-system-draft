# Tailwind CSS 구현 가이드

## 설정

### tailwind.config.js
```javascript
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Design Tokens 매핑

색상, 타이포그래피, 간격 등을 Tailwind 설정에 매핑합니다.

자세한 내용은 design-tokens.tokens.json을 참고하세요.
