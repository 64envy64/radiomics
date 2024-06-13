'use strict';
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 900)
})

gsap.ticker.lagSmoothing(0)

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.has-scrollbar');
  const bannerContainer = document.getElementById('banner-scrollbar');

  containers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchend', () => {
      isDown = false;
    });

    container.addEventListener('touchcancel', () => {
      isDown = false;
    });
  });

  // Automatic scrolling for banner-scrollbar only
  if (bannerContainer) {
    setInterval(() => {
      const scrollWidth = bannerContainer.scrollWidth;
      const clientWidth = bannerContainer.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      if (bannerContainer.scrollLeft >= maxScrollLeft) {
        bannerContainer.scrollLeft = 0;
      } else {
        bannerContainer.scrollLeft += clientWidth;
      }
    }, 6000);
  }
});




/**
 * add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * navbar toggle
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header sticky & back top btn active
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

const products = [
  {
    title: "Цифровая DR маммография",
    subtitle: "Экспертный класс",
    image: "./assets/images/cifroviesystem/product-01.jpg",
    description: `Маммографическая цифровая DR система с функцией RIS / PACСКомплектация
    Ретрофит комплект с принадлежностями для модернизации любого аналогового маммографа в цифровой вариант исполнения DR, с набором программных средств и модулем интеграции с МИС, собственной базой данных RIS/PACS, предназначенные для визуализации и обработки 2D изображений в формате DICOM.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Цифровые DR: рентгеноскопия и рентгенография с искусственным интеллектом распознавания фотонов",
    subtitle: "Современные технологии",
    image: "./assets/images/cifroviesystem/product-02.jpg",
    description: `Комплексная система цифровой радиографии и флюороскопии, оснащенная передовыми алгоритмами искусственного интеллекта для распознавания фотонов и автоматической оптимизации изображений.`,
    features: [
      { icon: "fa fa-image", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-users", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ],
    subProducts: [
      {
        title: "Рентгенографическая цифровая DR система",
        image: "./assets/images/multimodalarm/product-01.jpg",
        description: "Описание рентгенографической цифровой DR системы"
      },
      {
        title: "Рентгеноскопическая цифровая DR система с искусственным интеллектом распознавания фотонов",
        image: "./assets/images/multimodalarm/product-02.jpg",
        description: "Описание рентгеноскопической цифровой DR системы"
      }
    ]
  },
  {
    title: "Цифровая система архивации DICOM изображений и видео с аппаратов УЗИ",
    subtitle: "Экспертный класс",
    image: "./assets/images/cifroviesystem/product-03.jpg",
    description: `Цифровая система для аппаратов УЗИ:
  АРМ врача-сонолога диагноста + ПО.
  Архивация / интерпретация DICOM
  изображении и видео.
  Удобная программа преобразование изображения.
  С собственной базой RIS / PACS.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Цифровая система архивации DICOM изображений и видео с эндоскопических аппаратов",
    subtitle: "Экспертный класс",
    image: "./assets/images/cifroviesystem/product-04.jpg",
    description: `Цифровая система для эндоскопических
  аппаратов:
  АРМ врача-эндоскописта диагноста + ПО.
  Архивация / интерпретация DICOM изображении
  и видео.
  Удобная программа преобразование изображения.
  С собственной базой RIS / PACS.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Телепатология для архивации и передачи DICOM изображений в онкологической службе",
    subtitle: "Экспертный класс",
    image: "./assets/images/cifroviesystem/product-05.jpg",
    description: `Цифровая система:
Для телепатологии RIS / PACS + ПО.
Архивация и передача DICOM изображений в
онкологической службе. Leica Aperio GT 450 DX: цифровые патоморфологические исследования с разрешением 26 мкм/пиксель при 40-кратном увеличении. PACS/RIS и MIMPS/RIS поддерживают DICOM. "LMS Мультивокс" подходят для работы.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Цифровая система, анатомо-дозиметрического планирования лучевой терапии пучками гамма-квантов радионуклида LMS Oncoplan",
    subtitle: "Легкая модернизация",
    image: "./assets/images/cifroviesystem/product-06.jpg",
    description: `Цифровая система:
    Анатомо-дозиметрического планирования
    лучевой терапии пучками гамма-квантов
    радионуклида.
    «LMS ONCOPLAN»`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Система медицинская навигационная оптическая «NAVI MULTITRACK»",
    subtitle: "Высокотехнологичное медицинское оборудование",
    image: "./assets/images/hirurgianavigation/product-01.jpg",
    video: "./assets/videos/navi_multitrack.mp4",
    description: `Хирургическая навигационная система помогает
    хирургу планировать операцию и контролировать
    положение хирургических инструментов по
    отношению к анатомическим структурам пациента в
    оперируемой области.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "АРМ врача-радиолога с PACS и RIS с искусственным интеллектом, диагностика ишемического инсульта «LMS Мультивокс ASPECTS»",
    subtitle: "Инновации в диагностике инсульта",
    image: "./assets/images/multimodalarm/product-01.jpg",
    description: `АРМ врача-радиолога диагноста "LMS Мультивокс" применяется для создания как локальных (внутрибольничных), так и региональных PACS/RIS и MIMPS/RIS систем хранения и передачи диагностических исследований пациентов. Также он используется для систем управления и сложной обработки медицинских изображений, обеспечивая высокий уровень эффективности и функциональности.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "АРМ врача-радиолога с PACS и RIS с искусственным интеллектом, исследования лёгких по данным КТ за 60 секунд",
    subtitle: "Инновации для диагностики",
    image: "./assets/images/multimodalarm/product-02.jpg",
    description: `Нейронная сеть "LMS COVID Мультивокс" оценивает степень поражения легких, обрабатывает и анализирует РКТ изображения, помогает врачам-радиологам и анестезиологам экономить время на диагностику, создаёт локальные и региональные PACS/RIS системы для хранения и передачи данных.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "АРМ врача-радиолога с PACS и RIS для скрининга или диагностики при маммографии «LMS Мультивокс»",
    subtitle: "Инновации для диагностики и скрининга",
    image: "./assets/images/multimodalarm/product-03.jpg",
    description: `"LMS Мультивокс представляет собой революционное решение в сравнении с уже существующими на рынке, как отечественными, так и зарубежными системами здравоохранения. Наша компания не только разрабатывает и проводит испытания, но и успешно внедряет новые возможности и средства визуализации, которые являются неотъемлемыми в диагностике и лечении пациентов.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "АРМ врача-рентгенолога",
    subtitle: "Инновации для диагностики и скрининга",
    image: "./assets/images/multimodalarm/product-04.jpg",
    description: `"LMS Мультивокс представляет собой революционное решение в сравнении с уже существующими на рынке, как отечественными, так и зарубежными системами здравоохранения. Наша компания не только разрабатывает и проводит испытания, но и успешно внедряет новые возможности и средства визуализации, которые являются неотъемлемыми в диагностике и лечении пациентов.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "АРМ врача для ангиографии",
    subtitle: "Экспертный класс",
    image: "./assets/images/multimodalarm/product-05.jpg",
    description: `Мультимодальное Автоматизированное Рабочее Место (АРМ) врача-радиолога диагноста "LMS Мультивокс" - это технологический прорыв в медицинской диагностике, предоставляющий врачам уникальные возможности для точного и всестороннего анализа медицинских данных.
Это интегрированное решение действует как автономная станция врача с собственной базой данных RIS, принимая информацию с лабораторных станций различных диагностических аппаратов.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "АРМ врача-радиолога диагноста для аппаратов КТ, МРТ, ПЭТ-КТ",
    subtitle: "Экспертный класс",
    image: "./assets/images/multimodalarm/product-06.jpg",
    description: `Мультимодальное Автоматизированное Рабочее Место (АРМ) врача-радиолога диагноста "LMS Мультивокс" представляет собой инновационную автономную станцию с собственной базой данных RIS, предназначенную для обработки разнообразных исследований. Эти данные поступают с лабораторных станций различных диагностических аппаратов`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "АРМ клинициста «LMS Мультивокс П»",
    subtitle: "Экспертный класс",
    image: "./assets/images/multimodalarm/product-07.jpg",
    description: `Автоматизированное рабочее место (АРМ) врача-клинициста "LMS Мультивокс П" предоставляет удобные и эффективные возможности для визуализации и анализа медицинских изображений.
    Используется в качестве просмотровой станции для визуализации и обработки медицинских изображений без сохранения результатов в базе данных.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Регистратура «LMS Мультивокс Р»",
    subtitle: "Экспертный класс",
    image: "./assets/images/multimodalarm/product-08.jpg",
    description: `Автоматизированное рабочее место (АРМ) медицинской сестры/рентген лаборанта «LMS Мультивокс Р» с функцией «регистратура» предоставляет возможность предварительной записи пациентов на обследования, а также упрощает процесс заполнения направительной информации на медицинские исследования.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "КАП учебный",
    subtitle: "Инновации для образования",
    image: "./assets/images/multimodalarm/product-09.jpg",
    description: `Комплексная система цифровой радиографии и флюороскопии, оснащенная передовыми алгоритмами искусственного интеллекта для распознавания фотонов и автоматической оптимизации изображений.`,
    features: [
      { icon: "fa fa-image", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-users", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ],
    subProducts: [
      {
        title: "КАП врача радиолога учебный «LMS OQY Мультивокс» исполнение 1",
        image: "./assets/images/multimodalarm/product-09.jpg",
        description: "Комплекс автоматизированных обучающих программ «LMS OQY Мультивокс» (Вариант исполнения 1) предназначен для использования в медицинских университетах, оборудования кафедр радиологии, виртуальной хирургии, а также кафедр и научно-исследовательских учреждений с функциями аудита радиологических исследований, с акцентом на обучение обработке 2D и 3D изображений."
      },
      {
        title: "КАП врача радиолога учебный «LMS OQY Мультивокс» исполнение 2",
        image: "./assets/images/multimodalarm/product-08.jpg",
        description: "Комплекс автоматизированных обучающих программ «LMS OQY Мультивокс» (Вариант исполнения 2) медицинских сестер и рентгенлаборантов предназначен для эффективного освоения навыков работы с диагностическими данными в формате DICOM. Программа рассчитана на подготовку среднего и младшего медицинского персонала."
      },
    ]
  },
  {
    title: "КАП LMS DICOM шлюз",
    subtitle: "Инновации для образования",
    image: "./assets/images/multimodalarm/product-10.jpg",
    description: `Комплекс аппаратно-программного обеспечения "LMS DICOM шлюз" предназначен для эффективной маршрутизации
    цифровых медицинских исследований, полученных с различных диагностических устройств в формате DICOM. Основное предназначение КАП "LMS DICOM шлюз" заключается в сборе и передаче цифровых медицинских изображений со всех видов оборудования`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "КАП дистанционного сопровождения хирургических операций в реальном времени учебный «LMS OQY Мультивокс»",
    subtitle: "Инновации для экстренной медицины и образования (хирургии)",
    image: "./assets/images/teleradiologiyasystem/telehirurgiyaview.jpeg",
    description: `КАП "LMS OQY МУЛЬТИВОКС" для дистанционного сопровождения хирургических операций предназначен для медицинских университетов, а также организаций, которым приходится решать задачи дистанционного обучения и удаленных консультаций своих коллег.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Сервер для телемедицинских телерадиологических консультаций «LMS МультиТелеРад»",
    subtitle: "Модернизация",
    image: "./assets/images/teleradiologiyasystem/server.png",
    description: `Система телемедицинских и телерадиологических удаленных консультаций.
    Телерадиологическая информационная система «LMS МультиТелеРад» реализует двусторонние отсроченные радиологические консультации на основе предоставленных заказчиком консультации DICOM-изображений, полученных в результате радиологических исследований`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа для телемедицинских и телерадиологических консультаций «LMS МультиТелеРад»",
    subtitle: "Легкая модернизация",
    image: "./assets/images/programms/product-01.jpg",
    description: `Программа "LMS МультиТелеРад" предназначена для обеспечения проведения медицинских телерадиологических консультаций, выполняемых врачами-экспертами по заявкам врачей различных медицинских учреждений и пациентов.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа RIS / PACS архивирования, управления и передачи медицинских изображений «LMS МультиТелеРад»",
    subtitle: "Экспертный класс",
    image: "./assets/images/programms/product-02.jpg",
    description: `Программное обеспечение «LMS Мультивокс С» позволяет сделать из серверного оборудования, подходящего под технические требования, системы экспертного класса регионального или внутрибольничного масштаба для передачи и хранения изображений (PACS), для обеспечения всей необходимой текстовой информацией (RIS) и системы управления и обработки медицинских изображений (MIMPS) для американского рынка.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа визуализации и обработки медицинских изображений в веб-браузере «LMS Мультивокс WEB»",
    subtitle: "Легкая модернизация",
    image: "./assets/images/programms/product-03.jpg",
    description: `Программа «LMS Мультивокс WEB» обеспечивает обработку и визуализацию изображений, полученных при проведении исследований на различных аппаратах лучевой диагностики: рентген, КТ, МРТ, УЗИ, эндоскопия и др.
    <strong>Работает в браузерах:</strong> Internet Explorer (версии 10.0 и выше), Mozilla Firefox (версия 31 и выше), Chrome (версия 31 и выше), Safari (версия 7 и выше) в операционных системах MS Windows, OS Mac, Linux, Android.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа АРМ врача радиолога-диагноста «LMS Мультивокс Д1»",
    subtitle: "Легкая модернизация",
    image: "./assets/images/programms/product-04.jpg",
    description: `ПО врача-радиолога диагноста "LMS Мультивокс Д1" используется для установки на автономную станцию врача и имеет собственную базу данных для исследований, полученных с лаборантских станций диагностических аппаратов, таких как: маммографы, рентген аппараты (снимочные и со скопией), ангиографы, С-дуги, аппараты УЗИ, эндоспоические аппараты, микроскопы (хирургические и сканирующие) и другие.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа АРМ врача радиолога-диагноста «LMS Мультивокс Д2»",
    subtitle: "Легкая модернизация",
    image: "./assets/images/programms/product-05.jpg",
    description: `ПО врача-радиолога диагноста "LMS Мультивокс 2" используется для установки на автономную станцию врача и имеет собственную базу данных для исследований, полученных с лаборантских станций диагностических аппаратов, таких как: маммограф, при наличии функции 3D томосинтеза, компьютерный рентгеновский томограф (КТ), магнитно-резонансный томограф (МРТ), аппараты изотопной диагностики и пр., обеспечивающие получение 3D изображений.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа обучения визуализации и обработке 2D/3D изображений «LMS OQY Мультивокс»",
    subtitle: "Легкая модернизация",
    image: "./assets/images/programms/product-06.jpg",
    description: `Учебное ПО «LMS ОКУ МУЛЬТИВОКС» исполнение 1 применяется для визуализации медицинских учреждений (медицинские институты, научно-исследовательские учреждения, университеты, диагностические центры) в области обучения обработке 2D и 3D изображений.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа регистрации и визуализации информации «LMS Мультивокс Р» для АРМ рентген-лаборанта / мед. сестры",
    subtitle: "Легкая модернизация",
    image: "./assets/images/programms/product-07.jpg",
    description: `ПО "LMS Мультивокс П" для врача-клинициста, установленное на компьютер, может использоваться в качестве просмотровой станции для визуализации и обработки медицинских изображений, без возможности сохранения результатов обработки в базе данных`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа АРМ врача клинициста «LMS Мультивокс П» для просмотра медицинских изображений",
    subtitle: "Легкая модернизация",
    image: "./assets/images/programms/product-08.jpg",
    description: `ПО «LMS Мультивокс Р» для медицинской сестры и рентген-лаборанта с функцией «регистратура», обеспечивает предварительную запись пациентов на обследования, а также заполнение направительной информации на обследования.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Программа Oncoplan",
    subtitle: "Цифровые решения при модернизации вашего оборудования",
    image: "./assets/images/programms/oncoplanview.jpg",
    description: `Система планирования облучения «LMS Oncoplan» предназначена для планирования облучения на лучевых установках «Рокус-АМ» и «Theratron» (посл. опционально) с радиоизотопом 60Co.
    Специальный сервис обработки дозиметрических данных, поэтому текущий ввод необходимой дозиметрической информации, например, после замены источника может производиться медицинским физиком клиники.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "ИИ и специализированные программы",
    subtitle: "Инновации для образования",
    image: "./assets/images/multimodalarm/product-09.jpg",
    description: `Комплексная система цифровой радиографии и флюороскопии, оснащенная передовыми алгоритмами искусственного интеллекта для распознавания фотонов и автоматической оптимизации изображений.`,
    features: [
      { icon: "fa fa-image", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-users", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ],
    subProducts: [
      {
        title: "Программа для диагностики ишемического инсульта по данным КТ «LMS Мультивокс ASPECTS» за 3.3 минуты",
        image: "./assets/images/programms/ai/product-01.jpg",
        description: "Комплекс автоматизированных обучающих программ «LMS OQY Мультивокс» (Вариант исполнения 1) предназначен для использования в медицинских университетах, оборудования кафедр радиологии, виртуальной хирургии, а также кафедр и научно-исследовательских учреждений с функциями аудита радиологических исследований, с акцентом на обучение обработке 2D и 3D изображений."
      },
      {
        title: "Программа оценки степени поражения легких «LMS COVID Мультивокс» за 90 секунд",
        image: "./assets/images/programms/ai/product-02.jpg",
        description: "Комплекс автоматизированных обучающих программ «LMS OQY Мультивокс» (Вариант исполнения 2) медицинских сестер и рентгенлаборантов предназначен для эффективного освоения навыков работы с диагностическими данными в формате DICOM. Программа рассчитана на подготовку среднего и младшего медицинского персонала."
      },
      {
        title: "Специализированные модули для 2D и 3D DICOM изображений",
        image: "./assets/images/programms/ai/product-03.jpg",
        description: "Комплекс автоматизированных обучающих программ «LMS OQY Мультивокс» (Вариант исполнения 1) предназначен для использования в медицинских университетах, оборудования кафедр радиологии, виртуальной хирургии, а также кафедр и научно-исследовательских учреждений с функциями аудита радиологических исследований, с акцентом на обучение обработке 2D и 3D изображений."
      },
    ]
  },
  {
    title: "Маммография",
    subtitle: "Плоскопанельные детекторы для маммографа 18х24 см и 24х30 см",
    image: "./assets/images/dopoborud/detectors/product-01.jpg",
    description: `Такой же размер, как и формат кассет с рентгеновской пленкой или CR-кассет (ISO 4090).
    Преимущество перехода на полностью цифровую систему без дорогостоящей замены маммографа.
    Высокое качество изображения, достигающееся за счет размера пикселя в матрице детектора размером 75 мкм.
    Предназначены специально для традиционных маммографов с системой автоматического контроля экспозиции.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Рентгенография",
    subtitle: "Легкая модернизация",
    image: "./assets/images/dopoborud/detectors/product-02.jpg",
    description: `Размер беспроводных плоскопанельных детекторов такой же, как и формат кассет с рентгеновской пленкой или CR-кассет (ISO 4090).
    ПО АРМ лаборанта XView, используемое совместно с детектором для рентгенографии повышает эффективность рабочего процесса рентген-лаборанта.
    Возможность использования беспроводных детекторов при снимках на деке рентгеновского стола или, подложив детектор под пациента.
    За счёт размера пикселя - от 100 до 140 микрон, разрешение и качество цифрового рентгеновского изображения подходит для диагностики как новорожденных и младенцев, так и взрослых.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Рентгеноскопия с встроенным ИИ распознавания фотонов",
    subtitle: "Искусственный интеллект для врача радиолога",
    image: "./assets/images/dopoborud/detectors/product-03.jpg",
    description: `Улучшенная визуализация рентгенологического исследования за счет встроенного в детектор решения распознающего фотоны рентгеновского излучения искусственным интеллектом.
    (формат детекторов 36х43/43х43)`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Диагностические мониторы двухмегапиксельные",
    subtitle: "Легкая модернизация",
    image: "./assets/images/dopoborud/monitors/product-01.jpg",
    description: `С помощью диагностических мониторов JVC и 
ПО «LMS МУЛЬТИВОКС» – обычный компьютер врача становится диагностической станцией экспертного класса.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Диагностические мониторы трехмегапиксельные",
    subtitle: "Легкая модернизация",
    image: "./assets/images/dopoborud/monitors/product-02.jpg",
    description: `С помощью диагностических мониторов JVC и 
ПО «LMS МУЛЬТИВОКС» – обычный компьютер врача становится диагностической станцией экспертного класса.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Диагностические мониторы пятимегапиксельные",
    subtitle: "Легкая модернизация",
    image: "./assets/images/dopoborud/monitors/product-03.jpg",
    description: `Диагностические мониторы JVC не требуют даже установки драйверов на компьютер пользователя, они работают сразу после подключения к компьютеру врача.`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  {
    title: "Диагностические мониторы двенадцатимегапиксельные",
    subtitle: "Легкая модернизация",
    image: "./assets/images/dopoborud/monitors/product-04.jpg",
    description: `Гарантийный срок эксплуатации производителя – 5 лет;
    Эквалайзер однородности
    Светодиодный индикатор
    Шлейфовое подключение DisplayPort
    Датчик присутствия человека`,
    features: [
      { icon: "fa fa-globe", text: "Работа с изображениями для диагностики и хирургии" },
      { icon: "fa fa-code", text: "Собственный программный код" },
      { icon: "fa fa-user", text: "Тесная работа с пользователем при внедрении решений" },
      { icon: "fa fa-briefcase", text: "Разработка при участии ведущих специалистов" }
    ]
  },
  // Add other products as needed
];

let modalStack = [];

function openModal(index) {
  const product = products[index];
  const modalMain = document.getElementById('modal-main');
  const backButton = document.getElementById('back-button');

  if (product.subProducts) {
    const subProductsHTML = product.subProducts.map((subProduct, idx) => `
      <div class="sub-product" onclick="openSubProductModal(${index}, ${idx})">
        <img src="${subProduct.image}" alt="${subProduct.title}">
        <h3>${subProduct.title}</h3>
      </div>
    `).join('');

    modalMain.innerHTML = `
      <h1>${product.title}</h1>
      <div class="sub-products">${subProductsHTML}</div>
    `;
    backButton.style.display = 'none';
  } else {
    modalMain.innerHTML = `
      <div class="modal-body">
        <div class="modal-left">
          <img id="modal-img" src="${product.image}" alt="Product Image">
        </div>
        <div class="modal-right">
          <h1 id="modal-title">${product.title}</h1>
          <h3 id="modal-subtitle">${product.subtitle}</h3>
          <p id="modal-description">${product.description}</p>
          <div class="button-container">
            <button type="button" class="button">
              <span class="button__text">Заказать</span>
              <span class="button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg">
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <h2 class="modal-pref">Преимущества</h2>
      <div id="modal-features" class="features-container">
        ${product.features.map(feature => `<div class="feature-item"><i class="${feature.icon}"></i>${feature.text}</div>`).join('')}
      </div>
    `;
    backButton.style.display = 'none';
  }

  modalStack = [product];
  const modal = document.getElementById('productModal');
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.querySelector('.modal-content').style.transform = 'scale(1)';
  }, 10);
}

function openSubProductModal(productIndex, subProductIndex) {
  const product = products[productIndex];
  const subProduct = product.subProducts[subProductIndex];
  const modalMain = document.getElementById('modal-main');
  const backButton = document.getElementById('back-button');

  // Анимация исчезновения старого контента
  modalMain.classList.add('fade-out');
  setTimeout(() => {
    modalMain.classList.remove('fade-out');
    modalMain.classList.add('fade-in');

    modalMain.innerHTML = `
      <div class="modal-body">
        <div class="modal-left">
          <img id="modal-img" src="${subProduct.image}" alt="Sub Product Image">
        </div>
        <div class="modal-right">
          <h1 id="modal-title">${subProduct.title}</h1>
          <h3 id="modal-subtitle">${product.subtitle}</h3>
          <p id="modal-description">${subProduct.description}</p>
          <div class="button-container">
            <button type="button" class="button">
              <span class="button__text">Заказать</span>
              <span class="button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg">
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <h2 class="modal-pref">Преимущества</h2>
      <div id="modal-features" class="features-container">
        ${product.features.map(feature => `<div class="feature-item"><i class="${feature.icon}"></i>${feature.text}</div>`).join('')}
      </div>
    `;

    backButton.style.display = 'block';
    modalMain.classList.remove('fade-in');
  }, 300);
  modalStack.push(subProduct);
}

function goBack() {
  const modalMain = document.getElementById('modal-main');
  modalMain.classList.add('fade-out');
  setTimeout(() => {
    modalMain.classList.remove('fade-out');
    modalMain.classList.add('fade-in');

    modalStack.pop();
    if (modalStack.length === 1) {
      openModal(products.indexOf(modalStack[0]));
    } else if (modalStack.length === 0) {
      closeModal();
    } else {
      const productIndex = products.indexOf(modalStack[0]);
      const subProductIndex = modalStack[0].subProducts.indexOf(modalStack[modalStack.length - 1]);
      openSubProductModal(productIndex, subProductIndex);
    }
    modalMain.classList.remove('fade-in');
  }, 300);
}

function closeModal() {
  const modal = document.getElementById('productModal');
  modal.style.opacity = '0';
  modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 500);
}