<template>
    <div>
        <h1>Request Delete Post</h1>
        <br>
        <form action="/deletepost">
            <label for="post">Enter the URL link to the post:</label>
            <input type="text" name="post" id="post" required>
            <br>
            <br>
            <div id="reasoncontainer">
                <label for="reason">Reason:</label>
                <textarea cols="50" rows="5" name="reason" id="reason" required></textarea>
            </div>
            
            <br>
            <br>
            <input id="submit" type="submit" value="Request Delete">
        </form>

    </div>
</template>
<style scoped>
    #reasoncontainer {
        display: flex;
        align-items: first baseline;
    }
    label {
        margin-right: 15px;
    }
    input {
        border-radius: 4px;
        border-width: 1px;
        width: 200px;
        padding: 4px;
        padding-left: 8px;
        padding-right: 8px;
    }
    #submit {
        margin: 8px;
        background-color: red;
        color: white;
    }
</style>
<script>
    export default {
        name: 'RequestDeletePost'
    }
</script>