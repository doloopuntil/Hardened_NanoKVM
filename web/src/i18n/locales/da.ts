const da = {
  translation: {
    common: {
      confirm: 'Bekræft',
      cancel: 'Annuller',
      delete: 'Slet',
      actionFailed: 'Handlingen mislykkedes',
      loading: 'Indlæser indstillinger fra enheden...',
      loadFailed: 'Indstillingerne kunne ikke indlæses fra enheden',
      retry: 'Prøv igen'
    },
    head: {
      desktop: 'Fjernskrivebord',
      login: 'Log ind',
      changePassword: 'Skift adgangskode',
      terminal: 'Terminal',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Log ind',
      placeholderUsername: 'Indtast brugernavn',
      locked: 'For mange logins, prøv venligst igen senere',
      globalLocked: 'System under beskyttelse, prøv venligst igen senere',
      changePassword: 'Skift adgangskode',
      differentPassword: 'Adgangskoder er ikke ens',
      forgetPassword: 'Glem adgangskode',
      ok: 'OK',
      cancel: 'Annuller',
      loginButtonText: 'Log ind',
      tips: {
        change1: 'Bemærk, at denne handling ændrer følgende adgangskoder:',
        change2: 'Adgangskode til weblogin'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Konfigurer Wi-Fi for NanoKVM',
      invalidMode:
        'Den aktuelle tilstand understøtter ikke netværksopsætning. Gå til din enhed og aktiver Wi-Fi konfigurationstilstand.',
      confirmBtn: 'Ok',
      finishBtn: 'Færdig',
      ap: {
        authTitle: 'Godkendelse påkrævet',
        authDescription: 'Indtast venligst AP adgangskoden for at fortsætte',
        authFailed: 'Ugyldig AP adgangskode',
        passPlaceholder: 'AP adgangskode',
        verifyBtn: 'Bekræft'
      }
    },
    screen: {
      scale: 'Skala',
      title: 'Skærm',
      video: 'Videotilstand',
      resolution: 'Opløsning',
      auto: 'Automatisk',
      autoTips:
        'Screen-tearing eller mouse-offset kan opstå ved enkelte opløsninger. Hvis du oplever dette, kan du prøve at justere fjerncomputerens skærmopløsning eller deaktivere automatisk tilstand.',
      fps: 'FPS',
      customizeFps: 'Tilpas',
      quality: 'Kvalitet',
      qualityLossless: 'Tabsfri',
      qualityHigh: 'Høj',
      qualityMedium: 'Mellem',
      qualityLow: 'Lav',
      frameDetectTip:
        'Beregner forskellen mellem hver frame. Stopper med at sende et video stream hvis der ikke registreres ændringer på fjerncomputerens skærm.',
      resetHdmi: 'Nulstil HDMI',
      webrtcConnectionFailed: {
        title: 'WebRTC-forbindelse mislykkedes'
      },
      captureStatus: {
        hdmiError: 'Fejl i HDMI-billedet',
        unsupportedResolution: 'Den aktuelle opløsning understøttes ikke',
        retrieving: 'Henter skærmbillede...',
        changingResolution: 'Skifter opløsning...',
        updateFailed: 'Skærmbilledet kan ikke opdateres lige nu',
        videoError: 'Fejl i videovisning',
        noHdmi: 'Intet HDMI-signal registreret',
        unavailable: 'Skærmbilledet kan ikke vises lige nu'
      }
    },
    keyboard: {
      title: 'Tastatur',
      paste: 'Indsæt',
      tips: 'Kun standard bogstaver og symboler er understøttet',
      placeholder: 'Indtast tekst',
      submit: 'Send',
      virtual: 'Tastatur',
      readClipboard: 'Læs fra udklipsholder',
      clipboardPermissionDenied:
        'Udklipsholdertilladelse nægtet. Tillad venligst udklipsholderadgang i din browser.',
      clipboardReadError: 'Kunne ikke læse udklipsholderen',
      dropdownEnglish: 'Engelsk',
      dropdownFrench: 'Fransk',
      shortcut: {
        title: 'Genveje',
        custom: 'Brugerdefineret',
        capture: 'Klik her for at fange genvej',
        clear: 'Ryd',
        save: 'Gem'
      },
      leaderKey: {
        title: 'Leader-tast',
        howToUse: 'Sådan bruges',
        simultaneous: {
          title: 'Samtidig tilstand',
          desc1: 'Hold Leader-tasten nede, og tryk derefter på genvejen.',
          desc2: 'Intuitivt, men kan være i konflikt med systemgenveje.'
        },
        sequential: {
          title: 'Sekventiel tilstand',
          desc1:
            'Tryk på Leader-tasten → tryk på genvejen i rækkefølge → tryk på Leader-tasten igen.',
          desc2: 'Kræver flere trin, men undgår fuldstændig systemkonflikter.'
        },
        enable: 'Aktiver Leader-tast',
        tip: 'Når denne tast tildeles som Leader-tast, fungerer den kun som genvejsudløser og mister sin standardfunktion.',
        placeholder: 'Tryk på Leader-tasten',
        shiftRight: 'Højre Shift',
        ctrlRight: 'Højre Ctrl',
        metaRight: 'Højre Win',
        submit: 'Send',
        recorder: {
          rec: 'REC',
          activate: 'Aktiver taster',
          input: 'Tryk på genvejen...'
        }
      }
    },
    mouse: {
      title: 'Mus',
      cursor: 'Markørstil',
      default: 'Standard-markør',
      cell: 'Celle-markør',
      text: 'Tekst-markør',
      grab: 'Grib-markør',
      hide: 'Skjul mus',
      mode: 'Tilstand for mus',
      absolute: 'Absolut tilstand',
      relative: 'Relativ tilstand',
      direction: 'Rullehjulsretning',
      scrollUp: 'Rul op',
      scrollDown: 'Rul ned',
      speed: 'Rullehjulshastighed',
      fast: 'Hurtigt',
      slow: 'Langsomt',
      requestPointer: 'Bruger relativ-tilstand. Klik på skrivebordet for at få musemarkør.',
      resetHid: 'Nulstil HID',
      hidOnly: {
        title: 'Kun HID-tilstand',
        tip1: 'Aktivering af HID-Only-tilstand vil afmontere den virtuelle U-disk og det virtuelle netværk',
        tip2: 'I HID-Only-tilstand er billedmontering deaktiveret',
        tip3: 'NanoKVM genstarter automatisk efter at have skiftet tilstand',
        enable: 'Aktiver HID-kun tilstand',
        disable: 'Deaktiver HID-kun tilstand'
      }
    },
    image: {
      title: 'Diskbilleder',
      empty: 'Ingen fundet',
      mountMode: 'Monteringstilstand',
      mountFailed: 'Montering af diskbillede mislykkedes',
      unmountFailed: 'Afmontering mislykkedes',
      forceEject: 'Skub ud med tvang',
      forceEjectConfirm:
        'Værten har låst det optiske drev. Når du skubber ud med tvang, afbrydes den virtuelle USB-enhed et øjeblik, så tastaturet og musen kortvarigt kan miste forbindelsen. Vil du fortsætte?',
      attention: 'Opmærksomhed påkrævet',
      deleteConfirm: 'Er du sikker på, at du vil slette dette billede?',
      tips: {
        title: 'Sådan uploader du',
        usb1: 'Forbind din NanoKVM til din computer via USB.',
        usb3: 'Åben den virtuelle disk på din computer og kopier diskbilledet til roden af den virtuelle disk.',
        scp1: 'Kontroller at din NanoKVM og din computer er på samme lokale netværk.',
        scp2: 'Åben en terminal på din computer og brug SCP-kommandoen for at uploade diskbilledet til /data mappen på din NanoKVM.',
        scp3: 'Eksempel: scp sti-til-dit-diskbillede root@din-nanokvm-ip:/data',
        tfCard: 'microSD-kort',
        tf1: 'Denne metode er understøttet af Linux systemer',
        tf3: 'Indsæt microSD-kortet i en kortlæser og tilslut den til en computer.',
        tf4: 'Kopier diskbilledet til /data mappen på microSD-kortet.',
        tf5: 'Skub microSD-kortet ud og indsæt microSD-kortet i din NanoKVM.'
      }
    },
    script: {
      title: 'Script',
      upload: 'Upload',
      run: 'Kør',
      runBackground: 'Kør i baggrunden',
      runFailed: 'Kørsel mislykkedes',
      delDesc: 'Er du sikker på at du vil slette denne fil?',
      delete: 'Slet',
      close: 'Luk'
    },
    terminal: {
      title: 'Terminal',
      nanokvm: 'Terminal til NanoKVM',
      serial: 'Terminal til seriel port',
      serialPort: 'Serial port',
      serialPortPlaceholder: 'Angiv seriel port',
      baudrate: 'Baud-hastighed',
      parity: 'Paritet',
      parityNone: 'Ingen',
      parityEven: 'Lige',
      parityOdd: 'Ulige',
      flowControl: 'Flowkontrol',
      flowControlNone: 'Ingen',
      flowControlSoft: 'Software',
      flowControlHard: 'Hardware',
      dataBits: 'Databits',
      stopBits: 'Stopbit',
      confirm: 'OK'
    },
    wol: {
      title: 'Wake-on-LAN',
      sent: 'Wake-on-LAN magic packet sendt',
      input: 'Angiv MAC-adresse',
      ok: 'OK'
    },
    download: {
      title: 'Billedhenter',
      input: 'Indtast venligst et fjernbillede URL',
      ok: 'OK',
      mountedImage: 'Dette image er monteret. Afmontér det, før du uploader en fil med samme navn.',
      uploadbox: 'Slip filen her, eller klik for at vælge',
      inputfile: 'Indtast venligst billedfilen',
      NoISO: 'Ingen ISO',
      sha256Placeholder: 'Indtast en SHA-256-kontrolsum på 64 tegn',
      invalidSHA256: 'SHA-256 skal være en hexadecimal streng på 64 tegn',
      checksumFailed: 'Download mislykkedes: SHA-256-verifikation mislykkedes'
    },
    power: {
      title: 'Tænd/sluk-knap',
      showConfirm: 'Bekræftelse',
      showConfirmTip: 'Strømdrift kræver en ekstra bekræftelse',
      reset: 'Nulstillingsknap',
      resetConfirm: 'Fortsæt med nulstilling?',
      powerConfirm: 'Fortsæt strømdrift?',
      okBtn: 'Ja'
    },
    settings: {
      title: 'Indstillinger',
      about: {
        title: 'Om NanoKVM',
        information: 'Information',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Program version',
        applicationTip: 'Version af NanoKVM-webapplikationen',
        image: 'Firmware version',
        imageTip: 'Version af NanoKVM-systemimaget',
        community: 'Fællesskab',
        hostname: 'Værtsnavn',
        hostnameUpdated: 'Værtsnavn opdateret. Genstart for at anvende.',
        ipType: {}
      },
      appearance: {
        title: 'Udseende',
        display: 'Visning',
        language: 'Sprog',
        languageDesc: 'Vælg sproget til grænsefladen',
        webTitle: 'Webtitel',
        webTitleDesc: 'Tilpas websidens titel',
        menuBar: {
          title: 'Menulinje',
          mode: 'Visningstilstand',
          modeDesc: 'Vis menulinje på skærmen',
          modeOff: 'Fra',
          modeAuto: 'Skjul automatisk',
          modeAlways: 'Altid synlig',
          keyboardLedStatus: 'Tastaturlåseindikatorer',
          keyboardLedStatusDesc:
            'Vis Num Lock-, Caps Lock- og Scroll Lock-status for fjerncomputeren',
          icons: 'Undermenuikoner',
          iconsDesc: 'Vis undermenuikoner i menulinjen'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Status for låse på fjernkeyboard',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'Til',
        off: 'Fra',
        unknown: 'Ukendt'
      },
      device: {
        title: 'Enhed',
        oled: {
          title: 'OLED'
        },
        ssh: {
          description: 'Aktiver SSH fjernadgang'
        },
        swap: {
          title: 'Byt',
          description: 'Indstil swap-filstørrelsen'
        },
        mouseJiggler: {
          title: 'Mus Jiggler',
          description: 'Forhindrer fjernværten i at sove',
          disable: 'Deaktiver',
          absolute: 'Absolut tilstand',
          relative: 'Relativ tilstand'
        },
        mdns: {
          description: 'Aktiver mDNS opdagelsestjeneste',
          tip: 'Slukker den, hvis den ikke er nødvendig'
        },
        hdmi: {
          description: 'Aktiver HDMI/monitor output',
          idleTimeoutTitle: 'Timeout for inaktiv optagelse',
          idleTimeoutDescription: 'Stop HDMI-optagelse efter en periode uden aktive seere på'
        },
        hidOnly: 'HID-Kun tilstand',
        disk: 'Virtuel disk',
        network: 'Virtuelt netværk',
        networkDesc: 'Monter det virtuelle netværkskort på den eksterne vært',
        reboot: 'Genstart',
        rebootDesc: 'Er du sikker på, at du vil genstarte NanoKVM?'
      },
      network: {
        title: 'Netværk',
        wifi: {
          title: 'Wi-Fi',
          description: 'Konfigurer Wi-Fi',
          apMode: 'AP-tilstand er aktiveret, opret forbindelse til Wi-Fi ved at scanne QR-koden',
          connect: 'Tilslut Wi-Fi',
          connectDesc1: 'Indtast netværkets SSID og adgangskode',
          disconnect: 'Er du sikker på, at du vil afbryde netværket?',
          ssid: 'Navn',
          password: 'Adgangskode',
          joinBtn: 'Tilslut',
          cancelBtn: 'Annuller'
        },
        tls: {
          description: 'Aktiver HTTPS-protokol'
        },
        dns: {
          title: 'DNS',
          description: 'Konfigurer DNS-servere til NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Konfigurer IPv4-adressering for det kablede interface',
          dhcp: 'DHCP',
          manual: 'Manuel',
          apply: 'Anvend',
          invalid: 'Indtast en gyldig IPv4- eller IPv6-adresse',
          invalidNetwork: 'Indtast en gyldig IPv4-adresse, undernetmaske og router',
          saved: 'DNS-indstillinger gemt',
          redirecting: 'Netværksindstillinger gemt. Åbner den nye adresse...',
          saveFailed: 'DNS-indstillinger kunne ikke gemmes',
          unsaved: 'Ikke-gemte ændringer',
          maxServers: 'Maksimalt {{count}} DNS-servere er tilladt',
          dhcpServersDescription: 'DNS-servere hentes automatisk fra DHCP',
          interface: 'Grænseflade',
          ipAddress: 'IP-adresse',
          subnetMask: 'Undernetmaske',
          router: 'Router'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Hukommelsesoptimering'
        },
        swap: {
          title: 'Skift hukommelse',
          tip: 'Hvis problemerne fortsætter efter aktivering af hukommelsesoptimering, prøv at aktivere swap-hukommelse. Dette indstiller swap-filstørrelsen til 256MB som standard, som kan justeres i "Indstillinger > Enhed".'
        },
        loading: 'Indlæser...',
        install: 'Installer',
        installing: 'Installerer',
        failed: 'Installation mislykkedes',
        download: 'Download',
        package: 'installationspakken',
        unzip: 'og udpak den',
        upTailscale: 'Upload tailscale til NanoKVM-mappen /usr/bin/',
        upTailscaled: 'Upload tailscaled til NanoKVM-mappen /usr/sbin/',
        notRunning: 'Tailscale kører ikke. Start det for at fortsætte.',
        run: 'Start',
        notLogin:
          'Enheden er ikke tilknyttet en Tailscale-konto endnu. Log ind for at fuldføre tilknytningen til din konto.',
        urlPeriod: 'Denne URL er gyldig i 10 minutter',
        login: 'Log ind',
        loginSuccess: 'Log ind lykkedes',
        deviceName: 'Enhedens navn',
        deviceIP: 'Enhedens IP',
        account: 'Konto',
        logout: 'Log ud',
        logoutDesc: 'Er du sikker på, at du vil logge ud?',
        uninstall: 'Afinstaller Tailscale',
        uninstallDesc: 'Er du sikker på, at du vil afinstallere Tailscale?'
      },
      update: {
        title: 'Kontroller for opdatering',
        queryFailed: 'Opdateringskontrol mislykkedes',
        updateFailed: 'Opdatering fejlede. Prøv igen.',
        isLatest: 'Du har allerede den nyeste version.',
        available: 'En opdatering er tilgængelig. Vil du installere den?',
        updating: 'Opdatering i gang. Vent venligst...',
        confirm: 'Bekræft',
        cancel: 'Annuller',
        preview: 'Forhåndsvisning af opdateringer',
        offline: {
          title: 'Offline opdateringer',
          desc: 'Opdatering via lokal installationspakke',
          upload: 'Upload',
          invalidName: 'Ugyldigt filnavnsformat. Download venligst fra GitHub-udgivelser.',
          updateFailed: 'Opdatering fejlede. Prøv igen.'
        }
      },
      account: {
        title: 'Konto',
        webAccount: 'Navn på webkonto',
        password: 'Adgangskode',
        updateBtn: 'Update',
        logoutBtn: 'Log ud',
        logoutDesc: 'Er du sikker på, at du vil logge ud?',
        okBtn: 'Ja'
      }
    },
    picoclaw: {
      title: 'PicoClaw Assistent',
      inputPlaceholder: 'Beskriv, hvad du vil have PicoClaw til at gøre',
      newConversation: 'Ny samtale',
      processing: 'Behandler...',
      agent: {
        defaultTitle: 'Generel assistent',
        kvmTitle: 'Fjernstyring',
        switched: 'Agentrolle skiftet',
        switchFailed: 'Kunne ikke skifte agentrolle'
      },
      send: 'Send',
      cancel: 'Annuller',
      status: {
        connecting: 'Opretter forbindelse til gateway...',
        connected: 'PicoClaw-session tilsluttet',
        disconnected: 'PicoClaw-session lukket',
        stopped: 'Stopanmodning sendt',
        runtimeStarted: 'PicoClaw runtime startet',
        runtimeStartFailed: 'Kunne ikke starte PicoClaw runtime',
        runtimeStopped: 'PicoClaw runtime stoppet',
        runtimeStopFailed: 'Kunne ikke stoppe PicoClaw runtime'
      },
      connection: {
        runtime: {
          checking: 'Kontrol',
          ready: 'Runtime klar',
          stopped: 'Runtime stoppet',
          unavailable: 'Runtime utilgængelig',
          configError: 'Konfigurationsfejl'
        },
        transport: {
          connecting: 'Tilslutning',
          connected: 'Tilsluttet'
        },
        run: {
          idle: 'Tomgang',
          busy: 'Optaget'
        }
      },
      message: {
        toolAction: 'Handling',
        observation: 'Observation',
        screenshot: 'Skærmbillede'
      },
      overlay: {
        locked: 'PicoClaw styrer enheden. Manuel indtastning er sat på pause.'
      },
      install: {
        install: 'Installer PicoClaw',
        installing: 'Installation af PicoClaw',
        success: 'PicoClaw installeret korrekt',
        failed: 'Kunne ikke installere PicoClaw',
        uninstalling: 'Afinstallerer runtime...',
        requiredTitle: 'PicoClaw er ikke installeret',
        requiredDescription: 'Installer PicoClaw før start af PicoClaw runtime.',
        progressDescription: 'PicoClaw bliver downloadet og installeret.',
        stages: {
          preparing: 'Forberedelse',
          downloading: 'Downloader',
          extracting: 'Udpakning',
          verifying: 'Bekræfter',
          installing: 'Installerer',
          installed: 'Installeret',
          install_timeout: 'Timeout',
          install_failed: 'Mislykkedes'
        }
      },
      model: {
        requiredTitle: 'Modelkonfiguration er påkrævet',
        requiredDescription: 'Konfigurer PicoClaw-modellen, før du bruger PicoClaw chat.',
        docsTitle: 'Konfigurationsvejledning',
        docsDesc: 'Understøttede modeller og protokoller',
        menuLabel: 'Konfigurer model',
        modelIdentifier: 'Modelidentifikator',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API-nøgle',
        apiKeyPlaceholder: 'Indtast modellens API-nøgle',
        save: 'Gem',
        saving: 'Gemmer',
        saved: 'Modelkonfiguration gemt',
        saveFailed: 'Kunne ikke gemme modelkonfigurationen',
        invalid: 'Model-id, API Base URL og API-nøgle er påkrævet'
      },
      uninstall: {
        menuLabel: 'Afinstaller',
        confirmTitle: 'Afinstaller PicoClaw',
        confirmContent:
          'Er du sikker på, at du vil afinstallere PicoClaw? Dette vil slette den eksekverbare fil og alle konfigurationsfiler.',
        confirmOk: 'Afinstaller'
      },
      history: {
        title: 'Historik',
        loading: 'Indlæser sessioner...',
        emptyTitle: 'Ingen historik endnu',
        emptyDescription: 'Tidligere PicoClaw sessioner vil blive vist her.',
        loadFailed: 'Kunne ikke indlæse sessionshistorikken',
        deleteFailed: 'Kunne ikke slette session',
        deleteConfirmTitle: 'Slet session',
        deleteConfirmContent: 'Er du sikker på, at du vil slette "{{title}}"?',
        deleteConfirmOk: 'Slet',
        messageCount_one: '{{count}} besked',
        messageCount_other: '{{count}} beskeder'
      },
      config: {
        startRuntime: 'Start PicoClaw',
        stopRuntime: 'Stop PicoClaw'
      },
      start: {
        title: 'Start PicoClaw',
        description: 'Start runtime for at begynde at bruge PicoClaw-assistenten.'
      }
    },
    error: {
      title: 'Vi er stødt på et problem',
      refresh: 'Opdater'
    },
    fullscreen: {
      toggle: 'Skift fuldskærm'
    },
    menu: {
      collapse: 'Skjul menu'
    }
  }
};

export default da;
