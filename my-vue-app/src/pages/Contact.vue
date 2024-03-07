<template>
    <main class="contact-container">
        <h1>Contact</h1>
        <div class="contact-photos">
            <a href="https://www.linkedin.com/in/mohamed-karim-feki-18ab66249/">
                <img src="https://media.licdn.com/dms/image/D4E35AQERucGERcc6fQ/profile-framedphoto-shrink_400_400/0/1708616595189?e=1710374400&v=beta&t=5_XlC1cqVwKc0oBE0vtoC9iX0hcq8n4F1xxf8w-i_WE" class="contact-image">
            </a>
            <a href="https://www.linkedin.com/in/rayan-toumert/">
                <img src="https://media.licdn.com/dms/image/D4E35AQHS_CWSK4FaJA/profile-framedphoto-shrink_800_800/0/1707215678462?e=1710457200&v=beta&t=y6Pe7X_bdQaDlvmumZ2z673z7lng_aEKxbtcujLziR0" class="contact-image">
            </a>
            <a href="https://www.linkedin.com/in/ily%C3%A8s-manai-a76649266/">
                <img src="../media/ilyes.jpg" class="contact-image">
            </a>
            <a href="https://www.linkedin.com/in/ervin-goby-b52b25235/">
                <img src="https://media.licdn.com/dms/image/D4E35AQHabs_X83QYCg/profile-framedphoto-shrink_100_100/0/1700214075352?e=1710457200&v=beta&t=t0wKwgbw5IicR81_XC9uAOU77NQ-4yOlttWraKKw0Wg" class="contact-image">
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