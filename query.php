<?php

  include "config.php";

  if(isset($_GET["action"])){
    $action = $_GET["action"];

    $conn = new mysqli($host.":".$port, $user, $password, $database);

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $conn->query("CREATE TABLE IF NOT EXISTS wasamun(committee TEXT, topicA TEXT, topicB TEXT, data TEXT);");

    if(strcmp($action, "getCommittees") == 0){
      //echo '[{"name":"UNODC"}, {"name":"UNEP"}, {"name":"UNICEF"}]';
      $result = $conn->query("SELECT committee FROM wasamun;");
      $array = array();
      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          array_push($array, array("name" => $row["committee"]));
        }
      }
      echo json_encode($array);
    }else if(strcmp($action, "getInfo") == 0){
      if(isset($_GET["committee"]) && isset($_GET["topic"])){
        //echo '{"name": "Topic A: Hacking and crime in the dark web", "countries":[{"country":"Test 1","index":-1,"warns":0},{"country":"Test 2","index":-1,"warns":0},{"country":"Test 3","index":-1,"warns":0},{"country":"Test 4","index":-1,"warns":0},{"country":"Test 5","index":-1,"warns":0},{"country":"Test 6","index":-1,"warns":0}]}';
        $stmt = $conn->prepare('SELECT * FROM wasamun WHERE committee=?;');
        $stmt->bind_param("s", $_GET["committee"]);
        $stmt->execute();
        $stmt->bind_result($committee, $topicA, $topicB, $data);
        $stmt->fetch();

        $name = "";

        if(strcmp($_GET["topic"], "A") == 0){
          $name = "Topic A: ".$topicA;
        }else{
          $name = "Topic B: ".$topicB;
        }
        $stmt->close();

        if(strcmp($data, "") == 0){
          echo "{}";
        }else{
          echo '{"name":"'.$name.'", "countries":'.$data.'}';
        }
      }else{
        echo "Error";
      }
    }else if(strcmp($action, "save") == 0){
      if(isset($_GET["committee"]) && isset($_GET["data"])){
        $data = $_GET["data"];
        $stmt = $conn->prepare('UPDATE wasamun SET data=? WHERE committee=?;');
        $stmt->bind_param("ss", $_GET["data"], $_GET["committee"]);
        $stmt->execute();
        $stmt->close();
        echo "Successfully saved data";
      }else{
        echo "Error";
      }
    }
  }else{
    echo "Error";
  }

 ?>