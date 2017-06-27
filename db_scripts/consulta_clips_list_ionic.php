<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha= $angular_http_params["senha"];
  $banco= $angular_http_params["banco"];
  $offset= $angular_http_params["offset"];
  $limit= $angular_http_params["limit"];

  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;
    $sql;
    if($limit == false){
      $sql="select id_clip, img_clip, titulo_clip, 
      subtitulo_clip, data_clip, visualizacoes_clip, 
      count(id_mensagem) as qtd_mensagens,
      avg(cast(nullif(nota_avaliacao, 0) as bigint)) AS avaliacao
      from tb_clips as tc
      left join tb_mensagens as tm on tc.id_clip = tm.fk_clip
      left join tb_avaliacoes as ta on tc.id_clip = ta.fk_clip
      group by id_clip
      order by id_clip desc
      limit 20 offset $offset";
    }else{
      $sql="select id_clip, img_clip, titulo_clip, 
      subtitulo_clip, data_clip, visualizacoes_clip, 
      count(id_mensagem) as qtd_mensagens,
      avg(nota_avaliacao) as avaliacao
      from tb_clips as tc
      left join tb_mensagens as tm on tc.id_clip = tm.fk_clip
      left join tb_avaliacoes as ta on tc.id_clip = ta.fk_clip
      group by id_clip
      order by id_clip desc
      limit 0, $offset";
    }
    

    $return_array_json = array();
    $result = $conexao->query($sql);
    while($dados = $result->fetch_assoc())
    {
      $row_array['id_clip'] = $dados['id_clip'];
      $row_array['nick_usuario'] = $dados['nick_usuario'];
      $row_array['img_usuario'] = $dados['img_usuario'];
      
      $row_array['img_clip'] = $dados['img_clip'];
      $row_array['titulo_clip'] = $dados['titulo_clip'];
      $row_array['subtitulo_clip'] = $dados['subtitulo_clip'];
      
      $row_array['data_clip'] = $dados['data_clip'];
      $row_array['visualizacoes_clip'] = $dados['visualizacoes_clip'];
      $row_array['qtd_mensagens'] = $dados['qtd_mensagens'];
      $row_array['avaliacao'] = $dados['avaliacao'];

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
