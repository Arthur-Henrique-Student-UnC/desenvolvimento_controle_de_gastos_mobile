# 🚀 Aplicativo CRUD com Firebase e React Native
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

Um aplicativo CRUD completo criado com React Native e Firebase Firestore para controle de despesas.

## 🛠️ Instruções de SetUp

### Pré-requisitos
- Node.js (v18+ recommended)
- npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- Dispositivo ou emulador Android/iOS

### 🔧 Installation Steps

1. **Inicializar Aplicativo Expo**
   ```bash
   npx create-expo-app --template blank

2. **Clonar arquivos de projeto**
   ```bash
   git clone [your-repo-url]

3. **Configurar seu Firebase**
   ```bash
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

4. **Atualizar package.json**
   ```bash
   {
  "name": "crud-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.24.0",
    "@react-navigation/native-stack": "^7.3.3",
    "expo": "~52.0.42",
    "expo-status-bar": "~2.0.1",
    "firebase": "^11.6.0",
    "react": "18.3.1",
    "react-native": "0.76.8"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}

5. **Instalação Limpa**
   ```bash
   rm -rf package-lock.json node_modules
   npm install
   
6. **Desinstalar o Expo Go do seu celular**

7. **Instalar o [Expo Go SDK 52](https://expo.dev/go?sdkVersion=52&platform=android&device=false) no seu celular**

8. **Rodar o aplicativo**

# 📱 Features

## ✅ Criar, Ler, Atualizar, Excluir despesas

## 🔐 Autenticação do Firebase

## 📅 Rastreamento de dados

## 💰 Formatação de moeda

# 🚨 Solução de problemas

## Se você encontrar problemas:

- **Verificar credenciais do Firebase**

- **Verifique se há erros no console**

- **Garanta a versão correta do Expo SDK**

# 📜 Licença

## Licença MIT - Gratuita para uso pessoal e comercial

Made with ❤️ by [ArthurRibeiroHenrique] | [github.com/ArthurRibeiroHenrique](github.com/ArthurRibeiroHenrique)


