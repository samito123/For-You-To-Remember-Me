<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha = $angular_http_params["senha"];
  $banco = $angular_http_params["banco"];
  $id_clip = $angular_http_params["id_clip"];
  $visualizacoes_clip = $angular_http_params["visualizacoes_clip"];

  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;

    $sql1="update tb_clips 
      set visualizacoes_clip = $visualizacoes_clip
      where id_clip = $id_clip";
    
    if (!mysqli_query($conexao, $sql1)) $erro_query++;

    $sql2="select link_clip, img_clip, 
     titulo_clip, subtitulo_clip, descricao_clip,
     data_clip, visualizacoes_clip, nota_clip
     from tb_clips 
     where id_clip = $id_clip ";

    $return_array_json = array();
    $result = $conexao->query($sql2);
    while($dados = $result->fetch_assoc())
    {
      $row_array['link_clip'] = $dados['link_clip']; 
      $row_array['img_clip'] = $dados['img_clip'];
      
      $row_array['titulo_clip'] = $dados['titulo_clip'];
      $row_array['subtitulo_clip'] = $dados['subtitulo_clip'];
      $row_array['descricao_clip'] = $dados['descricao_clip'];
      
      $row_array['data_clip'] = $dados['data_clip'];
      $row_array['visualizacoes_clip'] = $dados['visualizacoes_clip'];
      $row_array['nota_clip'] = $dados['nota_clip'];

      array_push($return_array_json,$row_array);
    }
    mysqli_free_result($result);
    
    if (!mysqli_query($conexao, $sql2)) $erro_query++;
  
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
