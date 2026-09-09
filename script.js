// ========================================
// ELEMENT
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
const cursorGlow = document.querySelector(".cursor-glow");

const modal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");
const videoPreview = document.getElementById("videoPreview");
const playReel = document.getElementById("playReel");

const memoryVideo = document.getElementById("memoryVideo");
const music = document.getElementById("bgMusic");


// ========================================
// WELCOME / LOADING SCREEN
// ========================================

const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeText = document.getElementById("welcomeText");
const loadingPercent = document.getElementById("loadingPercent");
const loadingProgress = document.getElementById("loadingProgress");
const loadingDots = document.querySelectorAll(".loading-dots span");


// ========================================
// MENU
// ========================================

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("open");

        document.body.classList.toggle("menu-open");

    });

}


// ========================================
// NAV LINKS
// ========================================

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("open");
        }

        document.body.classList.remove("menu-open");

    });

});


// ========================================
// ACTIVE NAVBAR
// ========================================

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");


function updateActiveLink() {

    let current = "home";

    sections.forEach(function (section) {

        const top = section.offsetTop - 180;

        if (window.scrollY >= top) {
            current = section.id;
        }

    });


    links.forEach(function (link) {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );

    });

}


window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


// ========================================
// REVEAL ANIMATION
// ========================================

const revealItems = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry, index) {

            if (entry.isIntersecting) {

                setTimeout(function () {

                    entry.target.classList.add("show");

                }, index * 70);


                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealItems.forEach(function (item) {

    observer.observe(item);

});


// ========================================
// CURSOR GLOW
// ========================================

if (cursorGlow) {

    window.addEventListener("mousemove", function (e) {

        cursorGlow.style.left = e.clientX + "px";

        cursorGlow.style.top = e.clientY + "px";

    });

}


// ========================================
// SHOWREEL MODAL
// ========================================

function openModal() {

    if (!modal) return;


    modal.classList.add("open");


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "menu-open"
    );


    // Pause musik

    if (music) {

        music.pause();

    }


    // Putar video

    if (memoryVideo) {

        memoryVideo.play().catch(
            function (error) {

                console.log(
                    "Video tidak bisa diputar:",
                    error
                );

            }
        );

    }

}


function closeVideoModal() {

    if (!modal) return;


    modal.classList.remove("open");


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "menu-open"
    );


    // Stop video

    if (memoryVideo) {

        memoryVideo.pause();

        memoryVideo.currentTime = 0;

    }


    // Putar musik lagi

    if (music) {

        music.play().catch(
            function (error) {

                console.log(
                    "Musik tidak bisa diputar:",
                    error
                );

            }
        );

    }

}


// ========================================
// OPEN VIDEO
// ========================================

if (videoPreview) {

    videoPreview.addEventListener(
        "click",
        openModal
    );

}


if (playReel) {

    playReel.addEventListener(
        "click",
        openModal
    );

}


// ========================================
// CLOSE VIDEO
// ========================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeVideoModal
    );

}


// Klik background modal

if (modal) {

    modal.addEventListener(
        "click",
        function (e) {

            if (e.target === modal) {

                closeVideoModal();

            }

        }
    );

}


// ========================================
// MY SKILLS
// ========================================

const skillCards =
    document.querySelectorAll(
        ".interactive-skill"
    );


const skillModal =
    document.getElementById(
        "skillModal"
    );


const closeSkillModal =
    document.getElementById(
        "closeSkillModal"
    );


const skillModalTitle =
    document.getElementById(
        "skillModalTitle"
    );


const skillModalText =
    document.getElementById(
        "skillModalText"
    );


const skillModalIcon =
    document.getElementById(
        "skillModalIcon"
    );


const exploreSkill =
    document.getElementById(
        "exploreSkill"
    );


let currentSkillLink = "";


// ========================================
// DATA SKILL
// ========================================

const skillData = {

    "Mobile Legends": {

        icon: "⚔️",

        text:
            "Gaming is not just playing. It's about strategy, teamwork and creating unforgettable moments.",

        link:
            "https://www.mobilelegends.com/"

    },


    "PUBG Mobile": {

        icon: "🎯",

        text:
            "Every match tells a story. Strategy, survival and unforgettable moments.",

        link:
            "https://www.pubgmobile.com/"

    },


    "Free Fire": {

        icon: "🔥",

        text:
            "Fast gameplay, intense moments and memories worth capturing.",

        link:
            "https://ff.garena.com/"

    },


    "CapCut Editor": {

        icon: "🎬",

        text:
            "Transforming simple clips into stories, memories and creative visual experiences.",

        link:
            "https://www.capcut.com/"

    }

};


// ========================================
// CLICK SKILL
// ========================================

skillCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const skillName =
                    card.dataset.skill;


                const data =
                    skillData[skillName];


                if (!data) {

                    console.log(
                        "Skill tidak ditemukan:",
                        skillName
                    );

                    return;

                }


                // Simpan link

                currentSkillLink =
                    data.link;


                // Animasi klik

                card.classList.add(
                    "clicked"
                );


                setTimeout(
                    function () {

                        card.classList.remove(
                            "clicked"
                        );

                    },
                    500
                );


                // Ubah judul

                if (skillModalTitle) {

                    skillModalTitle.textContent =
                        skillName;

                }


                // Ubah text

                if (skillModalText) {

                    skillModalText.textContent =
                        data.text;

                }


                // Ubah icon

                if (skillModalIcon) {

                    skillModalIcon.textContent =
                        data.icon;

                }


                // Buka modal

                if (skillModal) {

                    skillModal.classList.add(
                        "open"
                    );

                }

            }
        );

    }
);


// ========================================
// EXPLORE SKILL
// ========================================

if (exploreSkill) {

    exploreSkill.addEventListener(
        "click",
        function () {

            if (
                currentSkillLink !== ""
            ) {

                window.open(
                    currentSkillLink,
                    "_blank"
                );

            }

        }
    );

}


// ========================================
// CLOSE SKILL MODAL
// ========================================

function closeSkillPopup() {

    if (skillModal) {

        skillModal.classList.remove(
            "open"
        );

    }

}


if (closeSkillModal) {

    closeSkillModal.addEventListener(
        "click",
        closeSkillPopup
    );

}


// ========================================
// CLICK BACKGROUND CLOSE
// ========================================

if (skillModal) {

    skillModal.addEventListener(
        "click",
        function (e) {

            if (
                e.target === skillModal
            ) {

                closeSkillPopup();

            }

        }
    );

}


// ========================================
// ESC CLOSE
// ========================================

document.addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Escape") {

            // Tutup video

            if (
                modal &&
                modal.classList.contains(
                    "open"
                )
            ) {

                closeVideoModal();

            }


            // Tutup skill

            if (
                skillModal &&
                skillModal.classList.contains(
                    "open"
                )
            ) {

                closeSkillPopup();

            }

        }

    }
);



// ========================================
// CINEMATIC LOADING
// ========================================

// ========================================
// CINEMATIC LOADING
// ========================================

const enterPortfolio =
    document.getElementById("enterPortfolio");

const loadingStatus =
    document.getElementById("loadingStatus");


if (welcomeScreen) {

    let progress = 0;


    const loadingInterval =
        setInterval(
            function () {

                progress += 2;


                if (
                    progress > 100
                ) {

                    progress = 100;

                }


                // Angka persen

                if (loadingPercent) {

                    loadingPercent.textContent =
                        progress;

                }


                // Progress bar

                if (loadingProgress) {

                    loadingProgress.style.width =
                        progress + "%";

                }


                // Status

                if (loadingStatus) {

                    if (progress < 30) {

                        loadingStatus.textContent =
                            "INITIALIZING";

                    }
                    else if (progress < 60) {

                        loadingStatus.textContent =
                            "LOADING CREATIVE ASSETS";

                    }
                    else if (progress < 90) {

                        loadingStatus.textContent =
                            "PREPARING EXPERIENCE";

                    }
                    else {

                        loadingStatus.textContent =
                            "READY TO ENTER";

                    }

                }


                // Dot animation

                loadingDots.forEach(
                    function (
                        dot,
                        index
                    ) {

                        if (
                            progress >=
                            (index + 1) * 20
                        ) {

                            dot.classList.add(
                                "active"
                            );

                        }

                    }
                );


                // Loading selesai

                if (
                    progress >= 100
                ) {

                    clearInterval(
                        loadingInterval
                    );


                    // Tampilkan welcome

                    if (welcomeText) {

                        setTimeout(
                            function () {

                                welcomeText.classList.add(
                                    "show"
                                );

                            },
                            400
                        );

                    }

                }

            },
            80
        );

}
// Mulai musik setelah loading selesai

if (music) {

    music.currentTime = 0;

    music.volume = 0.6;

    music.play()
        .then(
            function () {

                console.log(
                    "Musik berhasil diputar"
                );

            }
        )
        .catch(
            function (error) {

                console.log(
                    "Musik diblokir browser:",
                    error
                );

            }
        );

}

// ========================================
// ENTER PORTFOLIO + MUSIC
// ========================================

if (enterPortfolio) {

    enterPortfolio.addEventListener(
        "click",
        function () {

            // Musik mulai dari awal

            if (music) {

                music.currentTime = 0;

                music.volume = 0.6;

                music.play().catch(
                    function (error) {

                        console.log(
                            "Musik tidak bisa diputar:",
                            error
                        );

                    }
                );

            }


            // Animasi keluar

            if (welcomeScreen) {

                welcomeScreen.classList.add(
                    "hide"
                );

            }

        }
    );

}
// ========================================
// MUSIK SETELAH KLIK
// ========================================

document.addEventListener(
    "click",
    function () {

        if (
            music &&
            music.paused
        ) {

            music.play().catch(
                function () {}
            );

        }

    },
    {
        once: true
    }
);
// ========================================
// YEAR
// ========================================

const year =
    document.getElementById(
        "year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================
   SOUND EFFECT SYSTEM
========================================= */

const bgMusic =
    document.getElementById("bgMusic");


const clickSound =
    document.getElementById("clickSound");


const hoverSound =
    document.getElementById("hoverSound");


/* VOLUME NORMAL MUSIK */

const normalVolume = 0.6;


/* VOLUME SAAT KLIK */

const lowVolume = 0.2;


bgMusic.volume =
    normalVolume;


function playClickSound() {


    /* MUSIK MENGECIL */

    if (

        bgMusic &&

        !bgMusic.paused

    ) {

        bgMusic.volume =
            lowVolume;

    }


    /* MAIN SOUND */

    if (clickSound) {

        clickSound.currentTime = 0;

        clickSound.play()
        .catch(() => {});

    }


    /* MUSIK KEMBALI */

    setTimeout(

        () => {

            if (

                bgMusic &&

                !bgMusic.paused

            ) {

                bgMusic.volume =
                    normalVolume;

            }

        },

        400

    );

}


/* =========================================
   SKILL CLICK SOUND
========================================= */

document
.querySelectorAll(
    ".interactive-skill"
)
.forEach(

    skill => {

        skill.addEventListener(

            "click",

            () => {

                playClickSound();

            }

        );

    }

);


/* =========================================
   PROJECT CLICK SOUND
========================================= */

document
.querySelectorAll(
    ".project-card"
)
.forEach(

    project => {

        project.addEventListener(

            "click",

            () => {

                playClickSound();

            }

        );

    }

);


/* =========================================
   BUTTON CLICK SOUND
========================================= */

document
.querySelectorAll(
    "button, .btn, .about-button"
)
.forEach(

    button => {

        button.addEventListener(

            "click",

            () => {

                playClickSound();

            }

        );

    }

);


function playClickSound() {

    if (

        bgMusic &&

        !bgMusic.paused

    ) {

        bgMusic.volume = 0.25;

    }


    if (clickSound) {

        clickSound.currentTime = 0;

        clickSound.play()
        .catch(() => {});

    }


    setTimeout(

        () => {

            if (

                bgMusic &&

                !bgMusic.paused

            ) {

                bgMusic.volume = 0.2;

            }

        },

        350

    );

}
