const cz = {
  translation: {
    common: {
      confirm: 'Potvrdit',
      cancel: 'Zrušit',
      delete: 'Smazat',
      actionFailed: 'Operace se nezdařila',
      loading: 'Načítání nastavení ze zařízení...',
      loadFailed: 'Nastavení se ze zařízení nepodařilo načíst',
      retry: 'Zkusit znovu'
    },
    head: {
      desktop: 'Vzdálená plocha',
      login: 'Přihlášení',
      changePassword: 'Změna hesla',
      terminal: 'Terminál',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Přihlášení',
      placeholderUsername: 'Zadejte prosím uživatelské jméno',
      placeholderPassword: 'Zadejte prosím heslo',
      placeholderPassword2: 'Zadejte prosím heslo znovu',
      noEmptyUsername: 'Uživatelské jméno nesmí být prázdné',
      noEmptyPassword: 'Heslo nesmí být prázdné',
      invalidUser: 'Neplatné uživatelské jméno nebo heslo',
      locked: 'Příliš mnoho přihlášení, zkuste to znovu později',
      globalLocked: 'Systém je chráněn, zkuste to znovu později',
      error: 'Neočekávaná chyba',
      changePassword: 'Změnit heslo',
      differentPassword: 'Hesla se neshodují',
      illegalUsername: 'Uživatelské jméno obsahuje nepovolené znaky',
      forgetPassword: 'Zapomenuté heslo',
      ok: 'OK',
      cancel: 'Zrušit',
      loginButtonText: 'Přihlášení',
      tips: {
        change1: 'Upozorňujeme, že tato akce změní následující hesla:',
        change2: 'Heslo pro webové přihlášení'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Nastavit Wi-Fi pro NanoKVM',
      invalidMode:
        'Aktuální režim nepodporuje nastavení sítě. Přejděte do svého zařízení a povolte konfigurační režim Wi-Fi.',
      confirmBtn: 'Ok',
      finishBtn: 'Dokončeno',
      ap: {
        authTitle: 'Vyžaduje se ověření',
        authDescription: 'Pokračujte zadáním hesla AP',
        authFailed: 'Neplatné heslo AP',
        passPlaceholder: 'AP heslo',
        verifyBtn: 'Ověřte'
      }
    },
    screen: {
      scale: 'Měřítko',
      title: 'Obrazovka',
      video: 'Režim videa',
      resolution: 'Rozlišení',
      auto: 'Automatické',
      autoTips:
        'Může docházet k trhání obrazu nebo posunu myši při určitých rozlišeních. Zvažte úpravu rozlišení vzdáleného hostitele nebo vypněte automatický režim.',
      fps: 'FPS',
      customizeFps: 'Přizpůsobit',
      quality: 'Kvalita',
      qualityLossless: 'Bezeztrátový',
      qualityHigh: 'Vysoký',
      qualityMedium: 'Střední',
      qualityLow: 'Nízký',
      frameDetect: 'Detekce snímků',
      frameDetectTip:
        'Vypočítá rozdíl mezi snímky. Přenos video streamu se zastaví, pokud nejsou detekovány změny na obrazovce vzdáleného hostitele.',
      resetHdmi: 'Resetovat HDMI',
      webrtcConnectionFailed: {
        title: 'Připojení WebRTC se nezdařilo'
      },
      captureStatus: {
        hdmiError: 'Chyba obrazu HDMI',
        unsupportedResolution: 'Aktuální rozlišení není podporováno',
        retrieving: 'Načítá se obraz...',
        changingResolution: 'Přepíná se rozlišení...',
        updateFailed: 'Obraz se teď nemůže aktualizovat',
        videoError: 'Chyba zobrazení videa',
        noHdmi: 'Nebyl zjištěn signál HDMI',
        unavailable: 'Obraz teď nelze zobrazit'
      }
    },
    keyboard: {
      title: 'Klávesnice',
      paste: 'Vložit',
      tips: 'Podporovány jsou pouze standardní písmena a symboly klávesnice',
      placeholder: 'Zadejte text',
      virtual: 'Klávesnice',
      readClipboard: 'Přečíst ze schránky',
      clipboardPermissionDenied:
        'Oprávnění ke schránce odepřeno. Povolte prosím přístup do schránky ve svém prohlížeči.',
      clipboardReadError: 'Nepodařilo se přečíst schránku',
      shortcut: {
        title: 'Zkratky',
        custom: 'Vlastní',
        save: 'Uložit'
      },
      leaderKey: {
        title: 'Klávesa Leader',
        howToUse: 'Jak používat',
        simultaneous: {
          title: 'Simultánní režim',
          desc1: 'Stiskněte a podržte klávesu Leader a poté stiskněte zkratku.',
          desc2: 'Intuitivní, ale může být v rozporu se systémovými zkratkami.'
        },
        sequential: {
          title: 'Sekvenční režim',
          desc1:
            'Stiskněte klávesu Leader → postupně stiskněte zkratku → znovu stiskněte klávesu Leader.',
          desc2: 'Vyžaduje více kroků, ale zcela se vyhne systémovým konfliktům.'
        },
        enable: 'Povolit klávesu Leader',
        tip: 'Když je tato klávesa nastavena jako klávesa Leader, slouží pouze jako spouštěč zkratek a ztrácí své výchozí chování.',
        placeholder: 'Stiskněte klávesu Leader',
        shiftRight: 'Pravý Shift',
        ctrlRight: 'Pravý Ctrl',
        metaRight: 'Pravý Win',
        recorder: {
          rec: 'REC',
          activate: 'Aktivovat klávesy',
          input: 'Stiskněte prosím zkratku...'
        }
      }
    },
    mouse: {
      title: 'Myš',
      cursor: 'Styl kurzoru',
      default: 'Výchozí kurzor',
      cell: 'Kurzor buňky',
      text: 'Textový kurzor',
      grab: 'Chytnout kurzor',
      hide: 'Skrýt kurzor',
      mode: 'Režim myši',
      absolute: 'Absolutní režim',
      relative: 'Relativní režim',
      direction: 'Směr kolečka',
      scrollUp: 'Přejděte nahoru',
      scrollDown: 'Přejděte dolů',
      speed: 'Rychlost kolečka',
      fast: 'Rychle',
      slow: 'Pomalu',
      requestPointer:
        'Používá se relativní režim. Klikněte prosím na plochu pro získání kurzoru myši.',
      resetHid: 'Resetovat HID',
      hidOnly: {
        title: 'Režim pouze HID',
        tip1: 'Povolení režimu HID-Only odpojí virtuální U-disk a virtuální síť',
        tip2: 'V režimu HID-Only je připojení obrazu zakázáno',
        tip3: 'NanoKVM se po přepnutí režimů automaticky restartuje',
        enable: 'Povolit režim HID-Only',
        disable: 'Zakázat režim HID-Only'
      }
    },
    image: {
      title: 'Obrázky',
      loading: 'Načítání...',
      empty: 'Nic nenalezeno',
      mountMode: 'Režim připojení',
      mountFailed: 'Připojení se nezdařilo',
      unmountFailed: 'Odpojení se nezdařilo',
      forceEject: 'Vynutit vysunutí',
      forceEjectConfirm:
        'Hostitel zamkl optickou jednotku. Vynucené vysunutí na chvíli odpojí virtuální zařízení USB, takže se klávesnice a myš mohou krátce odpojit. Pokračovat?',
      deleteConfirm: 'Opravdu chcete smazat tento obrázek?',
      tips: {
        title: 'Jak nahrát',
        usb1: 'Připojte NanoKVM k vašemu počítači přes USB.',
        usb3: 'Otevřete virtuální disk na vašem počítači a zkopírujte soubor s obrazem do kořenového adresáře virtuálního disku.',
        scp1: 'Ujistěte se, že jsou NanoKVM a váš počítač ve stejné místní síti.',
        scp2: 'Otevřete terminál na vašem počítači a použijte příkaz SCP pro nahrání souboru s obrazem do adresáře /data na zařízení NanoKVM.',
        scp3: 'Příklad: scp cesta-k-vašemu-obrazu root@ip-nanokvm:/data',
        tfCard: 'SD Karta',
        tf1: 'Tato metoda je podporována na systémech Linux',
        tf3: 'Vložte SD kartu do čtečky karet a připojte ji k vašemu počítači.',
        tf4: 'Zkopírujte soubor s obrazem do adresáře /data na SD kartě.',
        tf5: 'Vložte SD kartu zpět do NanoKVM.'
      }
    },
    script: {
      upload: 'Nahrát',
      run: 'Spustit',
      runBackground: 'Spustit na pozadí',
      runFailed: 'Spuštění se nezdařilo',
      delDesc: 'Opravdu chcete tento soubor smazat?',
      delete: 'Smazat',
      close: 'Zavřít'
    },
    terminal: {
      title: 'Terminál',
      nanokvm: 'Terminál NanoKVM',
      serial: 'Terminál sériového portu',
      serialPort: 'Sériový port',
      serialPortPlaceholder: 'Zadejte prosím sériový port',
      baudrate: 'Přenosová rychlost',
      parity: 'Parita',
      parityNone: 'Žádné',
      parityEven: 'Sudá',
      parityOdd: 'Lichá',
      flowControl: 'Řízení toku',
      flowControlNone: 'Žádné',
      flowControlSoft: 'Softwarové',
      flowControlHard: 'Hardwarové',
      dataBits: 'Datové bity',
      stopBits: 'Stop bity'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'Odesílání příkazu...',
      sent: 'Příkaz odeslán',
      input: 'Zadejte prosím MAC adresu',
      ok: 'OK'
    },
    download: {
      title: 'Stahovač obrazů',
      input: 'Zadejte prosím vzdálený obrázek URL',
      ok: 'OK',
      mountedImage: 'Tento obraz je připojen. Před nahráním souboru se stejným názvem jej odpojte.',
      uploadbox: 'Přetáhněte soubor sem nebo kliknutím vyberte',
      inputfile: 'Zadejte soubor obrázku',
      NoISO: 'Žádné ISO',
      sha256Placeholder: 'Zadejte 64znakový kontrolní součet SHA-256',
      invalidSHA256: 'SHA-256 musí být 64znakový hexadecimální řetězec',
      checksumFailed: 'Stažení se nezdařilo: ověření SHA-256 selhalo'
    },
    power: {
      title: 'Napájení',
      showConfirm: 'Potvrzení',
      showConfirmTip: 'Výkonové operace vyžadují další potvrzení',
      reset: 'Resetovat',
      resetConfirm: 'Pokračovat v operaci resetování?',
      okBtn: 'Ano',
      cancelBtn: 'Ne'
    },
    settings: {
      title: 'Nastavení',
      about: {
        title: 'O NanoKVM',
        information: 'Informace',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Verze aplikace',
        applicationTip: 'Verze webové aplikace NanoKVM',
        community: 'Komunita',
        hostname: 'Název hostitele',
        hostnameReboot: 'Restartovat, aby se použil nový název hostitele?',
        ipType: {}
      },
      appearance: {
        title: 'Vzhled',
        display: 'Zobrazení',
        language: 'Jazyk',
        languageDesc: 'Vyberte jazyk rozhraní',
        webTitle: 'Název webu',
        webTitleDesc: 'Přizpůsobte název webové stránky',
        menuBar: {
          title: 'Panel nabídek',
          mode: 'Režim zobrazení',
          modeDesc: 'Zobrazení panelu nabídek na obrazovce',
          modeOff: 'Vypnuto',
          modeAuto: 'Automatické skrytí',
          modeAlways: 'Vždy viditelné',
          keyboardLedStatus: 'Indikátory zámku klávesnice',
          keyboardLedStatusDesc:
            'Zobrazit stav Num Lock, Caps Lock a Scroll Lock vzdáleného počítače',
          icons: 'Ikony podnabídky',
          iconsDesc: 'Zobrazení ikon podnabídky na liště nabídek'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Stav zámků vzdálené klávesnice',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'Zapnuto',
        off: 'Vypnuto',
        unknown: 'Neznámé'
      },
      device: {
        title: 'Zařízení',
        oled: {
          title: 'OLED'
        },
        ssh: {
          description: 'Povolit vzdálený přístup SSH'
        },
        swap: {
          title: 'Vyměnit',
          description: 'Nastavte velikost odkládacího souboru'
        },
        mouseJiggler: {
          title: 'Mouse Jiggler',
          description: 'Zabraňte spánku vzdáleného hostitele',
          disable: 'Zakázat',
          absolute: 'Absolutní režim',
          relative: 'Relativní režim'
        },
        mdns: {
          description: 'Povolit službu zjišťování mDNS',
          tip: 'Vypnutí, pokud to není potřeba'
        },
        hdmi: {
          description: 'Povolit výstup HDMI/monitor',
          idleTimeoutTitle: 'Časový limit nečinnosti snímání',
          idleTimeoutDescription: 'Zastavit snímání HDMI po době bez aktivních diváků'
        },
        hidOnly: 'HID-Pouze režim',
        disk: 'Virtuální disk',
        network: 'Virtuální síť',
        networkDesc: 'Připojit virtuální síťovou kartu na vzdáleném hostiteli',
        reboot: 'Restartujte',
        rebootDesc: 'Opravdu chcete restartovat NanoKVM?'
      },
      network: {
        title: 'Síť',
        wifi: {
          title: 'Wi-Fi',
          description: 'Nastavit Wi-Fi',
          apMode: 'Režim AP je povolen, připojte se k Wi-Fi naskenováním QR kódu',
          connect: 'Připojit Wi-Fi',
          connectDesc1: 'Zadejte SSID sítě a heslo',
          disconnect: 'Opravdu chcete síť odpojit?',
          ssid: 'Název',
          password: 'Heslo',
          joinBtn: 'Připojit',
          cancelBtn: 'Zrušit'
        },
        tls: {
          description: 'Povolit protokol HTTPS'
        },
        dns: {
          title: 'DNS',
          description: 'Nastavit DNS servery pro NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Nastavte adresaci IPv4 pro kabelové rozhraní',
          dhcp: 'DHCP',
          manual: 'Ručně',
          apply: 'Použít',
          invalid: 'Zadejte platnou adresu IPv4 nebo IPv6',
          invalidNetwork: 'Zadejte platnou adresu IPv4, masku podsítě a směrovač',
          saved: 'Nastavení DNS uloženo',
          redirecting: 'Nastavení sítě uloženo. Otevírám novou adresu...',
          saveFailed: 'Nastavení DNS se nepodařilo uložit',
          unsaved: 'Neuložené změny',
          maxServers: 'Je povoleno maximálně {{count}} DNS serverů',
          dhcpServersDescription: 'DNS servery jsou automaticky získávány z DHCP',
          interface: 'Rozhraní',
          ipAddress: 'IP adresa',
          subnetMask: 'Maska podsítě',
          router: 'Router'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Optimalizace paměti'
        },
        swap: {
          title: 'Vyměňte paměť',
          tip: 'Pokud problémy přetrvávají i po povolení optimalizace paměti, zkuste povolit odkládací paměť. Tím se ve výchozím nastavení nastaví velikost odkládacího souboru na 256MB, kterou lze upravit v „Nastavení > Zařízení“.'
        },
        loading: 'Načítání...',
        install: 'Nainstalovat',
        installing: 'Instalace probíhá',
        failed: 'Instalace se nezdařila',
        download: 'Stáhnout',
        package: 'instalační balíček',
        unzip: 'a rozbalit ho',
        upTailscale: 'Nahrajte Tailscale do adresáře NanoKVM /usr/bin/',
        upTailscaled: 'Nahrajte Tailscaled do adresáře NanoKVM /usr/sbin/',
        refresh: 'Obnovit stránku',
        notRunning: 'Tailscale neběží. Chcete-li pokračovat, spusťte jej.',
        run: 'Spustit',
        notLogin:
          'Zařízení nebylo dosud spárováno. Přihlaste se prosím a spárujte toto zařízení s vaším účtem.',
        urlPeriod: 'Tento odkaz je platný po dobu 10 minut',
        login: 'Přihlášení',
        loginSuccess: 'Přihlášení úspěšné',
        deviceName: 'Název zařízení',
        deviceIP: 'IP zařízení',
        account: 'Účet',
        logout: 'Odhlásit se',
        logoutDesc: 'Opravdu se chcete odhlásit?',
        uninstall: 'Odinstalovat Tailscale',
        uninstallDesc: 'Opravdu chcete odinstalovat Tailscale?'
      },
      update: {
        title: 'Zkontrolovat aktualizaci',
        queryFailed: 'Nepodařilo se získat verzi',
        updateFailed: 'Aktualizace se nezdařila. Zkuste to prosím znovu.',
        isLatest: 'Máte nejnovější verzi.',
        available: 'Je dostupná aktualizace. Opravdu chcete aktualizovat?',
        updating: 'Aktualizace zahájena. Prosím čekejte...',
        confirm: 'Potvrdit',
        cancel: 'Zrušit',
        preview: 'Náhled aktualizací',
        offline: {
          title: 'Offline aktualizace',
          desc: 'Aktualizace prostřednictvím místního instalačního balíčku',
          upload: 'Nahrát',
          invalidName: 'Neplatný formát souboru. Stáhněte si prosím z vydání GitHubu.',
          updateFailed: 'Aktualizace se nezdařila. Zkuste to prosím znovu.'
        }
      },
      account: {
        title: 'Účet',
        webAccount: 'Název webového účtu',
        password: 'Heslo',
        updateBtn: 'Update',
        logoutBtn: 'Odhlásit',
        logoutDesc: 'Opravdu se chcete odhlásit?',
        okBtn: 'Ano',
        cancelBtn: 'Ne'
      }
    },
    picoclaw: {
      title: 'PicoClaw asistent',
      inputPlaceholder: 'Popište, co chcete, aby PicoClaw dělal',
      newConversation: 'Nová konverzace',
      processing: 'Zpracovává se...',
      agent: {
        defaultTitle: 'Obecný asistent',
        kvmTitle: 'Vzdálené ovládání',
        switched: 'Role agenta změněna',
        switchFailed: 'Přepnutí role agenta se nezdařilo'
      },
      send: 'Odeslat',
      cancel: 'Zrušit',
      status: {
        connecting: 'Připojování k bráně...',
        connected: 'Relace PicoClaw připojena',
        disconnected: 'Relace PicoClaw uzavřena',
        stopped: 'Požadavek na zastavení byl odeslán',
        runtimeStarted: 'Spuštěno běhové prostředí PicoClaw',
        runtimeStartFailed: 'Selhalo spuštění běhového prostředí PicoClaw',
        runtimeStopped: 'Běhové prostředí PicoClaw zastaveno',
        runtimeStopFailed: 'Zastavení běhového prostředí PicoClaw se nezdařilo'
      },
      connection: {
        runtime: {
          checking: 'Kontrola',
          ready: 'Běhové prostředí připraveno',
          stopped: 'Běhové prostředí zastaveno',
          unavailable: 'Běhové prostředí není k dispozici',
          configError: 'Chyba konfigurace'
        },
        transport: {
          connecting: 'Připojování',
          connected: 'Připojeno'
        },
        run: {
          idle: 'Nečinný',
          busy: 'Zaneprázdněn'
        }
      },
      message: {
        toolAction: 'Akce',
        observation: 'Pozorování',
        screenshot: 'Snímek obrazovky'
      },
      overlay: {
        locked: 'PicoClaw ovládá zařízení. Ruční zadávání je pozastaveno.'
      },
      install: {
        install: 'Nainstalovat PicoClaw',
        installing: 'Instalace PicoClaw',
        success: 'PicoClaw úspěšně nainstalováno',
        failed: 'Nepodařilo se nainstalovat PicoClaw',
        uninstalling: 'Odinstalování běhového prostředí...',
        requiredTitle: 'PicoClaw není nainstalováno',
        requiredDescription: 'Nainstalujte PicoClaw před spuštěním běhového prostředí PicoClaw.',
        progressDescription: 'PicoClaw se stahuje a instaluje.',
        stages: {
          preparing: 'Příprava',
          downloading: 'Stahování',
          extracting: 'Extrakce',
          verifying: 'Ověřování',
          installing: 'Instalace probíhá',
          installed: 'Instalováno',
          install_timeout: 'Vypršel časový limit',
          install_failed: 'Selhalo'
        }
      },
      model: {
        requiredTitle: 'Je vyžadována konfigurace modelu',
        requiredDescription: 'Před použitím chatu PicoClaw nakonfigurujte model PicoClaw.',
        docsTitle: 'Průvodce konfigurací',
        docsDesc: 'Podporované modely a protokoly',
        menuLabel: 'Konfigurace modelu',
        modelIdentifier: 'Identifikátor modelu',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'Klíč API',
        apiKeyPlaceholder: 'Zadejte klíč API modelu',
        save: 'Uložit',
        saving: 'Ukládání',
        saved: 'Konfigurace modelu uložena',
        saveFailed: 'Nepodařilo se uložit konfiguraci modelu',
        invalid: 'Identifikátor modelu, API Base URL a klíč API jsou povinné'
      },
      uninstall: {
        menuLabel: 'Odinstalovat',
        confirmTitle: 'Odinstalovat PicoClaw',
        confirmContent:
          'Opravdu chcete odinstalovat PicoClaw? Tím smažete spustitelný soubor a všechny konfigurační soubory.',
        confirmOk: 'Odinstalovat'
      },
      history: {
        title: 'Historie',
        loading: 'Načítání relací...',
        emptyTitle: 'Zatím žádná historie',
        emptyDescription: 'Zde se zobrazí předchozí relace PicoClaw.',
        loadFailed: 'Nepodařilo se načíst historii relace',
        deleteFailed: 'Smazání relace se nezdařilo',
        deleteConfirmTitle: 'Smazat relaci',
        deleteConfirmContent: 'Opravdu chcete smazat "{{title}}"?',
        deleteConfirmOk: 'Smazat',
        messageCount_one: '{{count}} zpráva',
        messageCount_other: '{{count}} zpráv'
      },
      config: {
        startRuntime: 'Spustit PicoClaw',
        stopRuntime: 'Zastavit PicoClaw'
      },
      start: {
        title: 'Spustit PicoClaw',
        description: 'Spusťte běhové prostředí a začněte používat asistenta PicoClaw.'
      }
    },
    error: {
      title: 'Narazili jsme na problém',
      refresh: 'Obnovit'
    },
    fullscreen: {
      toggle: 'Přepnout na celou obrazovku'
    },
    menu: {
      collapse: 'Sbalit nabídku'
    }
  }
};

export default cz;
