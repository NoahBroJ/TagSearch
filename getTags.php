<?php
/*Establish connection*/
require "connect.php";

$statement = $dbh->prepare("SELECT * FROM tags ORDER BY tag ASC");
$statement->execute();

/*Go through all tags*/
while ($row = $statement->fetch(PDO::FETCH_ASSOC)){
?>
    <li data-name="<?php echo $row["tag"] ?>"><?php echo $row["tag"] ?></li>
<?php
}
/*Close connection*/
$dbh = null;
?>