const nl = {
  translation: {
    common: {
      confirm: 'Bevestigen',
      cancel: 'Annuleren',
      delete: 'Verwijderen',
      actionFailed: 'Bewerking mislukt',
      loading: 'Instellingen van het apparaat laden...',
      loadFailed: 'Kan de instellingen niet van het apparaat laden',
      retry: 'Opnieuw proberen'
    },
    head: {
      desktop: 'Extern bureaublad',
      login: 'Inloggen',
      changePassword: 'Wachtwoord wijzigen',
      terminal: 'Terminal',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Inloggen',
      placeholderUsername: 'Voer gebruikersnaam in',
      placeholderPassword: 'Voer wachtwoord in',
      placeholderPassword2: 'Voer wachtwoord nogmaals in',
      noEmptyUsername: 'Gebruikersnaam mag niet leeg zijn',
      noEmptyPassword: 'Wachtwoord mag niet leeg zijn',
      noAccount:
        'Ophalen van gebruikersinformatie mislukt, vernieuw de webpagina of reset het wachtwoord',
      invalidUser: 'Ongeldige gebruikersnaam of wachtwoord',
      locked: 'Te veel aanmeldingen, probeer het later opnieuw',
      globalLocked: 'Systeem wordt beveiligd. Probeer het later opnieuw',
      error: 'Onverwachte fout',
      changePassword: 'Wachtwoord wijzigen',
      differentPassword: 'Wachtwoorden komen niet overeen',
      illegalUsername: 'Gebruikersnaam bevat ongeldige tekens',
      forgetPassword: 'Wachtwoord vergeten',
      ok: 'Ok',
      cancel: 'Annuleren',
      loginButtonText: 'Inloggen',
      tips: {
        change1: 'Houd er rekening mee dat deze actie de volgende wachtwoorden zal wijzigen:',
        change2: 'Web login wachtwoord'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Wi-Fi configureren voor NanoKVM',
      invalidMode:
        'De huidige modus ondersteunt geen netwerkconfiguratie. Ga naar uw apparaat en schakel de configuratiemodus Wi-Fi in.',
      confirmBtn: 'Ok',
      finishBtn: 'Gereed',
      ap: {
        authTitle: 'Authenticatie vereist',
        authDescription: 'Voer het wachtwoord AP in om door te gaan',
        authFailed: 'Ongeldig AP wachtwoord',
        passPlaceholder: 'AP wachtwoord',
        verifyBtn: 'Verifieer'
      }
    },
    screen: {
      scale: 'Schaal',
      title: 'Scherm',
      video: 'Videomodus',
      resolution: 'Resolutie',
      auto: 'Automatisch',
      autoTips:
        'Bij bepaalde resoluties kunnen schermverscheuringen of muisverplaatsingen optreden. Overweeg de resolutie van de externe host aan te passen of schakel de automatische modus uit.',
      fps: 'FPS',
      customizeFps: 'Aanpassen',
      quality: 'Kwaliteit',
      qualityLossless: 'Verliesvrij',
      qualityHigh: 'Hoog',
      qualityMedium: 'Gemiddeld',
      qualityLow: 'Laag',
      frameDetect: 'Frame detectie',
      frameDetectTip:
        'Berekent het verschil tussen frames. Stopt met het verzenden van de videostream wanneer er geen veranderingen worden gedetecteerd op het scherm van de externe host.',
      webrtcConnectionFailed: {
        title: 'WebRTC-verbinding mislukt'
      },
      captureStatus: {
        hdmiError: 'HDMI-schermfout',
        unsupportedResolution: 'De huidige resolutie wordt niet ondersteund',
        retrieving: 'Scherm ophalen...',
        changingResolution: 'Resolutie wisselen...',
        updateFailed: 'Het scherm kan nu niet worden bijgewerkt',
        videoError: 'Fout bij videoweergave',
        noHdmi: 'Geen HDMI-signaal gedetecteerd',
        unavailable: 'Het scherm kan nu niet worden weergegeven'
      }
    },
    keyboard: {
      title: 'Toetsenbord',
      paste: 'Plakken',
      tips: 'Alleen standaard toetsenbordletters en symbolen worden ondersteund',
      placeholder: 'Voer tekst in',
      submit: 'Verzenden',
      virtual: 'Toetsenbord',
      readClipboard: 'Lezen vanaf het Klembord',
      clipboardPermissionDenied:
        'Klembordtoestemming geweigerd. Sta klembordtoegang toe in uw browser.',
      clipboardReadError: 'Kan het klembord niet lezen',
      dropdownEnglish: 'Engels',
      dropdownGerman: 'Duits',
      dropdownFrench: 'Frans',
      dropdownRussian: 'Russisch',
      shortcut: {
        custom: 'Aangepast',
        capture: 'Klik hier om de snelkoppeling vast te leggen',
        save: 'Opslaan'
      },
      leaderKey: {
        title: 'Leader-toets',
        howToUse: 'Hoe te gebruiken',
        simultaneous: {
          title: 'Gelijktijdige modus',
          desc1: 'Houd de Leader-toets ingedrukt en druk daarna op de sneltoets.',
          desc2: 'Intuïtief, maar kan conflicteren met systeemsnelkoppelingen.'
        },
        sequential: {
          title: 'Sequentiële modus',
          desc1:
            'Druk op de Leader-toets → druk de sneltoets in volgorde in → druk opnieuw op de Leader-toets.',
          desc2: 'Vereist meer stappen, maar vermijdt systeemconflicten volledig.'
        },
        enable: 'Leader-toets inschakelen',
        tip: 'Wanneer deze toets als Leader-toets is toegewezen, werkt hij uitsluitend als sneltoetstrigger en verliest hij zijn standaardgedrag.',
        placeholder: 'Druk op de Leader-toets',
        shiftRight: 'Rechter Shift',
        ctrlRight: 'Rechter Ctrl',
        metaRight: 'Rechter Win',
        submit: 'Verzenden',
        recorder: {
          rec: 'OPN',
          activate: 'Toetsen activeren',
          input: 'Druk op de snelkoppeling...'
        }
      }
    },
    mouse: {
      title: 'Muis',
      cursor: 'Cursorstijl',
      default: 'Standaard cursor',
      pointer: 'Aanwijzer cursor',
      cell: 'Cel cursor',
      text: 'Tekst cursor',
      grab: 'Grijp cursor',
      hide: 'Cursor verbergen',
      mode: 'Muismodus',
      absolute: 'Absolute modus',
      relative: 'Relatieve modus',
      direction: 'Scrollwielrichting',
      scrollUp: 'Scroll naar boven',
      scrollDown: 'Scroll naar beneden',
      speed: 'Scrollwielsnelheid',
      fast: 'Snel',
      slow: 'Langzaam',
      requestPointer:
        'Relatieve modus wordt gebruikt. Klik op het bureaublad om de muisaanwijzer te krijgen.',
      resetHid: 'HID resetten',
      hidOnly: {
        title: 'Alleen HID-modus',
        tip2: 'In de modus HID-Alleen is beeldmontage uitgeschakeld',
        tip3: 'NanoKVM wordt automatisch opnieuw opgestart na het wisselen van modus',
        enable: 'Schakel de modus HID-Alleen in',
        disable: 'Schakel de modus HID-Alleen uit'
      }
    },
    image: {
      title: 'Afbeeldingen',
      loading: 'Laden...',
      empty: 'Niets gevonden',
      mountMode: 'Montagemodus',
      mountFailed: 'Koppelen mislukt',
      diskOnWarn:
        'Het koppelen van de image schakelt de virtuele schijf uit, zodat de computer geen toegang meer heeft tot /data. Doorgaan?',
      diskOffWarn:
        'De virtuele schijf staat uit en moet aan staan om de image te koppelen. De USB-apparaten op de computer worden opnieuw herkend. Doorgaan?',
      unmountFailed: 'Ontkoppelen mislukt',
      forceEject: 'Uitwerpen forceren',
      forceEjectConfirm:
        'De host heeft het optische station vergrendeld. Bij geforceerd uitwerpen wordt het virtuele USB-apparaat even losgekoppeld, waardoor het toetsenbord en de muis kort kunnen worden losgekoppeld. Doorgaan?',
      refresh: 'Vernieuw de afbeeldingenlijst',
      attention: 'Let op',
      deleteConfirm: 'Weet u zeker dat u deze afbeelding wilt verwijderen?',
      tips: {
        title: 'Hoe te uploaden',
        usb1: 'Verbind de NanoKVM met uw computer via USB.',
        usb3: 'Open de virtuele schijf op uw computer en kopieer het imagebestand naar de hoofdmap van de virtuele schijf.',
        scp1: 'Zorg ervoor dat de NanoKVM en uw computer zich in hetzelfde lokale netwerk bevinden.',
        scp2: 'Open een terminal op uw computer en gebruik het SCP-commando om het imagebestand te uploaden naar de /data directory op de NanoKVM.',
        scp3: 'Voorbeeld: scp uw-image-pad root@uw-nanokvm-ip:/data',
        tfCard: 'TF-kaart',
        tf1: 'Deze methode wordt ondersteund op Linux-systemen',
        tf3: 'Plaats de TF-kaart in een kaartlezer en verbind deze met uw computer.',
        tf4: 'Kopieer het imagebestand naar de /data directory op de TF-kaart.',
        tf5: 'Plaats de TF-kaart terug in de NanoKVM.'
      }
    },
    script: {
      title: 'Script',
      upload: 'Uploaden',
      run: 'Uitvoeren',
      runBackground: 'Op achtergrond uitvoeren',
      runFailed: 'Uitvoeren mislukt',
      attention: 'Let op',
      delDesc: 'Weet u zeker dat u dit bestand wilt verwijderen?',
      confirm: 'Ja',
      cancel: 'Nee',
      delete: 'Verwijderen',
      close: 'Sluiten'
    },
    terminal: {
      title: 'Terminal',
      nanokvm: 'NanoKVM Terminal',
      serial: 'Seriële poort terminal',
      serialPort: 'Seriële poort',
      serialPortPlaceholder: 'Voer de seriële poort in',
      baudrate: 'Baudrate',
      parity: 'Pariteit',
      parityNone: 'Geen',
      parityEven: 'Even',
      parityOdd: 'Oneven',
      flowControl: 'Debietregeling',
      flowControlNone: 'Geen',
      flowControlSoft: 'Software',
      flowControlHard: 'Hardware',
      dataBits: 'Databits',
      stopBits: 'Stopbits',
      confirm: 'Ok'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'Commando wordt verzonden...',
      sent: 'Commando verzonden',
      input: 'Voer het MAC-adres in',
      ok: 'Ok'
    },
    download: {
      title: 'Afbeeldingdownloader',
      input: 'Voer een externe afbeelding in URL',
      ok: 'Ok',
      mountedImage:
        'Dit image is gekoppeld. Ontkoppel het voordat u een bestand met dezelfde naam uploadt.',
      diskOff: 'Virtuele schijf uitschakelen',
      uploadbox: 'Zet het bestand hier neer of klik om te selecteren',
      inputfile: 'Voer het afbeeldingsbestand in',
      NoISO: 'Geen ISO',
      sha256Placeholder: 'Voer een SHA-256-controlesom van 64 tekens in',
      invalidSHA256: 'SHA-256 moet een hexadecimale tekenreeks van 64 tekens zijn',
      checksumFailed: 'Download mislukt: SHA-256-verificatie mislukt'
    },
    power: {
      title: 'Aan/uit',
      showConfirm: 'Bevestiging',
      showConfirmTip: 'Stroombedieningen vereisen een extra bevestiging',
      reset: 'Resetten',
      power: 'Aan/uit',
      resetConfirm: 'Doorgaan met resetten?',
      powerConfirm: 'Doorgaan met stroomvoorziening?',
      okBtn: 'Ja',
      cancelBtn: 'Nee'
    },
    settings: {
      title: 'Instellingen',
      about: {
        title: 'Over NanoKVM',
        information: 'Informatie',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Applicatie versie',
        applicationTip: 'Versie van de NanoKVM-webapplicatie',
        image: 'Image versie',
        imageTip: 'Versie van de NanoKVM-systeemimage',
        deviceKey: 'Apparaat sleutel',
        community: 'Community',
        hostname: 'Hostnaam',
        hostnameUpdated: 'Hostnaam bijgewerkt. Start opnieuw op om toe te passen.',
        ipType: {
          Wired: 'Bedraad',
          Wireless: 'Draadloos',
          Other: 'Anders'
        }
      },
      appearance: {
        title: 'Uiterlijk',
        display: 'Beeldscherm',
        language: 'Taal',
        languageDesc: 'Selecteer de taal voor de interface',
        webTitle: 'Webtitel',
        webTitleDesc: 'Pas de titel van de webpagina aan',
        menuBar: {
          title: 'Menubalk',
          mode: 'Weergavemodus',
          modeDesc: 'Geef de menubalk weer op het scherm',
          modeOff: 'Uit',
          modeAuto: 'Automatisch verbergen',
          modeAlways: 'Altijd zichtbaar',
          keyboardLedStatus: 'Toetsvergrendelingsindicatoren',
          keyboardLedStatusDesc:
            'Toon de Num Lock-, Caps Lock- en Scroll Lock-status van de externe computer',
          icons: 'Submenupictogrammen',
          iconsDesc: 'Submenupictogrammen weergeven in de menubalk'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Toetsvergrendelingsstatus van extern toetsenbord',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'Aan',
        off: 'Uit',
        unknown: 'Onbekend'
      },
      device: {
        title: 'Apparaat',
        oled: {
          title: 'OLED'
        },
        ssh: {
          description: 'Schakel SSH externe toegang in'
        },
        swap: {
          title: 'Wisselen',
          description: 'Stel de grootte van het wisselbestand in'
        },
        mouseJiggler: {
          title: 'Muisschommel',
          description: 'Voorkom dat de externe host in slaap valt',
          disable: 'Uitschakelen',
          absolute: 'Absolute modus',
          relative: 'Relatieve modus'
        },
        mdns: {
          description: 'Schakel de mDNS detectieservice in'
        },
        hdmi: {
          description: 'Schakel HDMI/monitoruitgang in',
          idleTimeoutTitle: 'Time-out voor inactieve opname',
          idleTimeoutDescription:
            'HDMI-opname stoppen nadat er gedurende deze tijd geen actieve kijkers zijn:'
        },
        hidOnly: 'HID-Alleen modus',
        disk: 'Virtuele schijf',
        network: 'Virtueel Netwerk',
        networkDesc: 'Koppel virtueel netwerk kaart aan de externe host',
        reboot: 'Opnieuw opstarten',
        rebootDesc: 'Weet u zeker dat u NanoKVM opnieuw wilt opstarten?',
        okBtn: 'Ja',
        cancelBtn: 'Nee'
      },
      network: {
        title: 'Netwerk',
        wifi: {
          title: 'Wi-Fi',
          description: 'Wi-Fi configureren',
          apMode: 'AP-modus is ingeschakeld, maak verbinding met Wi-Fi door de QR-code te scannen',
          connect: 'Wi-Fi verbinden',
          connectDesc1: 'Voer de netwerk-SSID en het wachtwoord in',
          connectDesc2: 'Voer het wachtwoord in om met dit netwerk te verbinden',
          ssid: 'Naam',
          password: 'Wachtwoord',
          joinBtn: 'Verbinden',
          confirmBtn: 'OK',
          cancelBtn: 'Annuleren'
        },
        tls: {
          description: 'HTTPS-protocol inschakelen'
        },
        dns: {
          title: 'DNS',
          description: 'Configureer DNS-servers voor NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Configureer IPv4-adressering voor de bekabelde interface',
          mode: 'Modus',
          dhcp: 'DHCP',
          manual: 'Handmatig',
          save: 'Opslaan',
          apply: 'Toepassen',
          invalid: 'Voer een geldig IPv4- of IPv6-adres in',
          invalidNetwork: 'Voer een geldig IPv4-adres, subnetmasker en router in',
          noDhcp: 'Er is momenteel geen DHCP-DNS beschikbaar',
          saved: 'DNS-instellingen opgeslagen',
          redirecting: 'Netwerkinstellingen opgeslagen. Nieuw adres wordt geopend...',
          saveFailed: 'DNS-instellingen opslaan mislukt',
          unsaved: 'Niet-opgeslagen wijzigingen',
          maxServers: 'Maximaal {{count}} DNS-servers toegestaan',
          dhcpServersDescription: 'DNS-servers worden automatisch via DHCP verkregen',
          interface: 'Interface',
          ipAddress: 'IP-adres',
          subnetMask: 'Subnetmasker',
          router: 'Router'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Geheugen optimalisatie',
          tip: 'Wanneer geheugen gebruik de limiet overschreid, garbage collection wordt agressiever uitgevoerd om geheugen vrij te maken. geadviseerd om 50MB te kiezen als Tailscale wordt gebruikt. Tailscale moet worden herstart om de wijziging door te voeren.'
        },
        swap: {
          title: 'Geheugen wisselen',
          tip: 'Als de problemen aanhouden nadat u geheugenoptimalisatie hebt ingeschakeld, probeer dan het wisselgeheugen in te schakelen. Hierdoor wordt de grootte van het wisselbestand standaard ingesteld op 256MB, wat kan worden aangepast in "Instellingen > Apparaat".'
        },
        restart: 'Weet u zeker dat u Tailscale opnieuw wilt opstarten?',
        stop: 'Weet u zeker dat u Tailscale wilt stoppen?',
        loading: 'Laden...',
        install: 'Installeren',
        installing: 'Installeren bezig',
        failed: 'Installatie mislukt',
        download: 'Download het',
        package: 'installatiepakket',
        unzip: 'en pak het uit',
        upTailscale: 'Upload tailscale naar NanoKVM directory /usr/bin/',
        upTailscaled: 'Upload tailscaled naar NanoKVM directory /usr/sbin/',
        refresh: 'Vernieuw huidige pagina',
        notRunning: 'Tailscale is niet actief. Start het programma om door te gaan.',
        notLogin:
          'Het apparaat is nog niet gekoppeld. Log in en koppel dit apparaat aan uw account.',
        urlPeriod: 'Deze url is 10 minuten geldig',
        login: 'Inloggen',
        loginSuccess: 'Inloggen gelukt',
        enable: 'Tailscale inschakelen',
        deviceName: 'Apparaatnaam',
        deviceIP: 'Apparaat IP',
        account: 'Account',
        logout: 'Uitloggen',
        logoutDesc: 'Weet u zeker dat u wilt uitloggen?',
        uninstallDesc: 'Weet u zeker dat u Tailscale wilt verwijderen?',
        okBtn: 'Ja',
        cancelBtn: 'Nee'
      },
      update: {
        title: 'Controleren op updates',
        queryFailed: 'Ophalen versie mislukt',
        updateFailed: 'Update mislukt. Probeer het opnieuw.',
        isLatest: 'U heeft al de nieuwste versie.',
        available: 'Er is een update beschikbaar. Weet u zeker dat u wilt updaten?',
        updating: 'Update gestart. Even geduld a.u.b...',
        confirm: 'Bevestigen',
        cancel: 'Annuleren',
        preview: 'Preview-updates',
        previewDesc: 'Krijg vroegtijdig toegang tot nieuwe functies en verbeteringen',
        offline: {
          title: 'Offline-updates',
          desc: 'Update via lokaal installatiepakket',
          upload: 'Uploaden',
          invalidName: 'Ongeldig bestandsnaamformaat. Download de versie van GitHub-releases.',
          updateFailed: 'Update mislukt. Probeer het opnieuw.'
        }
      },
      account: {
        title: 'Account',
        webAccount: 'Web Account Naam',
        password: 'Wachtwoord',
        updateBtn: 'Update',
        logoutBtn: 'Afmelden',
        logoutDesc: 'Weet u zeker dat u wilt uitloggen?',
        okBtn: 'Ja',
        cancelBtn: 'Nee'
      }
    },
    picoclaw: {
      title: 'PicoClaw Assistent',
      inputPlaceholder: 'Beschrijf wat u wilt dat de PicoClaw doet',
      newConversation: 'Nieuw gesprek',
      processing: 'Verwerken...',
      agent: {
        defaultTitle: 'Algemene assistent',
        kvmTitle: 'Bediening op afstand',
        switched: 'Agentrol gewijzigd',
        switchFailed: 'Kan agentrol niet wisselen'
      },
      send: 'Verzenden',
      cancel: 'Annuleren',
      status: {
        connecting: 'Verbinden met gateway...',
        connected: 'PicoClaw-sessie verbonden',
        disconnected: 'PicoClaw-sessie gesloten',
        stopped: 'Stopverzoek verzonden',
        runtimeStarted: 'PicoClaw runtime gestart',
        runtimeStartFailed: 'Kan PicoClaw runtime niet starten',
        runtimeStopped: 'PicoClaw runtime gestopt',
        runtimeStopFailed: 'Kan PicoClaw runtime niet stoppen'
      },
      connection: {
        runtime: {
          checking: 'Controleren',
          ready: 'Runtime gereed',
          stopped: 'Runtime gestopt',
          unavailable: 'Runtime niet beschikbaar',
          configError: 'Configuratiefout'
        },
        transport: {
          connecting: 'Verbinden',
          connected: 'Verbonden'
        },
        run: {
          idle: 'Inactief',
          busy: 'Bezet'
        }
      },
      message: {
        toolAction: 'Actie',
        observation: 'Observatie',
        screenshot: 'Schermafbeelding'
      },
      overlay: {
        locked: 'PicoClaw bestuurt het apparaat. Handmatige invoer is gepauzeerd.'
      },
      install: {
        install: 'PicoClaw installeren',
        installing: 'PicoClaw installeren',
        success: 'PicoClaw is succesvol geïnstalleerd',
        failed: 'Kan PicoClaw niet installeren',
        uninstalling: 'Runtime verwijderen...',
        requiredTitle: 'PicoClaw is niet geïnstalleerd',
        requiredDescription: 'Installeer PicoClaw voordat u de runtime van PicoClaw start.',
        progressDescription: 'PicoClaw wordt gedownload en geïnstalleerd.',
        stages: {
          preparing: 'Voorbereiden',
          downloading: 'Downloaden',
          extracting: 'Uitpakken',
          verifying: 'Verifiëren',
          installing: 'Installeren',
          installed: 'Geïnstalleerd',
          install_timeout: 'Time-out',
          install_failed: 'Mislukt'
        }
      },
      model: {
        requiredTitle: 'Modelconfiguratie is vereist',
        requiredDescription: 'Configureer het PicoClaw-model voordat u PicoClaw chat gebruikt.',
        docsTitle: 'Configuratiehandleiding',
        docsDesc: 'Ondersteunde modellen en protocollen',
        menuLabel: 'Model configureren',
        modelIdentifier: 'Modelidentificatie',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API-sleutel',
        apiKeyPlaceholder: 'Voer de API-sleutel van het model in',
        save: 'Opslaan',
        saving: 'Opslaan',
        saved: 'Modelconfiguratie opgeslagen',
        saveFailed: 'Kan de modelconfiguratie niet opslaan',
        invalid: 'Model-ID, API Base URL en API-sleutel zijn vereist'
      },
      uninstall: {
        menuLabel: 'Verwijderen',
        confirmTitle: 'PicoClaw verwijderen',
        confirmContent:
          'Weet u zeker dat u PicoClaw wilt verwijderen? Hiermee worden het uitvoerbare bestand en alle configuratiebestanden verwijderd.',
        confirmOk: 'Verwijderen',
        confirmCancel: 'Annuleren'
      },
      history: {
        title: 'Geschiedenis',
        loading: 'Sessies laden...',
        emptyTitle: 'Nog geen geschiedenis',
        emptyDescription: 'Eerdere PicoClaw sessies verschijnen hier.',
        loadFailed: 'Kan de sessiegeschiedenis niet laden',
        deleteFailed: 'Kan sessie niet verwijderen',
        deleteConfirmTitle: 'Sessie verwijderen',
        deleteConfirmContent: 'Weet u zeker dat u "{{title}}" wilt verwijderen?',
        deleteConfirmOk: 'Verwijderen',
        deleteConfirmCancel: 'Annuleren',
        messageCount_one: '{{count}} bericht',
        messageCount_other: '{{count}} berichten'
      },
      config: {
        startRuntime: 'Start PicoClaw',
        stopRuntime: 'Stop PicoClaw'
      },
      start: {
        title: 'Start PicoClaw',
        description: 'Start de runtime om de PicoClaw assistent te gaan gebruiken.'
      }
    },
    error: {
      title: 'Er is een probleem opgetreden',
      refresh: 'Vernieuwen'
    },
    fullscreen: {
      toggle: 'Volledig scherm schakelen'
    },
    menu: {
      collapse: 'Menu samenvouwen',
      expand: 'Menu uitvouwen'
    }
  }
};

export default nl;
