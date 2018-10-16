1) Download MySQL workbench and server -> https://dev.mysql.com/downloads/
2) Configure your set up. You can use these instructions if you get stuck https://dev.mysql.com/doc/mysql-getting-started/en/
3) Create a database called `poc`
4) Inside the created database make these two tables: 

`CREATE TABLE point_person(
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    country varchar(60),
    city varchar(60),
    id int not null auto_increment,
    PRIMARY KEY (ID)
);`

`CREATE TABLE singles(
    first_name varchar(255),
    last_name varchar(255),
    dob date,
    picture varchar(100),
    height smallint,
    poc_contact smallint,
    min_age tinyint,
    max_age tinyint,
    birth_country varchar(64),
    location varchar(64),
    religiously varchar(60),
    blurb text,
    dating_status varchar(60),
    occupation varchar(60),
    gender varchar (10),
    id int not null auto_increment,
    PRIMARY KEY (ID)
);`

5) Use the workbench wizard to import the following csv for some dumby data. 

`first_name,last_name,dob,picture,height,poc_contact,min_age,max_age,birth_country,location,religiously,blurb,dating_status,occupation,gender
nehemiah,kivel,1991-12-07,nk.jpg,190,1,20,28,America,Jerusalem,dati leumi,this is my blurb about me,available,doctor,male
esther,simone,1994-06-08,es.jpg,170,1,26,35,Israel,New York,dat lite,this is my blurb about me,dating,student,female
josh,gold,1992-02-20,jg.jpg,180,1,22,28,England,Tel Aviv,chardal,this is my blurb about me,engaged,lawyer,male
first,last,1996-09-19,nk.jpg,160,1,25,34,France,Holon,yeshivish,this is my blurb about me,unavailable,kollel,female`
