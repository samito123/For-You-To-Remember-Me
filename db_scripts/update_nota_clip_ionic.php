<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha = $angular_http_params["senha"];
  $banco = $angular_http_params["banco"];

  $id_clip = $angular_http_params['id_clip'];
  $nota= $angular_http_params['nota'];
  
  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
  $erro_query = 0;
  
   $sql="update tb_clips 
   set nota_clip = '$nota'
   where id_clip = '$id_clip' ";

    if (!mysqli_query($conexao, $sql)) $erro_query++;
  if ($erro_query == 0){
        echo '{';
          echo '"txt":"Sucesso"';
        echo '}';
      } else {
        echo '{';
          echo '"txt":"Erro"';
        echo '}';
  }
    mysqli_free_result($result);
    mysqli_close($conexao);
    
  } catch (Exception $e) {
     echo $e->getMessaage();
     mysqli_close($conexao);
  } catch (InvalidArgumentException $e) {
     echo $e->getMessage();
     mysqli_close($conexao);
  } catch (RangeException $e) {
     echo $e->getMessage();
     mysqli_close($conexao);
  } catch (Exception $e) {
     echo $e->getMessage();
     mysqli_close($conexao);
  }
?>
