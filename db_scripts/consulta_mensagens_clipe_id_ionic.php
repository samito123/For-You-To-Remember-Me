<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha = $angular_http_params["senha"];
  $banco = $angular_http_params["banco"];
  $id_clip = $angular_http_params["id_clip"];

  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;

    $sql1="select id_mensagem, titulo_mensagem, corpo_mensagem,
    data_hora_mensagem, img_usuario, nick_usuario
    from tb_mensagens as tm
    left join tb_usuarios as tu on tu.id_usuario = tm.fk_usuario
    left join tb_clips as tc on tc.id_clip = tm.fk_clip
    where id_clip = $id_clip ";
  
    $return_array_json = array();
    $result = $conexao->query($sql1);
    while($dados = $result->fetch_assoc())
    {
      $row_array['id_mensagem'] = $dados['id_mensagem']; 
      $row_array['titulo_mensagem'] = $dados['titulo_mensagem']; 
      $row_array['corpo_mensagem'] = $dados['corpo_mensagem']; 
      
      $row_array['data_hora_mensagem'] = $dados['data_hora_mensagem'];
      $row_array['img_usuario'] = $dados['img_usuario'];
      $row_array['nick_usuario'] = $dados['nick_usuario'];
  
      array_push($return_array_json,$row_array);
    }
    mysqli_free_result($result);
    if ($erro_query == 0){
      mysqli_commit($conexao);
      echo json_encode($return_array_json);
    } else {
      echo mysqli_error($conexao);
      mysqli_rollback($conexao);
    }
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
