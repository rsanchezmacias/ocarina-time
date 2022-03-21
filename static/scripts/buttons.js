
{
    // Block adds functionality to mute/unmute button on header

    let muteBtn = document.querySelector(".mute-unmute-button");

    muteBtn.addEventListener("click", function () {
        let muteBtnClasses = muteBtn.classList;

        if (muteBtnClasses.contains("unmute")) {
            muteBtn.classList.remove("unmute");
            muteBtn.classList.add("mute");
            muteBtn.style.backgroundImage = "url('static/images/muted_100.png')";
            isAudioEnabled = false;
        } else {
            muteBtn.classList.remove("mute");
            muteBtn.classList.add("unmute");
            muteBtn.style.backgroundImage = "url('static/images/unmuted_100.png')";
            isAudioEnabled = true;
        }
    });
}


{
    // Block adds functionality to song guide button on header

    let songsPopup = document.querySelector(".song-guide-button");
    let popupButton = document.querySelector(".popup__button");
    let backgroundDimmer = document.querySelector(".main__background-dimmer");
    
    songsPopup.addEventListener("click", togglePopup);
    popupButton.addEventListener("click", togglePopup);
    backgroundDimmer.addEventListener("click", togglePopup);

    function togglePopup() {
        let popup = document.querySelector(".popup");
        let backgroundDimmer = document.querySelector(".main__background-dimmer");
        let popupClasses = popup.classList;

        if (popupClasses.contains("is-hidden")) {
            popup.classList.remove("is-hidden");
            backgroundDimmer.classList.remove("is-hidden");
            isSongMenuDisplayed = true;
        } else {
            popup.classList.add("is-hidden");
            backgroundDimmer.classList.add("is-hidden");
            isSongMenuDisplayed = false;
        }
    }
}
