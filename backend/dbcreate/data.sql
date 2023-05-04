-- noinspection SqlNoDataSourceInspectionForFile

insert into roles (id,name) values (0,'ROLE_USER');
insert into roles (id,name) values (1,'ROLE_MODERATOR');
insert into roles (id,name) values (2,'ROLE_ADMIN');
insert into roles (id,name) values (3,'ROLE_SUPER_ADMIN');
insert into users(id,username,email,password) values (1,'1','1@1.ru','$2a$10$VZc1Zckt7DE/ZmcVsrQIzOfPnDr25xdpOw3O7bv/2Q4Ir6dz5SYsu');
insert into user_roles(user_id,role_id) values (1,3);