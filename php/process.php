<?php

$action = $_POST['action'];

switch ($action) {
    case "buscar_producto":
        buscar_producto();
        break;
    default:
        echo json_encode("nada");
        break;
}

function connection()
{
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=tienda', "root", "root", array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        return $pdo;
    } catch (PDOException $e) {
        //echo 'Error de conexión: ' . $e->getMessage();
        return null;
    }
}

function buscar_producto()
{
    $con = connection();

    if ($con != null) {
        $producto = $_POST['producto'];

        $stmt = $con->prepare('
            SELECT nombre, precio, tipo FROM productos WHERE nombre LIKE :producto
            ');
        $stmt->bindValue(':producto', '%' . $producto . '%', PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                $data[] = $row;
            }
            echo json_encode($data);
        } else {
            echo 0;
        }
    } else {
        echo 0;
    }
}
