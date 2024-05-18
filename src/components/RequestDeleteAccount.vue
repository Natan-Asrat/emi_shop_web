<template>
    <div>
        <h1>Request Delete Account</h1>
        <br>
        <form action="/deleteaccount">
            <label for="phone">Enter your phone number associated with your account</label>
            <input type="text" name="phone" id="phone" required>
            <br>
            <input id="submit" type="submit" value="Request Delete">
        </form>

    </div>
</template>
<style scoped>
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
        name: 'RequestDeleteAccount'
    }
</script>