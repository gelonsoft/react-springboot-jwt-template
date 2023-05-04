# react-springboot-jwt-template

Это каркас приложения
Backend: 
 * Java
 * Springboot
 * JPA
 * Hibernate
 * Postgres/H2
 * Cors-проверки
 * JWT token auth
 * email/password auth
 
Frontend:
 * Reactjs
 * React Redux
 * React MUI
 * i18next
 * Меню и аутентификация по jwt-токену

Сначала запускается бэк из папки backend со spring boot профилем dev на http://localhost:8888 
<code>
set JAVA_HOME="c:\somepath to jdk home\"
cd backend
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
</code>

Потом фронт (нужен установленный Nodejs) на http://localhost:3000 командой:
<code>
cd front
npm install
npm run start
</code>
