# 🐱 Detector de Gatos com YOLOv8

Sistema de detecção de gatos em imagens usando YOLOv8 e interface web moderna.


## 📋 Índice

- [Recursos](#-recursos)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [API](#-api)
- [Links úteis](#-links-úteis)

## 📋 Recursos

- ✨ Interface moderna e responsiva
- 🖼️ Upload de imagens com drag & drop
- 🔍 Detecção precisa de gatos usando YOLOv8
- 📊 Visualização dos resultados em tempo real

## 💻 Tecnologias


### Frontend

- React
- Next.js
- TypeScript
- React Icons

### Backend

- Node.js
- Express
- YOLOv8
- Python
- OpenCV


1. Clone o repositório
```CMD OU TERMINAL
git clone https://github.com/seu-usuario/detector-gatos.git
cd detector-gatos
```


2. Instale as dependências do frontend
```CMD OU TERMINAL
cd app
npm install
```


3. Instale as dependências do backend
```CMD OU TERMINAL
cd backend
npm install
```


1. Inicie o backend
```bash
cd backend
npm run dev
```


2. Em outro terminal, inicie o frontend
```bash
cd app
npm run dev
```

3. Acesse `http://localhost:3000` no seu navegador


## 📡 API

### POST /detect-cat

Endpoint para detecção de gatos em imagens.

// Request
POST http://localhost:3333/detect-cat
Content-Type: multipart/form-data
body: {
  image: File
}

// Response
{
  "detectados": number,
  "detalhes": Array<{
    "class": "cat",
    "confidence": number,
    "bbox": [x1, y1, x2, y2]
  }>,
  "image": string // base64
}

## 🔗 Links úteis

- [YOLOv8](https://github.com/ultralytics/yolov8)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)

