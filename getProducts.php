<?php
/*Get tags*/
$query = "";

if (isset($_GET['query'])) {
    $query = $_GET['query'];
}

/*Establish connection*/
require "connect.php";

if ($query != "") {
    
    /*Split query into individual tags*/
    $query = preg_replace("/^;/", "", $query);
    $query = preg_replace("/;$/", "", $query);
    $tags = explode(";", $query);
    
    /*Prepare sql string*/
    $sql = "SELECT * FROM products WHERE";
    
    /*Insert tags into sql strings*/
    for ($i = 0; $i < sizeof($tags); $i++) {
        if ($i == 0) {
            $sql = $sql." tags LIKE '%;".$tags[$i].";%'";
        } else {
            $sql = $sql." AND tags LIKE '%;".$tags[$i].";%'";
        }
    }
    
    /*Append order to sql string*/
    $sql = $sql." ORDER BY id DESC";
    
    /*Prepare and execute sql*/
    $statement = $dbh->prepare($sql);
    $statement->execute();
    
} else {
    $statement = $dbh->prepare("SELECT * FROM products ORDER BY id DESC");
    $statement->execute();
}
/*Go through all products*/
while ($row = $statement->fetch(PDO::FETCH_ASSOC)){
    $productTags = $row['tags'];
    $productTags = preg_replace("/^;/", "", $productTags);
    $productTags = preg_replace("/;$/", "", $productTags);
    $productTags = explode(";", $productTags);
?>
    <div class="product">
        <h3><?php echo $row["name"] ?></h3>
        <div class="product-tags"><?php
            for ($i = 0; $i < sizeof($productTags); $i++) {
                echo "<div class='tag'>".$productTags[$i]."</div>";
            }
        ?></div>
    </div>
<?php
}
/*Close connection*/
$dbh = null;
?>