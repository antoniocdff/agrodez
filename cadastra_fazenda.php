<?php
header('Content-Type: text/html; charset=utf-8');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


include("conectar.php");

mysqli_query($conn, "SET NAMES 'utf8'");
mysqli_query($conn, 'SET character_set_connection=utf8');
mysqli_query($conn, 'SET character_set_client=utf8');
mysqli_query($conn, 'SET character_set_results=utf8');


$query = "INSERT INTO fazenda (nm_fazenda, area_total, area_produtiva, area_reserva, area_disp, unidade_area, valor_por_hectare, CNPJ, rodovia, municipio, estado, nacionalidade, telefone, proprietario, geometria) VALUES ('$request->nm_fazenda', $request->area_total, $request->area_produtiva, $request->area_reserva, $request->area_produtiva,'$request->unidade_area',$request->valor_por_hectare, '$request->CNPJ', '$request->rodovia', '$request->municipio', '$request->estado', '$request->nacionalidade', '$request->telefone', '$request->proprietario', '$request->geometria')";


$a = mysqli_query($conn, $query);
$b = mysqli_insert_id($conn);

if ($a) {
    echo $b;
} else {
    echo "Error updating record: " . mysqli_error($conn);
}
mysqli_close($conn);
echo($outp);

?>