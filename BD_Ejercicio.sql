CREATE DATABASE Articulos;
USE Articulos;

CREATE TABLE Clientes(
    idCliente SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(40) NOT NULL,
    Apellido VARCHAR(40) NOT NULL,
    Domicilio VARCHAR(40) NOT NULL, 
    Telefono VARCHAR(10) NOT NULL,
    Correo VARCHAR(60) NOT NULL,
    Contraseña VARCHAR(16) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Sexo VARCHAR(2) NOT NULL
);

CREATE TABLE Articulos(
    idArticulo SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(80) NOT NULL,
    Precio FLOAT UNSIGNED NOT NULL,
    Foto VARCHAR(20) NOT NULL
);

CREATE TABLE Compras(
    idCompra SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Fecha DATE DEFAULT "2025/11/03", 
    idCliente SMALLINT NOT NULL,
    idArticulo SMALLINT NOT NULL, 
    FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
    FOREIGN KEY (idArticulo) REFERENCES Articulos (idArticulo) 
);

CREATE TABLE DetallesCompra(
    idDetalle SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idCliente SMALLINT NOT NULL,    
    idArticulo SMALLINT NOT NULL,    
    idCompra SMALLINT NOT NULL,      
    Cantidad SMALLINT NOT NULL,      
    FOREIGN KEY (idCliente) REFERENCES Clientes (idCliente),
    FOREIGN KEY (idArticulo) REFERENCES Articulos (idArticulo), 
    FOREIGN KEY (idCompra) REFERENCES Compras (idCompra) 
);