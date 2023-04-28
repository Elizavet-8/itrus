document.addEventListener("DOMContentLoaded", function () {
    //прелоудер
    window.onload = function () {
        window.setTimeout(function () {
            document.querySelector(".loader__wrap").style.display = "none";
            document.body.classList.remove('overflow');
        }, 500);
    }

    //бургер меню
    $('.header__burger, .overlay').click(function () {
        $('.header').toggleClass('show');
        $('body').toggleClass('overflow');
    });
    $("#nav").on("click", ".nav__link", function (event) {
        $('.header').removeClass('show');
        $('body').removeClass('overflow');
    });

    //плавный скролл
    $("body").on("click", "a[href^=\"#\"]", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    //слайдеры
    var projects__slider1 = new Swiper(".projects__slider", {
        on: {
            slideChange: function () {
                const blockBack = document.querySelector(".projects__container");
                // const imgIndex = document.querySelector(".projects__img_slide" + this.realIndex);
                // console.log(imgIndex)
                if (this.realIndex === 0) {
                    blockBack.style.background = "linear-gradient(to right, #244EA0 0%, #244EA0 50%, #189E3D 0%, #189E3D 100%)";
                    document.querySelector(".projects__img_slide1").style.opacity = "1";
                } else if (this.realIndex === 1) {
                    blockBack.style.background = "linear-gradient(to right, #189E3D 0%, #189E3D 50%, #5CBAFA 0%, #5CBAFA 100%)";
                    document.querySelector(".projects__img_slide1").style.opacity = "0";
                } else if (this.realIndex === 2) {
                    blockBack.style.background = "linear-gradient(to right, #5CBAFA 0%, #5CBAFA 50%, #8F56D7 0%, #8F56D7 100%)";
                } else if (this.realIndex === 3) {
                    blockBack.style.background = "linear-gradient(to right, #8F56D7 0%, #8F56D7 50%, #099FF6 0%, #099FF6 100%)";
                } else if (this.realIndex === 4) {
                    blockBack.style.background = "linear-gradient(to right, #099FF6 0%, #099FF6 50%, #244EA0 0%, #244EA0 100%)";
                }
            },
        },
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
        speed: 500,
    });
    var projects__slider2 = new Swiper(".projects-text__slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        loop: true,
        speed: 500,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        on: {
            init() {
                this.el.addEventListener('mouseenter', () => {
                    this.autoplay.stop();
                });

                this.el.addEventListener('mouseleave', () => {
                    this.autoplay.start();
                });
            }
        },
        navigation: {
            nextEl: '.projects-text__btn_next',
            prevEl: '.projects-text__btn_prev',
        }
    });
    const swipeAllSliders = (index) => {
        projects__slider1.slideToLoop(index);
        projects__slider2.slideToLoop(index);
    };
    projects__slider1.on('slideChange', () => swipeAllSliders(projects__slider1.realIndex));
    projects__slider2.on('slideChange', () => swipeAllSliders(projects__slider2.realIndex));

    //табы
    (function ($) {
        $('.tab .tab__tabs .tab__tab').click(function (g) {
            var tab = $(this).closest('.tab'),
                index = $(this).closest('.tab__tab').index();

            tab.find('.tab__tabs > .tab__tab').removeClass('active');
            $(this).closest('.tab__tab').addClass('active');

            tab.find('.tab__content').find('.tab__block').not('.tab__block:eq(' + index + ')').slideUp();
            tab.find('.tab__content').find('.tab__block:eq(' + index + ')').slideDown();

            g.preventDefault();
        });
    })(jQuery);

    //телефон
    window.addEventListener("DOMContentLoaded", function () {
        [].forEach.call(document.querySelectorAll('.tel'), function (input) {
            var keyCode;

            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                var pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                var matrix = "+7 (___) ___-__-__",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5) this.value = ""
            }

            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)

        });

    });

    //вывод имени файла
    $(document).ready(function () {
        $('input[type="file"]').change(function (e) {
            var fileName = e.target.files[0].name;
            $('#filename').html(fileName);
        });
    });

    //окно благодарности
    const blockThanks = document.getElementById('thanks');
    const blockExpectation = document.getElementById('expectation');
    blockThanks.addEventListener('click', function () {
        blockThanks.style.display = 'none';
    });

    //валидация
    const form = document.getElementById("application__form");
    $("#application__form").validate({
        ignore: "#fileInput",
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true,
                minlength: 16
            },
            email: {
                required: true,
                email: true
            },
            application_check: {
                required: true
            },
        },
        messages: {
            name: {
                required: 'Поле обязательно для заполнения'
            },
            phone: {
                required: 'Поле обязательно для заполнения',
                minlength: 'Введите номер в формате "+7 (123) 456-78-90"'
            },
            email: {
                required: 'Поле обязательно для заполнения',
                email: 'Введите корректный email'
            },
            application_check: {
                required: 'Поле обязательно для заполнения'
            }
        },
        submitHandler: function submitHandler() {
            blockExpectation.style.display = 'flex';
            var formData = new FormData(form);
            fetch("../../send.php", {
                method: "POST",
                body: formData
            }).then(function (response) {
                return response.text();
            }).then(function (data) {
                blockExpectation.style.display = 'none';
                blockThanks.style.display = 'flex';
                $('#application__form')[0].reset();
                $('#filename').html('Прикрепить файл с информацией о проекте');
            })["catch"](function (error) {
                return console.error(error);
            });
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    $("#application__form").on("keyup change", function () {
        if ($(this).valid()) {
            $("button[type='submit']").prop("disabled", false);
        } else {
            $("button[type='submit']").prop("disabled", true);
        }
    });
})

