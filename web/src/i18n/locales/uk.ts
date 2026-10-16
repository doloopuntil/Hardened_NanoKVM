const uk = {
  translation: {
    common: {
      confirm: 'Підтвердити',
      cancel: 'Скасувати',
      delete: 'Видалити',
      actionFailed: 'Не вдалося виконати операцію',
      loading: 'Завантаження налаштувань з пристрою...',
      loadFailed: 'Не вдалося завантажити налаштування з пристрою',
      retry: 'Повторити'
    },
    head: {
      desktop: 'Віддалений робочий стіл',
      login: 'Вхід',
      changePassword: 'Змінити пароль',
      terminal: 'Термінал',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Вхід',
      placeholderUsername: "Введіть ім'я користувача",
      placeholderPassword: 'Введіть пароль',
      placeholderPassword2: 'Введіть пароль ще раз',
      noEmptyUsername: "Ім'я користувача не може бути порожнім",
      noEmptyPassword: 'Пароль не може бути порожнім',
      noAccount:
        'Не вдалося отримати інформацію про користувача, оновіть веб-сторінку або скиньте пароль',
      invalidUser: "Недійсне ім'я користувача або пароль",
      locked: 'Забагато входів, спробуйте пізніше',
      globalLocked: 'Система під захистом, спробуйте пізніше',
      changePassword: 'Змінити пароль',
      differentPassword: 'Паролі не збігаються',
      illegalUsername: "Ім'я користувача містить недопустимі символи",
      forgetPassword: 'Забули пароль',
      ok: 'Ок',
      cancel: 'Скасувати',
      loginButtonText: 'Увійти',
      tips: {
        change1: 'Зверніть увагу, що ця дія змінить наступні паролі:',
        change2: 'Пароль для входу у веб-інтерфейс'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Налаштування Wi-Fi для NanoKVM',
      invalidMode:
        'Поточний режим не підтримує налаштування мережі. Перейдіть на свій пристрій і ввімкніть режим конфігурації Wi-Fi.',
      confirmBtn: 'Так',
      finishBtn: 'Готово',
      ap: {
        authTitle: 'Потрібна автентифікація',
        authDescription: 'Щоб продовжити, введіть пароль AP',
        authFailed: 'Недійсний пароль AP',
        passPlaceholder: 'AP пароль',
        verifyBtn: 'Перевірити'
      }
    },
    screen: {
      scale: 'Масштаб',
      title: 'Екран',
      video: 'Відеорежим',
      resolution: 'Роздільна здатність',
      auto: 'Автоматично',
      autoTips:
        'Може виникнути розрив зображення або зміщення миші при певних роздільних здатностях. Розгляньте можливість налаштування роздільної здатності віддаленого хоста або вимкнення автоматичного режиму для передачі відеопотоку.',
      fps: 'Кадри в секунду',
      customizeFps: 'Налаштувати',
      quality: 'Якість',
      qualityLossless: 'Без втрат',
      qualityHigh: 'Високий',
      qualityMedium: 'Середній',
      qualityLow: 'Низький',
      frameDetect: 'Виявлення кадрів',
      frameDetectTip:
        'Обчислює різницю між кадрами. Зупиняє передачу відеопотоку, коли на екрані віддаленого хоста не виявлено змін.',
      resetHdmi: 'Перезавантажити HDMI підсистему',
      webrtcConnectionFailed: {
        title: 'Не вдалося підключитися через WebRTC'
      },
      captureStatus: {
        hdmiError: 'Помилка зображення HDMI',
        unsupportedResolution: 'Поточна роздільна здатність не підтримується',
        retrieving: 'Отримання зображення...',
        changingResolution: 'Перемикання роздільної здатності...',
        updateFailed: 'Зараз неможливо оновити зображення',
        videoError: 'Помилка відображення відео',
        noHdmi: 'Сигнал HDMI не виявлено',
        unavailable: 'Зараз неможливо показати зображення'
      }
    },
    keyboard: {
      title: 'Клавіатура',
      paste: 'Вставити',
      tips: 'Підтримуються лише стандартні літери та символи клавіатури',
      placeholder: 'Будь ласка, введіть',
      submit: 'Надіслати',
      virtual: 'Клавіатура',
      readClipboard: 'Читання з буфера обміну',
      clipboardPermissionDenied:
        'Відмовлено в дозволі буфера обміну. Будь ласка, дозвольте доступ до буфера обміну у вашому браузері.',
      clipboardReadError: 'Не вдалося прочитати буфер обміну',
      shortcut: {
        capture: 'Натисніть тут, щоб захопити ярлик',
        save: 'Зберегти'
      },
      leaderKey: {
        title: 'Клавіша Leader',
        howToUse: 'Як використовувати',
        simultaneous: {
          title: 'Одночасний режим',
          desc1: 'Натисніть і утримуйте клавішу Leader, потім натисніть клавішу швидкого доступу.',
          desc2: 'Інтуїтивно зрозумілий, але може конфліктувати з системними ярликами.'
        },
        sequential: {
          title: 'Послідовний режим',
          desc1:
            'Натисніть клавішу Leader → послідовно натисніть клавішу швидкого доступу → знову натисніть клавішу Leader.',
          desc2: 'Вимагає більше кроків, але повністю уникає системних конфліктів.'
        },
        enable: 'Увімкнути клавішу Leader',
        tip: 'Якщо її призначити клавішею Leader, ця клавіша працює лише як тригер швидкого доступу та втрачає поведінку за замовчуванням.',
        placeholder: 'Натисніть клавішу Leader',
        shiftRight: 'Правий Shift',
        ctrlRight: 'Правий Ctrl',
        metaRight: 'Правий Win',
        submit: 'Надіслати',
        recorder: {
          rec: 'REC',
          activate: 'Активувати клавіші',
          input: 'Будь ласка, натисніть клавішу швидкого доступу...'
        }
      }
    },
    mouse: {
      title: 'Миша',
      cursor: 'Стиль курсору',
      default: 'Курсор за замовчуванням',
      pointer: 'Курсор-стрілка',
      cell: 'Курсор-таблиця',
      text: 'Курсор-текст',
      grab: 'Курсор-захоплення',
      hide: 'Сховати курсор',
      mode: 'Режим миші',
      absolute: 'Абсолютний режим',
      relative: 'Відносний режим',
      direction: 'Напрямок коліщатка',
      scrollUp: 'Прокрутіть вгору',
      scrollDown: 'Прокрутіть вниз',
      speed: 'Швидкість коліщатка',
      fast: 'Швидко',
      slow: 'Повільно',
      requestPointer:
        'Використовується відносний режим. Будь ласка, натисніть на робочий стіл, щоб отримати курсор миші.',
      resetHid: 'Скинути HID',
      hidOnly: {
        title: 'Режим лише HID',
        tip1: 'Увімкнення режиму "лише HID" демонтує віртуальний U-диск і віртуальну мережу',
        tip2: 'У режимі "лише HID" монтування образів буде вимкнено',
        tip3: 'NanoKVM автоматично перезавантажиться після перемикання режимів',
        enable: 'Увімкнути режим "лише HID"',
        disable: 'Ввимкнути режим "лише HID"'
      }
    },
    image: {
      title: 'Образи',
      loading: 'Завантаження...',
      empty: 'Нічого не знайдено',
      mountMode: 'Режим монтування',
      diskOnWarn:
        "Монтування образу вимикає віртуальний диск, тому комп'ютер більше не має доступу до /data. Продовжити?",
      diskOffWarn:
        "Віртуальний диск вимкнено, його треба увімкнути для монтування образу. USB-пристрої комп'ютера буде перепідключено. Продовжити?",
      unmountFailed: 'Не вдалося розмонтувати',
      forceEject: 'Примусове виймання',
      forceEjectConfirm:
        "Хост заблокував оптичний привід. Примусове виймання на мить від'єднує віртуальний USB-пристрій, тож клавіатура й миша можуть ненадовго від'єднатися. Продовжити?",
      refresh: 'Оновіть список образів',
      attention: 'Увага',
      deleteConfirm: 'Ви впевнені, що хочете видалити це зображення?',
      tips: {
        title: 'Як завантажити',
        usb1: "Під'єднайте NanoKVM до вашого комп'ютера через USB.",
        usb3: "Відкрийте віртуальний диск на вашому комп'ютері та скопіюйте файл зображення до кореневого каталогу віртуального диска.",
        scp1: "Переконайтеся, що NanoKVM і ваш комп'ютер знаходяться в одній локальній мережі.",
        scp2: "Відкрийте термінал на вашому комп'ютері та використовуйте команду SCP для завантаження файлу зображення до каталогу /data на NanoKVM.",
        scp3: 'Приклад: scp ваш-шлях-до-зображення root@ваш-ip-nanokvm:/data',
        tfCard: 'TF карта',
        tf1: 'Цей метод підтримується на системах Linux',
        tf3: "Вставте TF карту в кардрідер і під'єднайте її до вашого комп'ютера.",
        tf4: 'Скопіюйте файл зображення до каталогу /data на TF карті.',
        tf5: 'Вставте TF карту в NanoKVM.'
      }
    },
    script: {
      title: 'Скрипти',
      upload: 'Завантажити',
      run: 'Запустити',
      runBackground: 'Запустити у фоновому режимі',
      runFailed: 'Не вдалося запустити',
      attention: 'Увага',
      delDesc: 'Ви впевнені, що хочете видалити цей файл?',
      confirm: 'Так',
      cancel: 'Ні',
      delete: 'Видалити',
      close: 'Закрити'
    },
    terminal: {
      title: 'Термінал',
      nanokvm: 'Термінал NanoKVM',
      serial: 'Термінал послідовного порту',
      serialPort: 'Послідовний порт',
      serialPortPlaceholder: 'Будь ласка, введіть послідовний порт',
      baudrate: 'Швидкість передачі',
      parity: 'Парність',
      parityNone: 'Без парності',
      parityEven: 'Парна',
      parityOdd: 'Непарна',
      flowControl: 'Керування потоком',
      flowControlNone: 'Без керування',
      flowControlSoft: 'Програмне',
      flowControlHard: 'Апаратне',
      dataBits: 'Біти даних',
      stopBits: 'Стопові біти',
      confirm: 'Ок'
    },
    wol: {
      title: 'Wake-on-LAN',
      sent: 'Команду відправлено',
      input: 'Будь ласка, введіть MAC',
      ok: 'Ок'
    },
    download: {
      title: 'Завантажувач образів',
      input: 'Введіть URL-адресу віддаленого образу',
      ok: 'Так',
      mountedImage:
        'Цей образ змонтовано. Розмонтуйте його, перш ніж завантажувати файл з такою самою назвою.',
      diskOff: 'Вимкнути віртуальний диск',
      uploadbox: 'Перетягніть файл сюди або натисніть, щоб вибрати',
      inputfile: 'Будь ласка, введіть файл зображення',
      NoISO: 'Немає ISO',
      sha256Placeholder: 'Введіть контрольну суму SHA-256 із 64 символів',
      invalidSHA256: 'SHA-256 має бути шістнадцятковим рядком із 64 символів',
      checksumFailed: 'Помилка завантаження: перевірка SHA-256 не пройдена'
    },
    power: {
      title: 'Живлення',
      showConfirm: 'Підтвердження',
      showConfirmTip: 'Енергетичні операції потребують додаткового підтвердження',
      reset: 'Скидання',
      power: 'Живлення',
      resetConfirm: 'Продовжити роботу зі скиданням?',
      okBtn: 'Так',
      cancelBtn: 'Ні'
    },
    settings: {
      title: 'Налаштування',
      about: {
        title: 'Про NanoKVM',
        information: 'Інформація',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Версія додатка',
        applicationTip: 'Версія веб-додатка NanoKVM',
        image: 'Версія образу',
        imageTip: 'Версія системного образу NanoKVM',
        deviceKey: 'Ключ пристрою',
        community: 'Спільнота',
        hostname: "Ім'я вузла",
        hostnameUpdated: "Ім'я вузла оновлено. Перезавантажте систему, щоб застосувати зміни.",
        ipType: {
          Wired: 'Дротове',
          Wireless: 'Бездротове',
          Other: 'Інший'
        }
      },
      appearance: {
        title: 'Зовнішній вигляд',
        display: 'Відображення',
        language: 'Мова',
        languageDesc: 'Виберіть мову для інтерфейсу',
        webTitle: 'Веб-назва',
        webTitleDesc: 'Налаштуйте назву веб-сторінки',
        menuBar: {
          title: 'Рядок меню',
          mode: 'Режим відображення',
          modeDesc: 'Відображення панелі меню на екрані',
          modeOff: 'Вимк',
          modeAuto: 'Автоматичне приховування',
          modeAlways: 'Завжди видно',
          keyboardLedStatus: 'Індикатори блокування клавіатури',
          keyboardLedStatusDesc:
            'Показувати стан Num Lock, Caps Lock і Scroll Lock віддаленого комп’ютера',
          icons: 'Значки підменю',
          iconsDesc: 'Відображення значків підменю на панелі меню'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Стан блокувань віддаленої клавіатури',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'Увімкнено',
        off: 'Вимкнено',
        unknown: 'Невідомо'
      },
      device: {
        title: 'Пристрій',
        oled: {
          title: 'OLED-екран',
          description: 'Автоматичне відключення OLED-екрана'
        },
        ssh: {
          description: 'Увімкніть віддалений доступ по SSH'
        },
        swap: {
          description: 'Встановіть розмір файлу свопу'
        },
        mouseJiggler: {
          description: 'Не дозволяйте віддаленому хосту спати',
          absolute: 'Абсолютний режим',
          relative: 'Відносний режим'
        },
        mdns: {
          tip: 'Вимкнути, якщо це не потрібно'
        },
        hdmi: {
          description: 'Увімкнути вихід HDMI/monitor',
          idleTimeoutTitle: 'Час очікування неактивного захоплення',
          idleTimeoutDescription: 'Зупинити захоплення HDMI, якщо активних глядачів немає протягом'
        },
        hidOnly: 'Режим лише HID',
        disk: 'Віртуальний диск',
        network: 'Віртуальна мережа',
        networkDesc: 'Встановити віртуальну мережеву карту на віддаленому хості',
        reboot: 'Перезавантажити',
        rebootDesc: 'Ви впевнені, що хочете перезавантажити NanoKVM?',
        okBtn: 'Так',
        cancelBtn: 'Ні'
      },
      network: {
        title: 'Мережа',
        wifi: {
          title: 'Wi-Fi',
          description: 'Налаштування Wi-Fi',
          apMode: 'Режим AP увімкнено, підключіться до Wi-Fi, відсканувавши QR-код',
          connect: 'Підключити Wi-Fi',
          connectDesc1: 'Введіть SSID мережі та пароль',
          connectDesc2: 'Введіть пароль, щоб підключитися до цієї мережі',
          disconnect: 'Ви впевнені, що хочете відключити мережу?',
          ssid: 'Назва',
          password: 'Пароль',
          joinBtn: 'Підключити',
          cancelBtn: 'Скасувати'
        },
        tls: {
          description: 'Увімкнути протокол HTTPS'
        },
        dns: {
          title: 'DNS',
          description: 'Налаштування DNS-серверів для NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Налаштування IPv4-адресації для дротового інтерфейсу',
          mode: 'Режим',
          dhcp: 'DHCP',
          manual: 'Вручну',
          save: 'Зберегти',
          apply: 'Застосувати',
          invalid: 'Введіть дійсну IPv4- або IPv6-адресу',
          invalidNetwork: 'Введіть дійсну IPv4-адресу, маску підмережі та маршрутизатор',
          noDhcp: 'Наразі DHCP DNS недоступний',
          saved: 'Налаштування DNS збережено',
          redirecting: 'Налаштування мережі збережено. Відкриваю нову адресу...',
          saveFailed: 'Не вдалося зберегти налаштування DNS',
          unsaved: 'Незбережені зміни',
          maxServers: 'Дозволено щонайбільше {{count}} DNS-серверів',
          dhcpServersDescription: 'DNS-сервери автоматично отримуються з DHCP',
          interface: 'Інтерфейс',
          ipAddress: 'IP-адреса',
          subnetMask: 'Маска підмережі',
          router: 'Маршрутизатор'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: "Оптимізація пам'яті",
          tip: 'Коли використання пам’яті перевищує обмеження, збирання сміття проводиться більш агресивно, щоб спробувати звільнити пам’ять. Рекомендується встановити 50 Мб, якщо використовувати Tailscale. Після зміни налаштувань потрібно перезавантажити Tailscale.'
        },
        swap: {
          title: "Обмін пам'яттю",
          tip: 'Якщо проблеми не зникають після ввімкнення оптимізації пам’яті, спробуйте ввімкнути підкачну пам’ять. Це встановлює розмір файлу підкачки 256MB за замовчуванням, який можна налаштувати в «Параметрах > Пристрій».'
        },
        restart: 'Ви впевнені, що бажаєте перезавантажити Tailscale?',
        stop: 'Ви впевнені, що бажаєте зупинити Tailscale?',
        loading: 'Завантаження...',
        install: 'Встановити',
        installing: 'Встановлення',
        failed: 'Не вдалося встановити',
        download: 'Завантажте',
        package: 'пакет встановлення',
        unzip: 'та розпакуйте його',
        upTailscale: 'Завантажте Tailscale до каталогу /usr/bin/ на NanoKVM',
        upTailscaled: 'Завантажте Tailscaled до каталогу /usr/sbin/ на NanoKVM',
        refresh: 'Оновіть поточну сторінку',
        notRunning: 'Tailscale не працює. Щоб продовжити, запустіть його.',
        notLogin:
          "Пристрій ще не прив'язаний. Будь ласка, увійдіть і прив'яжіть цей пристрій до вашого облікового запису.",
        urlPeriod: 'Ця URL-адреса дійсна протягом 10 хвилин',
        login: 'Увійти',
        loginSuccess: 'Успішний вхід',
        enable: 'Увімкнути Tailscale',
        deviceName: 'Назва пристрою',
        deviceIP: 'IP пристрою',
        account: 'Обліковий запис',
        logout: 'Вийти',
        logoutDesc: 'Ви впевнені, що хочете вийти?',
        uninstall: 'Видалити Tailscale',
        uninstallDesc: 'Ви впевнені, що хочете видалити Tailscale?',
        okBtn: 'Так',
        cancelBtn: 'Ні'
      },
      update: {
        title: 'Перевірити оновлення',
        queryFailed: 'Не вдалося отримати версію',
        updateFailed: 'Оновлення не вдалося. Будь ласка, спробуйте ще раз.',
        isLatest: 'У вас вже остання версія.',
        available: 'Доступне оновлення. Ви впевнені, що хочете оновити?',
        updating: 'Оновлення розпочато. Будь ласка, зачекайте...',
        confirm: 'Підтвердити',
        cancel: 'Скасувати',
        previewDesc: 'Отримайте ранній доступ до нових функцій та вдосконалень',
        offline: {
          title: 'Оновлення в автономному режимі',
          desc: 'Оновлення через локальний інсталяційний пакет',
          upload: 'Завантажити',
          invalidName: 'Недійсний формат імені файлу. Завантажте випуски з GitHub.',
          updateFailed: 'Оновлення не вдалося. Будь ласка, спробуйте ще раз.'
        }
      },
      account: {
        title: 'Обліковий запис',
        password: 'Пароль',
        updateBtn: 'Зміна',
        logoutBtn: 'Вийти',
        logoutDesc: 'Ви впевнені, що хочете вийти?',
        okBtn: 'Так',
        cancelBtn: 'Ні'
      }
    },
    picoclaw: {
      title: 'PicoClaw Помічник',
      inputPlaceholder: 'Опишіть, що ви хочете, щоб PicoClaw зробив',
      newConversation: 'Нова розмова',
      processing: 'Обробка...',
      agent: {
        defaultTitle: 'Загальний помічник',
        kvmTitle: 'Віддалене керування',
        switched: 'Роль агента змінена',
        switchFailed: 'Не вдалося змінити роль агента'
      },
      send: 'Надіслати',
      cancel: 'Скасувати',
      status: {
        connecting: 'Підключення до шлюзу...',
        connected: 'Сеанс PicoClaw підключено',
        disconnected: 'Сеанс PicoClaw відключено',
        stopped: 'Запит на зупинку надіслано',
        runtimeStarted: 'Runtime PicoClaw запущено',
        runtimeStartFailed: 'Не вдалося запустити runtime PicoClaw',
        runtimeStopped: 'Runtime PicoClaw зупинено',
        runtimeStopFailed: 'Не вдалося зупинити runtime PicoClaw'
      },
      connection: {
        runtime: {
          checking: 'Перевірка',
          ready: 'Runtime готовий',
          stopped: 'Runtime зупинено',
          unavailable: 'Runtime недоступний',
          configError: 'Помилка конфігурації'
        },
        transport: {
          connecting: 'Підключення',
          connected: 'Підключено'
        },
        run: {
          idle: 'Бездіяльність',
          busy: 'Зайнятий'
        }
      },
      message: {
        toolAction: 'Дія',
        observation: 'Спостереження',
        screenshot: 'Скріншот'
      },
      overlay: {
        locked: 'PicoClaw керує пристроєм. Ручне введення призупинено.'
      },
      install: {
        install: 'Встановити PicoClaw',
        installing: 'Встановлення PicoClaw',
        success: 'PicoClaw успішно встановлено',
        failed: 'Не вдалося встановити PicoClaw',
        uninstalling: 'Видалення runtime...',
        requiredTitle: 'PicoClaw не встановлено',
        requiredDescription: 'Встановіть PicoClaw перед запуском runtime PicoClaw.',
        progressDescription: 'PicoClaw завантажується та встановлюється.',
        stages: {
          preparing: 'Підготовка',
          downloading: 'Завантаження',
          extracting: 'Розпакування',
          verifying: 'Перевірка',
          installing: 'Встановлення',
          installed: 'Встановлено',
          install_timeout: 'Час очікування минув',
          install_failed: 'Помилка'
        }
      },
      model: {
        requiredTitle: 'Потрібна конфігурація моделі',
        requiredDescription: 'Налаштуйте модель PicoClaw перед використанням чату PicoClaw.',
        docsTitle: 'Керівництво з налаштування',
        docsDesc: 'Підтримувані моделі та протоколи',
        menuLabel: 'Налаштувати модель',
        modelIdentifier: 'Ідентифікатор моделі',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API-ключ',
        apiKeyPlaceholder: 'Введіть API-ключ моделі',
        save: 'Зберегти',
        saving: 'Збереження',
        saved: 'Конфігурацію моделі збережено',
        saveFailed: 'Не вдалося зберегти конфігурацію моделі',
        invalid: 'Потрібні ідентифікатор моделі, API Base URL і API-ключ'
      },
      uninstall: {
        menuLabel: 'Видалити',
        confirmTitle: 'Видалити PicoClaw',
        confirmContent:
          'Ви впевнені, що хочете видалити PicoClaw? Це призведе до видалення виконуваного файлу та всіх конфігураційних файлів.',
        confirmOk: 'Видалити',
        confirmCancel: 'Скасувати'
      },
      history: {
        title: 'Історія',
        loading: 'Завантаження сеансів...',
        emptyTitle: 'Історії ще немає',
        emptyDescription: 'Попередні PicoClaw сесії відображатимуться тут.',
        loadFailed: 'Не вдалося завантажити історію сеансу',
        deleteFailed: 'Не вдалося видалити сеанс',
        deleteConfirmTitle: 'Видалити сеанс',
        deleteConfirmContent: 'Ви впевнені, що хочете видалити "{{title}}"?',
        deleteConfirmOk: 'Видалити',
        deleteConfirmCancel: 'Скасувати',
        messageCount_one: '{{count}} повідомлення',
        messageCount_other: '{{count}} повідомлень'
      },
      config: {
        startRuntime: 'Запустити PicoClaw',
        stopRuntime: 'Зупинити PicoClaw'
      },
      start: {
        title: 'Запустити PicoClaw',
        description: 'Запустіть runtime, щоб почати використовувати помічника PicoClaw.'
      }
    },
    error: {
      title: 'Ми зіткнулися з проблемою',
      refresh: 'Оновити'
    },
    fullscreen: {},
    menu: {
      collapse: 'Згорнути меню',
      expand: 'Розгорнути меню'
    }
  }
};

export default uk;
