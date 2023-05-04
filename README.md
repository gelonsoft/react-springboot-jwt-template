# react-springboot-jwt-template

Каркас приложения на springboot+jpa+hibernate+pg/h2+cors проверки в бэке и reactjs+redux+mui+i18n во фронте с аутентификацией по логину/паролю и далее по jwt-токену.

Сначала запускается бэк из папки backend со spring boot профилем dev на http://localhost:8888 
===
cd backend
set JAVA_HOME="c:\somepath to jdk home\"
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
===

Потом фронт (нужен установленный Nodejs) на http://localhost:3000 командой:
===
cd front
npm install
npm run start
===
