const pl = {
  translation: {
    common: {
      confirm: 'Potwierdź',
      cancel: 'Anuluj',
      delete: 'Usuń',
      actionFailed: 'Operacja nie powiodła się',
      loading: 'Wczytywanie ustawień z urządzenia...',
      loadFailed: 'Nie udało się wczytać ustawień z urządzenia',
      retry: 'Spróbuj ponownie'
    },
    head: {
      desktop: 'Zdalny pulpit',
      login: 'Logowanie',
      changePassword: 'Zmień Hasło',
      terminal: 'Terminal',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Logowanie',
      locked: 'Zbyt wiele loginów, spróbuj ponownie później',
      globalLocked: 'System chroniony, spróbuj ponownie później',
      changePassword: 'Zmień Hasło',
      forgetPassword: 'Zapomiałeś hasła?',
      ok: 'Ok',
      cancel: 'Anuluj',
      loginButtonText: 'Zaloguj się',
      tips: {
        change1: 'Pamiętaj, że ta operacja zmieni następujące hasła:',
        change2: 'Hasło logowania web'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Skonfiguruj Wi-Fi dla NanoKVM',
      invalidMode:
        'Bieżący tryb nie obsługuje konfiguracji sieci. Przejdź do swojego urządzenia i włącz tryb konfiguracji Wi-Fi.',
      confirmBtn: 'Ok',
      finishBtn: 'Zakończono',
      ap: {
        authTitle: 'Wymagane uwierzytelnienie',
        authDescription: 'Aby kontynuować, wprowadź AP hasło',
        authFailed: 'Nieprawidłowe hasło AP',
        passPlaceholder: 'AP hasło',
        verifyBtn: 'Sprawdź'
      }
    },
    screen: {
      scale: 'Skala',
      title: 'Ekran',
      video: 'Tryb wideo',
      resolution: 'Rozdzielczość',
      auto: 'Automatyczny',
      autoTips:
        'W określonych rozdzielczościach może wystąpić rozrywanie ekranu lub przesunięcie myszy. Rozważ dostosowanie rozdzielczości zdalnego hosta lub wyłącz tryb automatyczny.',
      fps: 'FPS',
      customizeFps: 'Personalizuj',
      quality: 'Jakość',
      qualityLossless: 'Bezstratny',
      qualityHigh: 'Wysoki',
      qualityMedium: 'Średni',
      qualityLow: 'Niski',
      frameDetect: 'Wykrywanie klatek',
      frameDetectTip:
        'Obliczanie różnicy między klatkami. Zatrzymaj transmisję strumienia wideo, gdy na ekranie zdalnego hosta nie zostaną wykryte żadne zmiany.',
      resetHdmi: 'Resetuj HDMI',
      webrtcConnectionFailed: {
        title: 'Połączenie WebRTC nie powiodło się'
      },
      captureStatus: {
        hdmiError: 'Błąd obrazu HDMI',
        unsupportedResolution: 'Bieżąca rozdzielczość nie jest obsługiwana',
        retrieving: 'Pobieranie obrazu...',
        changingResolution: 'Przełączanie rozdzielczości...',
        updateFailed: 'Nie można teraz zaktualizować obrazu',
        videoError: 'Błąd wyświetlania wideo',
        noHdmi: 'Nie wykryto sygnału HDMI',
        unavailable: 'Nie można teraz wyświetlić obrazu'
      }
    },
    keyboard: {
      title: 'Klawiatura',
      paste: 'Wklej',
      virtual: 'Klawiatura',
      readClipboard: 'Czytaj ze schowka',
      clipboardPermissionDenied:
        'Odmowa dostępu do schowka. Zezwól na dostęp do schowka w przeglądarce.',
      clipboardReadError: 'Nie udało się odczytać schowka',
      dropdownEnglish: 'Angielski',
      dropdownFrench: 'Francuski',
      dropdownRussian: 'Rosyjski',
      shortcut: {
        title: 'Skróty',
        custom: 'Niestandardowe',
        capture: 'Kliknij tutaj, aby przechwycić skrót',
        save: 'Zapisz'
      },
      leaderKey: {
        title: 'Klawisz Leader',
        howToUse: 'Jak używać',
        simultaneous: {
          title: 'Tryb symultaniczny',
          desc1: 'Naciśnij i przytrzymaj klawisz Leader, a następnie naciśnij skrót.',
          desc2: 'Intuicyjne, ale może kolidować ze skrótami systemowymi.'
        },
        sequential: {
          title: 'Tryb sekwencyjny',
          desc1:
            'Naciśnij klawisz Leader → naciśnij skrót w sekwencji → ponownie naciśnij klawisz Leader.',
          desc2:
            'Wymaga większej liczby kroków, ale całkowicie pozwala uniknąć konfliktów systemowych.'
        },
        enable: 'Włącz klawisz Leader',
        tip: 'Po przypisaniu jako klawisz Leader ten klawisz działa wyłącznie jako wyzwalacz skrótów i traci swoje domyślne zachowanie.',
        placeholder: 'Naciśnij klawisz Leader',
        shiftRight: 'Prawy Shift',
        ctrlRight: 'Prawy Ctrl',
        metaRight: 'Prawy Win',
        recorder: {
          rec: 'NAGR',
          activate: 'Aktywuj klawisze'
        }
      }
    },
    mouse: {
      title: 'Mysz',
      cursor: 'Styl kursora',
      default: 'Domyślny kursor',
      cell: 'Kursor komórki',
      text: 'Kursor tekstowy',
      grab: 'Kursor chwytania',
      mode: 'Tryb myszki',
      absolute: 'Tryb bezwzględny',
      relative: 'Tryb względny',
      direction: 'Kierunek kółka przewijania',
      scrollUp: 'Przewiń w górę',
      scrollDown: 'Przewiń w dół',
      speed: 'Szybkość kółka przewijania',
      fast: 'Szybko',
      slow: 'Powoli',
      requestPointer: 'Korzystanie z trybu względnego. Kliknij pulpit, aby uzyskać wskaźnik myszy.',
      resetHid: 'Zresetuj HID',
      hidOnly: {
        title: 'Tryb tylko HID',
        tip1: 'Włączenie trybu HID-Only spowoduje odmontowanie wirtualnego dysku U i sieci wirtualnej',
        tip2: 'W trybie HID-Only montowanie obrazu jest wyłączone',
        tip3: 'NanoKVM automatycznie uruchomi się ponownie po przełączeniu trybów',
        enable: 'Włącz tryb HID-Only',
        disable: 'Wyłącz tryb HID-Tylko'
      }
    },
    image: {
      title: 'Obrazy',
      loading: 'Ładowanie...',
      empty: 'Nic nie znaleziono',
      mountMode: 'Tryb montowania',
      mountFailed: 'Nie udało się zamontować obrazu',
      unmountFailed: 'Odmontowanie nie powiodło się',
      forceEject: 'Wymuś wysunięcie',
      forceEjectConfirm:
        'Host zablokował napęd optyczny. Wymuszenie wysunięcia na chwilę odłącza wirtualne urządzenie USB, więc klawiatura i mysz mogą na krótko się odłączyć. Kontynuować?',
      tips: {
        title: 'Jak przesłać obrazy',
        usb1: 'Podłącz urządzenie NanoKVM do komputera przez USB.',
        usb3: 'Otwórz dysk wirtualny na swoim komputerze i skopiuj plik obrazu do katalogu głównego dysku wirtualnego.',
        scp1: 'Upewnij się że NanoKVM i twój komputer są na tej samej sieci lokalnej.',
        scp2: 'Otwórz terminal na komputerze i użyj komendę SCP aby przesłać obraz do katalogu /data na NanoKVM.',
        scp3: 'Przykład: scp lokalizacja-zrodlowego-obrazu root@ip-twojego-nanokvm:/data',
        tfCard: 'Karta SD',
        tf1: 'Ta metoda jest obsługiwana w systemie Linux',
        tf3: 'Włóż kartę SD do czytnika kart i podłącz do twojego komputera.',
        tf4: 'Kopjuj obraz do katalogu /data na karcie SD.',
        tf5: 'Włóż kartę SD do NanoKVM.'
      }
    },
    script: {
      title: 'Skrypty',
      upload: 'Prześlij',
      run: 'Uruchom',
      runFailed: 'Uruchomienie nie powiodło się',
      delDesc: 'Czy na pewno chcesz usunąć ten plik?',
      delete: 'Usuń',
      close: 'Zamknij'
    },
    terminal: {
      title: 'Terminal',
      nanokvm: 'Terminal NanoKVM',
      serial: 'Terminal portu szeregowego',
      serialPort: 'Port szeregowy',
      serialPortPlaceholder: 'Wprowadź port szeregowy',
      baudrate: 'Szybkość transmisji',
      parity: 'Kontrola parzystości',
      parityNone: 'Brak kontroli',
      parityEven: 'Parzysta',
      parityOdd: 'Nieparzysta',
      flowControl: 'Kontrola przepływu',
      flowControlNone: 'Brak kontroli',
      flowControlSoft: 'Programowe',
      flowControlHard: 'Sprzętowe',
      dataBits: 'Bity danych',
      stopBits: 'Bity stopu'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'Wysyłanie komendy...',
      sent: 'Komenda wysłana',
      input: 'Wprowadź numer adresu MAC',
      ok: 'Ok'
    },
    download: {
      title: 'Narzędzie do pobierania obrazów',
      input: 'Proszę wprowadzić zdalny obraz URL',
      ok: 'Ok',
      mountedImage:
        'Ten obraz jest zamontowany. Odmontuj go przed przesłaniem pliku o tej samej nazwie.',
      uploadbox: 'Upuść plik tutaj lub kliknij, aby wybrać',
      NoISO: 'Brak ISO',
      sha256Placeholder: 'Wprowadź 64-znakową sumę kontrolną SHA-256',
      invalidSHA256: 'SHA-256 musi być 64-znakowym ciągiem szesnastkowym',
      checksumFailed: 'Pobieranie nie powiodło się: weryfikacja SHA-256 nie powiodła się'
    },
    power: {
      title: 'Zasilanie',
      showConfirm: 'Potwierdzenie',
      showConfirmTip: 'Operacje zasilania wymagają dodatkowego potwierdzenia',
      reset: 'Resetuj',
      resetConfirm: 'Kontynuować operację resetowania?',
      okBtn: 'Tak',
      cancelBtn: 'Nie'
    },
    settings: {
      title: 'Ustawienia',
      about: {
        title: 'NanoKVM - informacje',
        information: 'Informacje o systemie',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Wersja oprogramowania',
        applicationTip: 'Wersja aplikacji web NanoKVM',
        community: 'Społeczność',
        hostname: 'Nazwa hosta',
        hostnameReboot: 'Uruchomić ponownie, aby zastosować nową nazwę hosta?',
        ipType: {}
      },
      appearance: {
        title: 'Wygląd',
        display: 'Ekran',
        language: 'Język',
        languageDesc: 'Wybierz język interfejsu',
        webTitle: 'Tytuł strony internetowej',
        webTitleDesc: 'Dostosuj tytuł strony internetowej',
        menuBar: {
          title: 'Pasek menu',
          mode: 'Tryb wyświetlania',
          modeDesc: 'Wyświetl pasek menu na ekranie',
          modeOff: 'Wyłączone',
          modeAuto: 'Automatyczne ukrywanie',
          modeAlways: 'Zawsze widoczny',
          keyboardLedStatus: 'Wskaźniki blokad klawiatury',
          keyboardLedStatusDesc:
            'Wyświetl stan Num Lock, Caps Lock i Scroll Lock zdalnego komputera',
          icons: 'Ikony podmenu',
          iconsDesc: 'Wyświetla ikony podmenu na pasku menu'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Stan blokad zdalnej klawiatury',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'Włączone',
        off: 'Wyłączone',
        unknown: 'Nieznany'
      },
      device: {
        title: 'Urządzenie',
        oled: {
          title: 'OLED'
        },
        ssh: {
          description: 'Włącz SSH zdalny dostęp'
        },
        swap: {
          title: 'Zamień',
          description: 'Ustaw rozmiar pliku wymiany'
        },
        mouseJiggler: {
          title: 'Jiggler myszy',
          description: 'Uniemożliwia uśpienie zdalnego hosta',
          disable: 'Wyłącz',
          absolute: 'Tryb absolutny',
          relative: 'Tryb względny'
        },
        mdns: {
          description: 'Włącz usługę wykrywania mDNS',
          tip: 'Wyłączanie, jeśli nie jest potrzebne'
        },
        hdmi: {
          description: 'Włącz HDMI/wyjście monitora',
          idleTimeoutTitle: 'Limit czasu bezczynności przechwytywania',
          idleTimeoutDescription: 'Zatrzymaj przechwytywanie HDMI po czasie bez aktywnych widzów:'
        },
        hidOnly: 'HID – tylko tryb',
        disk: 'Dysk wirtualny',
        network: 'Sieć wirtualna',
        networkDesc: 'Zamontuj wirtualną kartę sieciową na zdalnym hoście',
        reboot: 'Uruchom ponownie',
        rebootDesc: 'Czy na pewno chcesz ponownie uruchomić NanoKVM?'
      },
      network: {
        title: 'Sieć',
        wifi: {
          title: 'Wi-Fi',
          description: 'Skonfiguruj Wi-Fi',
          apMode: 'Tryb AP jest włączony, połącz z Wi-Fi skanując kod QR',
          connect: 'Połącz Wi-Fi',
          connectDesc1: 'Wprowadź SSID sieci i hasło',
          disconnect: 'Czy na pewno chcesz rozłączyć sieć?',
          ssid: 'Nazwa',
          password: 'Hasło',
          joinBtn: 'Połącz',
          cancelBtn: 'Anuluj'
        },
        tls: {
          description: 'Włącz protokół HTTPS'
        },
        dns: {
          title: 'DNS',
          description: 'Skonfiguruj serwery DNS dla NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Skonfiguruj adresację IPv4 dla interfejsu przewodowego',
          dhcp: 'DHCP',
          manual: 'Ręcznie',
          apply: 'Zastosuj',
          invalid: 'Wprowadź prawidłowy adres IPv4 lub IPv6',
          invalidNetwork: 'Wprowadź prawidłowy adres IPv4, maskę podsieci i router',
          saved: 'Ustawienia DNS zapisane',
          redirecting: 'Ustawienia sieci zapisane. Otwieranie nowego adresu...',
          saveFailed: 'Nie udało się zapisać ustawień DNS',
          unsaved: 'Niezapisane zmiany',
          maxServers: 'Dozwolone jest maksymalnie {{count}} serwerów DNS',
          dhcpServersDescription: 'Serwery DNS są automatycznie pobierane z DHCP',
          interface: 'Interfejs',
          ipAddress: 'Adres IP',
          subnetMask: 'Maska podsieci',
          router: 'Router'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Optymalizacja pamięci'
        },
        swap: {
          title: 'Zamień pamięć',
          tip: 'Jeśli po włączeniu optymalizacji pamięci problemy nadal występują, spróbuj włączyć pamięć wymiany. Spowoduje to ustawienie domyślnego rozmiaru pliku wymiany na 256MB, który można dostosować w „Ustawienia > Urządzenie”.'
        },
        loading: 'Ładowanie...',
        install: 'Instaluj',
        installing: 'Instalowanie',
        failed: 'Instalowanie nie powiodło się',
        download: 'Pobierz',
        package: 'pakiet instalacyjny',
        unzip: 'i wypakuj pliki',
        upTailscale: 'Prześlij tailscale do NanoKVM w katalogu /usr/bin/',
        upTailscaled: 'Prześlij tailscaled do NanoKVM w katalogu /usr/sbin/',
        refresh: 'Odśwież obecną stronę',
        notRunning: 'Tailscale nie działa. Rozpocznij, aby kontynuować.',
        run: 'Rozpocznij',
        notLogin:
          'Urządzenie nie zostało jeszcze powiązane. Zaloguj się i powiąż to urządzenie ze swoim kontem.',
        urlPeriod: 'Ten URL jest ważny przez 10 minut',
        login: 'Zaloguj',
        loginSuccess: 'Zalogowanie pomyślne',
        deviceName: 'Nazwa urządzenia',
        deviceIP: 'Adres IP urządzenia',
        account: 'Konto',
        logout: 'Wyloguj',
        logoutDesc: 'Czy na pewno chcesz się wylogować?',
        uninstall: 'Odinstaluj Tailscale',
        uninstallDesc: 'Czy na pewno chcesz odinstalować Tailscale?'
      },
      update: {
        title: 'Sprawdź aktualizacje',
        queryFailed: 'Uzyskanie wersji nie powiodło się',
        updateFailed: 'Aktualizacja nie powiodła się. Spróbuj ponownie.',
        isLatest: 'Oprogramowanie jest aktualne.',
        available: 'Aktualizacja jest dostępna. Czy na pewno chcesz dokonać aktualizacji?',
        confirm: 'Potwierdź',
        cancel: 'Anuluj',
        preview: 'Podgląd aktualizacji',
        offline: {
          title: 'Aktualizacje offline',
          desc: 'Aktualizacja poprzez lokalny pakiet instalacyjny',
          upload: 'Prześlij',
          updateFailed: 'Aktualizacja nie powiodła się. Spróbuj ponownie.'
        }
      },
      account: {
        title: 'Konto',
        webAccount: 'Nazwa konta web',
        password: 'Hasło',
        updateBtn: 'Update',
        logoutBtn: 'Wyloguj',
        logoutDesc: 'Czy na pewno chcesz się wylogować?',
        okBtn: 'Tak',
        cancelBtn: 'Nie'
      }
    },
    picoclaw: {
      title: 'PicoClaw Asystent',
      inputPlaceholder: 'Opisz, co chcesz, aby PicoClaw zrobił',
      newConversation: 'Nowa rozmowa',
      processing: 'Przetwarzanie...',
      agent: {
        defaultTitle: 'Asystent ogólny',
        kvmTitle: 'Zdalne sterowanie',
        switched: 'Rola agenta została zmieniona',
        switchFailed: 'Nie udało się zmienić roli agenta'
      },
      send: 'Wyślij',
      cancel: 'Anuluj',
      status: {
        connecting: 'Łączenie z bramką...',
        connected: 'Sesja PicoClaw połączona',
        disconnected: 'Sesja PicoClaw zamknięta',
        stopped: 'Wysłano żądanie zatrzymania',
        runtimeStarted: 'Runtime PicoClaw uruchomiony',
        runtimeStartFailed: 'Nie udało się uruchomić runtime PicoClaw',
        runtimeStopped: 'Runtime PicoClaw zatrzymany',
        runtimeStopFailed: 'Nie udało się zatrzymać runtime PicoClaw'
      },
      connection: {
        runtime: {
          checking: 'Sprawdzam',
          ready: 'Runtime gotowy',
          stopped: 'Runtime zatrzymany',
          unavailable: 'Runtime niedostępny',
          configError: 'Błąd konfiguracji'
        },
        transport: {
          connecting: 'Łączenie',
          connected: 'Połączono'
        },
        run: {
          idle: 'Bezczynność',
          busy: 'Zajęty'
        }
      },
      message: {
        toolAction: 'Akcja',
        observation: 'Obserwacja',
        screenshot: 'Zrzut ekranu'
      },
      overlay: {
        locked: 'PicoClaw steruje urządzeniem. Wprowadzanie ręczne zostało wstrzymane.'
      },
      install: {
        install: 'Zainstaluj PicoClaw',
        installing: 'Instalowanie PicoClaw',
        success: 'PicoClaw zainstalowano pomyślnie',
        failed: 'Nie udało się zainstalować PicoClaw',
        uninstalling: 'Odinstalowywanie runtime...',
        requiredTitle: 'PicoClaw nie jest zainstalowany',
        requiredDescription: 'Zainstaluj PicoClaw przed uruchomieniem runtime PicoClaw.',
        progressDescription: 'PicoClaw jest pobierany i instalowany.',
        stages: {
          preparing: 'Przygotowanie',
          downloading: 'Pobieranie',
          extracting: 'Wypakowywanie',
          verifying: 'Weryfikowanie',
          installing: 'Instalowanie',
          installed: 'Zainstalowano',
          install_timeout: 'Upłynął limit czasu',
          install_failed: 'Niepowodzenie'
        }
      },
      model: {
        requiredTitle: 'Wymagana jest konfiguracja modelu',
        requiredDescription: 'Skonfiguruj model PicoClaw przed użyciem czatu PicoClaw.',
        docsTitle: 'Przewodnik konfiguracji',
        docsDesc: 'Obsługiwane modele i protokoły',
        menuLabel: 'Skonfiguruj model',
        modelIdentifier: 'Identyfikator modelu',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'Klucz API',
        apiKeyPlaceholder: 'Wprowadź klucz API modelu',
        save: 'Zapisz',
        saving: 'Zapisywanie',
        saved: 'Konfiguracja modelu została zapisana',
        saveFailed: 'Nie udało się zapisać konfiguracji modelu',
        invalid: 'Identyfikator modelu, API Base URL i klucz API są wymagane'
      },
      uninstall: {
        menuLabel: 'Odinstaluj',
        confirmTitle: 'Odinstaluj PicoClaw',
        confirmContent:
          'Czy na pewno chcesz odinstalować PicoClaw? Spowoduje to usunięcie pliku wykonywalnego i wszystkich plików konfiguracyjnych.',
        confirmOk: 'Odinstaluj'
      },
      history: {
        title: 'Historia',
        loading: 'Ładowanie sesji...',
        emptyTitle: 'Nie ma jeszcze historii',
        emptyDescription: 'Tutaj pojawią się poprzednie sesje PicoClaw.',
        loadFailed: 'Nie udało się załadować historii sesji',
        deleteFailed: 'Nie udało się usunąć sesji',
        deleteConfirmTitle: 'Usuń sesję',
        deleteConfirmContent: 'Czy na pewno chcesz usunąć „{{title}}”?',
        deleteConfirmOk: 'Usuń',
        messageCount_one: '{{count}} wiadomość',
        messageCount_other: '{{count}} wiadomości'
      },
      config: {
        startRuntime: 'Uruchom PicoClaw',
        stopRuntime: 'Zatrzymaj PicoClaw'
      },
      start: {
        title: 'Uruchom PicoClaw',
        description: 'Uruchom runtime, aby rozpocząć korzystanie z asystenta PicoClaw.'
      }
    },
    error: {
      title: 'Wystąpił problem',
      refresh: 'Odśwież'
    },
    fullscreen: {
      toggle: 'Przełącz tryb pełnoekranowy'
    },
    menu: {
      collapse: 'Zwiń menu'
    }
  }
};

export default pl;
