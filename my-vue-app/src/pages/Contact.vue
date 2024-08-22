<template>
    <main class="contact-container">
        <h1>Contact</h1>
        <div class="contact-photos">
            <a href="https://www.linkedin.com/in/mohamed-karim-feki-18ab66249/">
                <img src="../media/karim.png" class="contact-image">
            </a>
            <a href="https://www.linkedin.com/in/rayan-toumert/">
                <img src="../media/rayan.png" class="contact-image">
            </a>
            <a href="https://www.linkedin.com/in/ily%C3%A8s-manai-a76649266/">
                <img src="../media/ilyes.jpg" class="contact-image">
            </a>
            <a href="https://www.linkedin.com/in/ervin-goby-b52b25235/">
                <img src="../media/ervin.png" class="contact-image">
            </a>
        </div>
    </main>
</template>

<style>
.contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
}

.contact-photos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.contact-image {
    width: 200px;
    height: 200px;
    border: 2px solid black;
}
</style>