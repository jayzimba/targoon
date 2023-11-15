<?php
    require_once("connection.php");
    
    $fullname = $_POST['fullname'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $fingerprint = $_POST['fingerprint'];

    $query = "SELECT * FROM customer WHERE email = '$email'";
    $query_result = mysqli_query($conn, $query);
    
    if (!mysqli_num_rows($query_result))
    {
        $Reg_Query = "INSERT INTO customer(`fullname`, `username`, `email`, `password`, `fingerprint`) VALUES ('$fullname', '$username', '$email', '$password', '$fingerprint' )";
        $Reg_Query_Result = mysqli_query($conn, $Reg_Query);
    
        if ($Reg_Query_Result) 
        {
            $Message = "Added successfuly!";
        } else 
        {
            $Message = "Error - Try again";
        }
        
    } else 
    {
        $Message = "Already Registered";
    }
    
    $response[] = array("Message" => $Message);
    
    echo json_encode($response);
?>