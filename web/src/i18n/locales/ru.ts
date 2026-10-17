const ru = {
  translation: {
    common: {
      confirm: 'Подтвердить',
      cancel: 'Отмена',
      delete: 'Удалить',
      actionFailed: 'Не удалось выполнить операцию',
      loading: 'Загрузка настроек с устройства...',
      loadFailed: 'Не удалось загрузить настройки с устройства',
      retry: 'Повторить'
    },
    head: {
      desktop: 'Удаленный рабочий стол',
      login: 'Войти',
      firstSetup: 'Первичная настройка',
      changePassword: 'Изменить пароль',
      terminal: 'Терминал',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Войти',
      placeholderUsername: 'Введите имя пользователя',
      placeholderPassword: 'Введите пароль',
      placeholderPassword2: 'Введите пароль снова',
      noEmptyUsername: 'Имя пользователя не может быть пустым',
      noEmptyPassword: 'Пароль не может быть пустым',
      invalidUser: 'Неверное имя пользователя или пароль',
      error: 'Непредвиденная ошибка',
      changePassword: 'Изменить пароль',
      differentPassword: 'Пароли не совпадают',
      illegalUsername: 'Имя пользователя содержит недопустимые символы',
      illegalPassword:
        'Пароль должен быть не короче 8 символов и не должен содержать кавычки или слэши',
      forgetPassword: 'Забыли пароль?',
      ok: 'ОК',
      cancel: 'Отмена',
      loginButtonText: 'Войти',
      setupTitle: 'Создание аккаунта администратора',
      setupDescription:
        'На этом устройстве еще нет веб-аккаунта. Создайте первый аккаунт администратора, чтобы продолжить.',
      setupButtonText: 'Создать аккаунт',
      tips: {
        hardenedRecovery:
          'Этот Hardened-образ не поддерживает сброс пароля кнопкой BOOT. Если пароль потерян, перепрошейте SD-карту и создайте новый аккаунт.',
        change1: 'Пожалуйста учтите, что это действие изменит следующие пароли:',
        change2: 'Пароль для входа в веб-интерфейс'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Настройка Wi-Fi для NanoKVM',
      invalidMode:
        'Текущий режим не поддерживает настройку сети. Пожалуйста, перейдите на свое устройство и включите режим конфигурации Wi-Fi.',
      confirmBtn: 'OK',
      finishBtn: 'Готово',
      ap: {
        authTitle: 'Требуется аутентификация',
        authFailed: 'Неверный пароль AP',
        passPlaceholder: 'AP пароль',
        verifyBtn: 'Проверить'
      }
    },
    screen: {
      scale: 'Масштаб',
      title: 'Экран',
      video: 'Видеорежим',
      videoDirectTips:
        'Включите HTTPS в "Настройки > Система > Сеть", чтобы использовать этот режим',
      resolution: 'Разрешение',
      auto: 'Автоматическое',
      autoTips:
        'При некоторых разрешениях экрана могут возникать артефакты изображения или смещение курсора. Пожалуйста, настройте разрешение удаленного компьютера или отключите автоматический режим для передачи видеопотока.',
      fps: 'Частота кадров',
      customizeFps: 'Настроить',
      quality: 'Качество',
      qualityLossless: 'Без потерь',
      qualityHigh: 'Высокий',
      qualityMedium: 'Средний',
      qualityLow: 'Низкий',
      frameDetectTip:
        'Вычисляет разницу между кадрами и прекращает передачу видеопотока, если на экране удаленного узла не обнаружено никаких изменений.',
      resetHdmi: 'Перезагрузить HDMI подсистему',
      webrtcConnectionFailed: {
        title: 'Не удалось подключиться через WebRTC'
      },
      captureStatus: {
        hdmiError: 'Ошибка изображения HDMI',
        unsupportedResolution: 'Текущее разрешение не поддерживается',
        retrieving: 'Получение изображения...',
        changingResolution: 'Переключение разрешения...',
        updateFailed: 'Сейчас невозможно обновить изображение',
        videoError: 'Ошибка отображения видео',
        noHdmi: 'Сигнал HDMI не обнаружен',
        unavailable: 'Сейчас невозможно отобразить изображение'
      }
    },
    keyboard: {
      title: 'Клавиатура',
      paste: 'Вставка текста',
      tips: 'Поддерживаются только стандартные буквы и символы клавиатуры',
      placeholder: 'Текст для ввода',
      local: 'Клавиатура телефона',
      virtual: 'Экранная клавиатура',
      readClipboard: 'Чтение из буфера обмена',
      clipboardPermissionDenied:
        'Разрешение на доступ к буферу обмена отклонено. Пожалуйста, разрешите доступ к буферу обмена в вашем браузере.',
      dropdownEnglish: 'Английский',
      dropdownGerman: 'Немецкий',
      dropdownFrench: 'Французский',
      dropdownRussian: 'Русский',
      shortcut: {
        custom: 'Пользовательский',
        capture: 'Нажмите здесь, чтобы сохранить ярлык',
        clear: 'Очистить',
        save: 'Сохранить'
      },
      leaderKey: {
        title: 'Клавиша Leader',
        howToUse: 'Как использовать',
        simultaneous: {
          title: 'Одновременный режим',
          desc1: 'Нажмите и удерживайте клавишу Leader, затем нажмите сочетание клавиш.',
          desc2: 'Интуитивно понятен, но может конфликтовать с системными ярлыками.'
        },
        sequential: {
          title: 'Последовательный режим',
          desc1:
            'Нажмите клавишу Leader → последовательно нажмите сочетание клавиш → снова нажмите клавишу Leader.',
          desc2:
            'Требует большего количества шагов, но полностью позволяет избежать системных конфликтов.'
        },
        enable: 'Включить клавишу Leader',
        tip: 'При назначении клавишей Leader эта клавиша работает только как триггер сочетаний клавиш и теряет поведение по умолчанию.',
        placeholder: 'Нажмите клавишу Leader',
        shiftRight: 'Правый Shift',
        ctrlRight: 'Правый Ctrl',
        metaRight: 'Правый Win',
        submit: 'Вставить',
        recorder: {
          activate: 'Активировать клавиши',
          input: 'Пожалуйста, нажмите ярлык...'
        }
      }
    },
    mouse: {
      title: 'Мышь',
      cursor: 'Стиль курсора',
      default: 'Курсор по умолчанию',
      cell: 'Курсор: крест',
      text: 'Курсор: выбор текста',
      grab: 'Курсор: захват',
      hide: 'Скрыть курсор',
      mode: 'Режим мыши',
      absolute: 'Абсолютный режим',
      relative: 'Относительный режим',
      direction: 'Направление прокрутки',
      scrollUp: 'Прокрутите вверх',
      scrollDown: 'Прокрутите вниз',
      speed: 'Скорость прокрутки',
      sensitivity: 'Скорость указателя',
      sensitivityDesc:
        'Используется для относительного режима на десктопе. Меньшие значения уменьшают расхождение из-за ускорения мыши на хосте.',
      fast: 'Быстро',
      slow: 'Медленно',
      mobile: {
        touchSync: 'TouchSync'
      },
      requestPointer: 'Используется относительный режим. Нажмите на рабочий стол для захвата мыши.',
      resetHid: 'Перезагрузить HID-подсистему',
      hidOnly: {
        title: 'Режим только HID',
        tip1: 'Включение режима только HID отключит виртуальный USB-диск и виртуальную сеть',
        tip2: 'В режиме только HID отключена возможность монтирования образов',
        tip3: 'NanoKVM автоматически перезагрузится после переключения режима',
        enable: 'Включить режим только HID',
        disable: 'Выключить режим только HID'
      }
    },
    image: {
      title: 'Образы',
      loading: 'Загрузка...',
      empty: 'Пусто',
      mountMode: 'Режим монтирования',
      mountFailed: 'Монтирование образа не удалось',
      diskOnWarn:
        'Монтирование образа отключает виртуальный диск, и компьютер теряет доступ к /data. Продолжить?',
      diskOffWarn:
        'Виртуальный диск отключён, его нужно включить для монтирования образа. USB-устройства компьютера будут переподключены. Продолжить?',
      unmountFailed: 'Не удалось размонтировать',
      forceEject: 'Извлечь принудительно',
      forceEjectConfirm:
        'Хост заблокировал оптический привод. Принудительное извлечение ненадолго отключает виртуальное USB-устройство, поэтому клавиатура и мышь могут кратко отключиться. Продолжить?',
      usbReconnect: 'Переподключить USB',
      usbReconnectConfirm:
        'Переподключайте USB-gadget только если удаленный хост не увидел смену носителя. Клавиатура и мышь могут кратко отключиться.',
      usbReconnectSuccess: 'USB переподключен',
      usbReconnectFailed: 'Не удалось переподключить USB',
      attention: 'Внимание',
      deleteConfirm: 'Вы уверены, что хотите удалить это изображение?',
      tips: {
        title: 'Как загрузить',
        usb1: 'Подключите NanoKVM к вашему компьютеру через USB.',
        usb3: 'Откройте виртуальный диск на вашем компьютере и скопируйте файл образа в корневой каталог диска.',
        scp1: 'Убедитесь что NanoKVM и ваш компьютер находятся в одной и той же сети.',
        scp2: 'Откройте терминал на вашем компьютере и используйте команду scp, чтобы загрузить файл образа в директорию /data, находящуюся на NanoKVM.',
        scp3: 'Например: scp путь-к-образу root@ip-вашего-nanokvm:/data',
        tfCard: 'Карта памяти',
        tf1: 'Этот метод поддерживается на Linux-системах',
        tf3: 'Вставьте карту памяти в картридер и подключите его в свой компьютер.',
        tf4: 'Скопируйте файл образа в директорию /data на карте памяти.',
        tf5: 'Вставьте карту памяти в NanoKVM.'
      }
    },
    script: {
      title: 'Скрипты',
      upload: 'Загрузить',
      run: 'Выполнить',
      runBackground: 'Выполнить в фоне',
      runFailed: 'Не удалось выполнить',
      delDesc: 'Вы уверены, что хотите удалить этот файл?',
      delete: 'Удалить',
      close: 'Закрыть'
    },
    terminal: {
      title: 'Терминал',
      nanokvm: 'Терминал NanoKVM',
      serial: 'Терминал COM-порта',
      unlockTitle: 'Разблокировать терминал',
      unlock: 'Разблокировать',
      unlockFailed: 'Не удалось разблокировать терминал',
      invalidCredentials: 'Неверное имя пользователя или пароль',
      sessionClosed: 'Сессия терминала закрыта. Разблокируйте терминал снова.',
      sessionError: 'Не удалось подключиться к терминалу. Попробуйте разблокировать снова.',
      serialPort: 'COM-порт',
      serialPortPlaceholder: 'Введите COM-порт',
      baudrate: 'Скорость передачи',
      parity: 'Чётность',
      parityNone: 'Нет',
      parityEven: 'Чётная',
      parityOdd: 'Нечётная',
      flowControl: 'Управление потоком',
      flowControlNone: 'Нет',
      flowControlSoft: 'Программное',
      flowControlHard: 'Аппаратное',
      dataBits: 'Бит данных',
      stopBits: 'Стоп-бит',
      confirm: 'ОК'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'Отправка команды...',
      sent: 'Команда отправлена',
      input: 'Введите MAC-адрес',
      ok: 'ОК'
    },
    download: {
      title: 'Скачать образ',
      input: 'Введите URL удаленного образа',
      ok: 'OK',
      mountedImage:
        'Этот образ смонтирован. Размонтируйте его, прежде чем загружать файл с таким же именем.',
      diskOff: 'Отключить виртуальный диск',
      uploadbox: 'Перетащите сюда файл или нажмите, чтобы выбрать',
      inputfile: 'Пожалуйста, введите файл изображения',
      NoISO: 'Нет ISO',
      complete: 'Скачивание завершено',
      uploadComplete: 'Загрузка завершена',
      downloading: 'Скачивание',
      uploading: 'Загрузка',
      failed: 'Передача не удалась',
      uploadFailed: 'Загрузка не удалась',
      stalled: 'Передача зависла. Проверьте соединение и повторите попытку.',
      canceled: 'Загрузка отменена',
      downloadCanceled: 'Скачивание отменено',
      cancel: 'Отмена',
      remoteFailed: 'Не удалось скачать удаленный ISO',
      sha256Placeholder: 'Введите контрольную сумму SHA-256 из 64 символов',
      invalidSHA256: 'SHA-256 должен быть шестнадцатеричной строкой из 64 символов',
      checksumFailed: 'Ошибка загрузки: проверка SHA-256 не пройдена'
    },
    power: {
      title: 'Питание',
      showConfirm: 'Подтверждение',
      showConfirmTip: 'Если включено, операции с питанием потребуют дополнительного подтверждения',
      reset: 'Экстренная перезагрузка',
      resetConfirm: 'Вы уверены, что хотите выполнить экстренную перезагрузку?',
      powerConfirm: 'Вы уверены, что хотите нажать кнопку питания?',
      okBtn: 'Да',
      cancelBtn: 'Нет'
    },
    settings: {
      title: 'Настройки',
      about: {
        title: 'О системе NanoKVM',
        information: 'Информация',
        ip: 'IP-адрес',
        mdns: 'Доменное имя mDNS',
        application: 'Версия ПО',
        applicationTip: 'Версия веб-программы NanoKVM',
        image: 'Версия прошивки',
        imageTip: 'Версия системного образа NanoKVM',
        uptime: 'Время работы',
        community: 'Сообщество',
        hostname: 'Имя хоста',
        hostnameUpdated:
          'Имя хоста изменено. Перезагрузите NanoKVM, чтобы настройки вступили в силу.',
        ipType: {}
      },
      appearance: {
        title: 'Внешний вид',
        display: 'Отображение',
        language: 'Язык',
        languageDesc: 'Выбор языка интерфейса',
        webTitle: 'Заголовок страницы',
        webTitleDesc: 'Изменить заголовок страницы',
        layoutMode: 'Режим интерфейса',
        layoutModeDesc: 'Использовать мобильный/touch-интерфейс в этом браузере',
        layoutAuto: 'Авто',
        layoutMobile: 'Мобильный вид',
        menuBar: {
          title: 'Строка меню',
          mode: 'Режим отображения',
          modeDesc: 'Отображение строки меню на экране',
          modeAuto: 'Автоматическое скрытие',
          modeAlways: 'Всегда виден',
          keyboardLedStatus: 'Индикаторы блокировки клавиатуры',
          keyboardLedStatusDesc:
            'Показывать состояние Num Lock, Caps Lock и Scroll Lock удалённого компьютера',
          icons: 'Значки подменю',
          iconsDesc: 'Отображение значков подменю в строке меню',
          terminalWarningTitle: 'Включить веб-терминал?',
          terminalWarningDesc:
            'Терминал открывает root shell через браузер. Включайте его только в доверенной сети и выключайте после использования.',
          terminalWarningConfirm: 'Включить',
          terminalWarningCancel: 'Отмена',
          remoteDownload: 'Удаленное скачивание ISO',
          remoteDownloadWarningTitle: 'Включить удаленное скачивание ISO?',
          remoteDownloadWarningDesc:
            'NanoKVM скачает ISO по URL и запишет его в /data. Включайте это только для доверенных ссылок и выключайте после использования.',
          remoteDownloadWarningConfirm: 'Включить',
          remoteDownloadWarningCancel: 'Отмена'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Состояние блокировок удалённой клавиатуры',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        unknown: 'Неизвестно'
      },
      device: {
        title: 'Устройство',
        oled: {
          title: 'OLED экран',
          description: 'Автоматическое отключение OLED экрана'
        },
        ssh: {
          description: 'Включить удаленный доступ по SSH'
        },
        swap: {
          title: 'Файл подкачки',
          description: 'Задать размер файла подкачки'
        },
        mouseJiggler: {
          description: 'Включите данную опцию, если хост засыпает',
          disable: 'Отключить',
          absolute: 'Абсолютный режим',
          relative: 'Относительный режим'
        },
        sessionLock: {
          title: 'Блокировать сессию при бездействии',
          description: 'Повторный вход потребуется после этого времени без активности'
        },
        mdns: {
          description: 'Включить сервис обнаружения mDNS',
          tip: 'Позволяет обращаться к устройству по имени .local. Не нужно, если вы подключаетесь по IP-адресу или ваш DNS уже разрешает имя хоста.'
        },
        hdmi: {
          description: 'Включить HDMI/выход монитора',
          idleTimeoutTitle: 'Тайм-аут неактивного захвата',
          idleTimeoutDescription: 'Остановить захват HDMI, если активных зрителей нет в течение'
        },
        hidOnly: 'Режим только HID',
        disk: 'Виртуальный диск',
        networkCancelMount:
          'Изменение виртуальной сети перезапускает USB-подключение. Это отменит смонтированный образ и включит виртуальный диск. Продолжить?',
        network: 'Виртуальная сеть',
        networkDesc: 'Смонтировать виртуальное сетевое устройство на удаленном хосте',
        usbWakeup: 'Пробуждение по USB',
        reboot: 'Перезагрузка',
        rebootDesc: 'Вы уверены, что хотите перезагрузить NanoKVM?'
      },
      network: {
        title: 'Сеть',
        wifi: {
          title: 'Wi-Fi',
          description: 'Настройка Wi-Fi',
          apMode: 'Режим AP включен, подключитесь к Wi-Fi, отсканировав QR-код',
          connect: 'Подключить Wi-Fi',
          connectDesc1: 'Введите SSID сети и пароль',
          disconnect: 'Вы уверены, что хотите отключить сеть?',
          ssid: 'Имя',
          password: 'Пароль',
          joinBtn: 'Подключить',
          cancelBtn: 'Отмена'
        },
        tls: {
          description: 'Включить протокол HTTPS',
          rebootTitle: 'NanoKVM будет перезагружен',
          rebootDesc:
            'Смена протокола требует перезагрузки устройства. Браузер перейдет на новый адрес через {{seconds}} секунд:',
          rebootOk: 'Применить и перезагрузить',
          rebootCancel: 'Отмена'
        },
        dns: {
          title: 'DNS',
          description: 'Настройка DNS-серверов для NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Настройка IPv4-адресации для проводного интерфейса',
          dhcp: 'DHCP',
          manual: 'Вручную',
          apply: 'Применить',
          invalid: 'Введите допустимый IPv4- или IPv6-адрес',
          invalidNetwork: 'Введите допустимый IPv4-адрес, маску подсети и маршрутизатор',
          saved: 'Настройки DNS сохранены',
          redirecting: 'Настройки сети сохранены. Открываю новый адрес...',
          saveFailed: 'Не удалось сохранить настройки DNS',
          unsaved: 'Несохраненные изменения',
          maxServers: 'Разрешено не более {{count}} DNS-серверов',
          dhcpServersDescription: 'DNS-серверы автоматически получаются от DHCP',
          interface: 'Интерфейс',
          ipAddress: 'IP-адрес',
          subnetMask: 'Маска подсети',
          router: 'Маршрутизатор'
        },
        ipv6: {
          title: 'IPv6',
          description: 'Настройка IPv6 для проводного интерфейса',
          disabled: 'Отключен',
          slaac: 'SLAAC',
          dhcpv6: 'DHCPv6',
          manual: 'Вручную',
          interface: 'Интерфейс',
          state: 'Состояние',
          router: 'Маршрутизатор',
          addresses: 'Адреса',
          dhcpv6Client: 'DHCPv6-клиент',
          notInstalled: 'Не установлен',
          ipAddress: 'IPv6-адрес',
          prefix: 'Префикс',
          invalidManual: 'Введите допустимый IPv6-адрес, префикс и маршрутизатор',
          clientMissing:
            'DHCPv6-клиент не установлен. Сначала установите соответствующее raw-обновление системы.',
          saved: 'Настройки IPv6 сохранены',
          saveFailed: 'Не удалось сохранить настройки IPv6',
          unsaved: 'Несохраненные изменения'
        }
      },
      system: {
        title: 'Система',
        sections: {
          time: 'Время',
          firewall: 'Firewall'
        },
        time: {
          saveFailed: 'Не удалось сохранить настройки времени',
          saved: 'Настройки времени сохранены',
          syncFailed: 'Не удалось синхронизировать время',
          synced: 'Время синхронизировано',
          invalidServers: 'Введите хотя бы один NTP-сервер',
          maxServers: 'Разрешено не более {{count}} NTP-серверов',
          refresh: 'Обновить',
          syncNow: 'Синхронизировать',
          save: 'Сохранить',
          ntp: {
            title: 'NTP',
            description: 'Синхронизация времени устройства через заданные NTP-серверы'
          },
          clock: {
            title: 'Часы',
            description: 'Часовой пояс используется логами и интерфейсом',
            current: 'Текущее время',
            timezone: 'Часовой пояс'
          },
          servers: {
            title: 'NTP-серверы',
            useRouter: 'Использовать роутер',
            useDefaults: 'По умолчанию',
            routerDetected: 'Обнаружен роутер: {{gateway}}'
          }
        },
        firewall: {
          saveFailed: 'Не удалось применить настройки firewall',
          saved: 'Настройки firewall применены',
          cancel: 'Отмена',
          refresh: 'Обновить',
          mode: {
            title: 'Режим firewall',
            current: 'Текущий',
            default: 'Дефолтный',
            localOnly: 'Только local-use',
            httpsRequiredTag: 'Нужен HTTPS',
            outboundOpen: 'Исходящие открыты',
            outboundLimited: 'Исходящие ограничены',
            httpsOnly: 'Только HTTPS'
          },
          moderate: {},
          restricted: {},
          paranoid: {},
          baseline: {
            confirmDesc:
              'Firewall service останется активен, но local-only ограничение source ranges будет снято. Публичные source ranges смогут достучаться до открытых сервисов NanoKVM, если сеть их маршрутизирует.'
          },
          rules: {
            title: 'Текущие правила',
            empty: 'Правил нет'
          }
        }
      },
      systemLog: {
        saveFailed: 'Не удалось сохранить настройки логирования',
        saved: 'Настройки логирования сохранены',
        invalidHost: 'Введите адрес syslog-сервера',
        logLoadFailed: 'Не удалось загрузить логи',
        save: 'Сохранить',
        test: 'Отправить тест',
        testSent: 'Тестовая запись отправлена',
        testFailed: 'Не удалось отправить тестовую запись',
        remote: {
          host: 'Сервер',
          port: 'Порт'
        },
        local: {
          priority: 'Минимальный уровень',
          buffer: 'Размер буфера',
          rotations: 'Ротации',
          compact: 'Компактный вывод',
          stripTimestamps: 'Убирать timestamp'
        },
        kernel: {
          consoleLevel: 'Уровень консоли'
        },
        viewer: {
          title: 'System Log',
          refresh: 'Обновить',
          empty: 'Записей нет'
        },
        level: {
          1: '1 - Alert',
          2: '2 - Critical',
          3: '3 - Error',
          4: '4 - Warning',
          5: '5 - Notice',
          6: '6 - Info',
          7: '7 - Debug',
          8: '8 - Все'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Оптимизация памяти',
          tip: 'Когда использование ОЗУ выходит за пределы, очистка мусора происходит более агрессивно, дабы попытаться освободить память. Рекомендуется задать на 50MB при использовании Tailscale. Перезагрузка Tailscale рекомендуется для вступления данной настройки в силу.'
        },
        swap: {
          title: 'Подмена памяти',
          tip: 'Если после включения оптимизации памяти проблемы сохраняются, попробуйте включить подкачку памяти. При этом размер файла подкачки по умолчанию устанавливается равным 256MB, который можно настроить в «Настройки > Устройство».'
        },
        restart: 'Вы уверены что хотите перезагрузить Tailscale?',
        stop: 'Вы уверены что хотите остановить Tailscale?',
        loading: 'Загрузка...',
        install: 'Установить',
        installing: 'Установка',
        failed: 'Не удалось установить',
        download: 'Скачайте',
        package: 'установочный пакет',
        unzip: 'и разархивируйте его',
        upTailscale: 'Переместите tailscale в каталог /usr/bin/ на NanoKVM',
        upTailscaled: 'Переместите tailscaled в каталог /usr/sbin/ на NanoKVM',
        refresh: 'Обновите текущую страницу',
        notRunning: 'Tailscale не работает. Пожалуйста, начните, чтобы продолжить.',
        run: 'Старт',
        notLogin: 'Устройство не привязано. Войдите, чтобы привязать его к аккаунту.',
        urlPeriod: 'Этот адрес действителен в течение 10 минут',
        login: 'Войти',
        loginSuccess: 'Вход выполнен',
        deviceName: 'Имя устройства',
        deviceIP: 'IP адрес устройства',
        account: 'Аккаунт',
        logout: 'Выход',
        logoutDesc: 'Вы действительно хотите выйти?',
        uninstall: 'Удалить Tailscale',
        uninstallDesc: 'Вы уверены, что хотите удалить Tailscale?',
        okBtn: 'Да',
        cancelBtn: 'Нет'
      },
      update: {
        title: 'Проверить обновления',
        queryFailed: 'Получить версию не удалось',
        updateFailed: 'Обновление не удалось. Пожалуйста, попробуйте еще раз.',
        paranoidBlockedDesc:
          'Проверки GitHub и скачивание требуют исходящий доступ. Offline upload и установка уже подготовленных обновлений остаются доступны.',
        isLatest: 'У вас уже последняя версия.',
        available: 'Доступно обновление. Вы уверены, что хотите обновить?',
        updating: 'Начато обновление. Пожалуйста, подождите...',
        confirm: 'Подтвердить',
        cancel: 'Отмена',
        preview: 'Ранние обновления',
        previewChannels: 'Управляет preview-каналами приложения и системы',
        application: {
          title: 'Обновление приложения'
        },
        system: {
          queryFailed: 'Получить версию системы не удалось',
          requiredAppVersion: 'Требуемая версия приложения',
          downloadFailed: 'Скачать или проверить обновление не удалось',
          rawEnable: 'Разрешить raw-обновления системы',
          rawEnableConfirmTitle: 'Разрешить raw-обновления системы?',
          rawEnableConfirmDesc:
            'Raw-обновление может заменить разделы boot и rootfs. Включайте это только если есть физический доступ для восстановления.',
          rawInstallDisabled:
            'Это подготовленное обновление пишет raw-разделы SD-карты. Перед установкой включите raw-обновления системы.',
          isLatest: 'Базовая система уже обновлена.',
          available: 'Доступно обновление базовой системы.',
          downloading: 'Скачивание и проверка системного обновления...',
          downloadVerify: 'Скачать и проверить',
          installing: 'Установка подготовленного системного обновления...',
          install: 'Установить',
          installFailed: 'Установка не удалась',
          installConfirmTitle: 'Установить системное обновление?',
          installConfirmDesc:
            'Будут заменены системные файлы из проверенного bundle. После этого потребуется перезагрузка.',
          rawInstallConfirmDesc:
            'Этот проверенный bundle запишет raw-образы boot/rootfs прямо в разделы SD-карты и автоматически перезагрузит устройство. Запись может занять несколько минут; не отключайте питание.',
          rawInstallWarning:
            'Для raw-обновления разделов нет автоматического отката. Если загрузка не пройдет, SD-карту нужно будет восстановить вручную.',
          rebootRequired: 'Для активации этого состояния системы требуется перезагрузка.',
          confirming: 'Подтверждение загрузки системного обновления...',
          confirmBoot: 'Подтвердить загрузку',
          confirmFailed: 'Подтверждение загрузки не удалось',
          confirmed: 'Загрузка подтверждена',
          bootGood: 'Ожидающее системное обновление отмечено как успешно загруженное.',
          rollingBack: 'Откат системного обновления...',
          rollback: 'Откатить',
          rollbackDone: 'Откат подготовлен',
          rollbackFailed: 'Откат не удался',
          rollbackConfirmTitle: 'Откатить системное обновление?',
          rollbackConfirmDesc:
            'Будут восстановлены файлы из последнего backup системного обновления. После этого потребуется перезагрузка.',
          stagedDesc: 'Архив системного обновления скачан и проверен. Теперь его можно установить.',
          refresh: 'Обновить',
          releaseNotes: 'Описание релиза',
          systemVersion: 'Версия системного обновления',
          baseImage: 'Базовый образ',
          buildrootRelease: 'Релиз Buildroot',
          kernel: 'Ядро',
          target: 'Цель',
          latestTarget: 'Цель обновления',
          stagedVersion: 'Подготовленная версия',
          archive: 'Архив',
          requiredFree: 'Нужно свободного места',
          fileCount: 'Файлов',
          rawImages: 'Raw-образы',
          progress: 'Ход операции',
          progressMessage: 'Сообщение',
          pendingVersion: 'Ожидающая версия',
          bootHealth: 'Состояние загрузки',
          healthy: 'В норме',
          unhealthy: 'Требует внимания',
          rollbackBackup: 'Backup для отката'
        },
        offline: {
          title: 'Автономные обновления',
          desc: 'Обновление через локальный установочный пакет',
          upload: 'Загрузить',
          invalidName: 'Неверный формат имени файла. Загрузите выпуски с GitHub.',
          updateFailed: 'Обновление не удалось. Пожалуйста, попробуйте еще раз.'
        }
      },
      account: {
        title: 'Аккаунт',
        webAccount: 'Имя веб-аккаунта',
        password: 'Пароль',
        updateBtn: 'Обновить',
        logoutBtn: 'Выйти',
        logoutDesc: 'Вы действительно хотите выйти?',
        okBtn: 'Да',
        cancelBtn: 'Нет'
      }
    },
    picoclaw: {
      title: 'PicoClaw Ассистент',
      newConversation: 'Новый разговор',
      processing: 'Обработка...',
      agent: {
        defaultTitle: 'Универсальный помощник',
        kvmTitle: 'Удалённое управление',
        switched: 'Роль агента изменена'
      },
      send: 'Отправить',
      cancel: 'Отмена',
      status: {
        connecting: 'Подключение к шлюзу...',
        connected: 'Сеанс PicoClaw подключен',
        disconnected: 'Сеанс PicoClaw отключен',
        stopped: 'Запрос на остановку отправлен',
        runtimeStarted: 'Runtime PicoClaw запущен',
        runtimeStartFailed: 'Не удалось запустить runtime PicoClaw',
        runtimeStopped: 'Runtime PicoClaw остановлен',
        runtimeStopFailed: 'Не удалось остановить runtime PicoClaw'
      },
      connection: {
        runtime: {
          checking: 'Проверка',
          ready: 'Runtime готов',
          stopped: 'Runtime остановлен',
          unavailable: 'Runtime недоступен',
          configError: 'Ошибка конфигурации'
        },
        transport: {
          connecting: 'Подключение',
          connected: 'Подключено'
        },
        run: {
          idle: 'Простой',
          busy: 'Занят'
        }
      },
      message: {
        toolAction: 'Действие',
        observation: 'Наблюдение',
        screenshot: 'Скриншот'
      },
      overlay: {
        locked: 'PicoClaw управляет устройством. Ручной ввод приостановлен.'
      },
      install: {
        install: 'Установить PicoClaw',
        installing: 'Установка PicoClaw',
        success: 'PicoClaw успешно установлен',
        failed: 'Не удалось установить PicoClaw',
        uninstalling: 'Удаление runtime...',
        requiredTitle: 'PicoClaw не установлен',
        requiredDescription: 'Установите PicoClaw перед запуском runtime PicoClaw.',
        progressDescription: 'PicoClaw загружается и устанавливается.',
        stages: {
          preparing: 'Подготовка',
          downloading: 'Загрузка',
          extracting: 'Распаковка',
          verifying: 'Проверка',
          installing: 'Установка',
          installed: 'Установлено',
          install_timeout: 'Время ожидания истекло',
          install_failed: 'Ошибка'
        }
      },
      model: {
        requiredTitle: 'Требуется конфигурация модели',
        requiredDescription: 'Настройте модель PicoClaw перед использованием чата PicoClaw.',
        docsTitle: 'Руководство по настройке',
        docsDesc: 'Поддерживаемые модели и протоколы',
        menuLabel: 'Настройка модели',
        modelIdentifier: 'Идентификатор модели',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API-ключ',
        apiKeyPlaceholder: 'Введите API-ключ модели',
        save: 'Сохранить',
        saving: 'Сохранение',
        invalid: 'Требуются идентификатор модели, API Base URL и API-ключ'
      },
      uninstall: {
        menuLabel: 'Удалить',
        confirmTitle: 'Удалить PicoClaw',
        confirmContent:
          'Вы уверены, что хотите удалить PicoClaw? Это приведет к удалению исполняемого файла и всех файлов конфигурации.',
        confirmOk: 'Удалить'
      },
      history: {
        title: 'История',
        loading: 'Загрузка сеансов...',
        emptyTitle: 'Пока нет истории',
        emptyDescription: 'Здесь появятся предыдущие сеансы PicoClaw.',
        deleteConfirmTitle: 'Удалить сеанс',
        deleteConfirmContent: 'Вы уверены, что хотите удалить «{{title}}»?',
        deleteConfirmOk: 'Удалить',
        messageCount_one: '{{count}} сообщение',
        messageCount_other: '{{count}} сообщения'
      },
      config: {
        startRuntime: 'Запустить PicoClaw',
        stopRuntime: 'Остановить PicoClaw'
      },
      start: {
        title: 'Запустить PicoClaw',
        description: 'Запустите runtime, чтобы начать использовать помощник PicoClaw.'
      }
    },
    error: {
      title: 'У нас возникла проблема',
      refresh: 'Обновить страницу'
    },
    fullscreen: {
      toggle: 'Полноэкранный режим'
    },
    menu: {
      collapse: 'Свернуть меню'
    }
  }
};

export default ru;
