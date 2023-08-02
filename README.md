# ProjEUI

Este é um aplicativo desenvolvido para configuração e controle de um sistema automatizado de irrigação, como parte do projeto da disciplina Engenharia Unificada I da UFABC.

Para compilar e instalar, é necessário instalar o Node.js e o Android Studio. Após instalação de ambas as ferramentas, clonar o repositório e executar "npm install" dentro da pasta descompactada.

Uma vez que tenha feito a instalação de todas as bibliotecas necessárias, é preciso registrar um web app no Firebase e criar um banco de dados Firestore. Após isso, preencher os campos em firebaseConfig.js com os dados fornecidos pelo Firebase.

Por fim, executar em um console dentro da pasta do sourcecode o comando "npx react-native build-android" para compilar o app. Para que o comando execute até o fim é necessário ter configurado um dispositivo virtual no Android Studio ou ter um celular Android conectado ao computador com a opção de depuração USB ativa. Para confirmar se o celular é reconhecido como dispositivo apto para receber a instalação, execute no cmd ou powershell o comando "adb devices". Se tudo estiver ok será informado que o dispositivo está conectado e disponível.

A etapa de compilação pode demorar um pouco na primeira vez. Para mais informações de como proceder, leia: https://reactnative.dev/docs/environment-setup?guide=native
