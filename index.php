<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tag Searcher</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="script.js"></script>
</head>
<body>
    <form action="index.php" method="GET">
        <div class="input-element">
            <div id="selected-tags"></div>
            <input type="hidden" id="tag-search" name="query">
            <div id="input-container">
                <input type="text" id="tag-input" placeholder="Type here to add tags" autocomplete="off">
                <input type="submit" id="submit" value="Q">
            </div>
            <div id="tag-list-container">
                <ul id="tag-list">
                    <?php require "getTags.php" ?>
                </ul>
            </div>
        </div>
    </form>
    <section id="product-container">
        <?php
            require "getProducts.php";
        ?>
    </section>
</body>
</html>