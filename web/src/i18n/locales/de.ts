const de = {
  translation: {
    common: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      actionFailed: 'Vorgang fehlgeschlagen',
      loading: 'Einstellungen werden vom Gerät geladen...',
      loadFailed: 'Einstellungen konnten nicht vom Gerät geladen werden',
      retry: 'Erneut versuchen'
    },
    head: {
      desktop: 'Entfernter Desktop',
      login: 'Anmelden',
      changePassword: 'Passwort ändern',
      terminal: 'Terminal',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Anmelden',
      placeholderUsername: 'Benutzername',
      placeholderPassword: 'Passwort',
      placeholderPassword2: 'Bitte Passwort erneut eingeben',
      noEmptyUsername: 'Benutzername benötigt',
      noEmptyPassword: 'Passwort benötigt',
      noAccount:
        'Abfragen der Benutzerdaten fehlgeschlagen, bitte die Seite neu laden oder Passwort zurücksetzen',
      invalidUser: 'Falscher Benutzername oder falsches Passwort',
      locked: 'Zu viele Anmeldungen, bitte versuchen Sie es später noch einmal',
      globalLocked: 'System wird geschützt, bitte versuchen Sie es später erneut',
      error: 'Unerwarteter Fehler',
      changePassword: 'Passwort ändern',
      differentPassword: 'Passwörter stimmen nicht überein',
      illegalUsername: 'Benutzername enthält ungültige Zeichen',
      forgetPassword: 'Passwort vergessen',
      ok: 'Ok',
      cancel: 'Abbrechen',
      loginButtonText: 'Anmelden',
      tips: {
        change1: 'Bitte beachten Sie, dass diese Aktion folgende Passwörter ändert:',
        change2: 'Web Anmelde-Passwort'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Wi-Fi Konfiguration für NanoKVM',
      invalidMode:
        'Der aktuelle Modus unterstützt keine Netzwerkeinrichtung. Bitte gehen Sie zu Ihrem Gerät und aktivieren Sie den Wi-Fi-Konfigurationsmodus.',
      confirmBtn: 'Ok',
      finishBtn: 'Fertig',
      ap: {
        authTitle: 'Authentifizierung erforderlich',
        authDescription: 'Bitte geben Sie das Passwort AP ein, um fortzufahren',
        authFailed: 'Ungültiges AP Passwort',
        passPlaceholder: 'AP Passwort',
        verifyBtn: 'Überprüfen'
      }
    },
    screen: {
      scale: 'Skala',
      title: 'Bildschirm',
      video: 'Video Modus',
      resolution: 'Auflösung',
      auto: 'Automatisch',
      autoTips:
        'Bildverzerrungen oder ein versetzter Mauszeiger können bei bestimmten Auflösungen auftreten. Versuchen Sie, die Auflösung des entfernten Hosts anzupassen oder den automatischen Modus zu deaktivieren.',
      fps: 'FPS',
      customizeFps: 'Anpassen',
      quality: 'Qualität',
      qualityLossless: 'Verlustfrei',
      qualityHigh: 'Hoch',
      qualityMedium: 'Mittel',
      qualityLow: 'Niedrig',
      frameDetectTip:
        'Berechnet den Unterschied zwischen den Einzelbildern. Beendet die Liveübertragung des Videostreams wenn keine Änderungen auf dem Bildschirm des Hosts festgestellt werden kann.',
      resetHdmi: 'HDMI zurücksetzen',
      webrtcConnectionFailed: {
        title: 'WebRTC-Verbindung fehlgeschlagen'
      },
      captureStatus: {
        hdmiError: 'HDMI-Bildschirmfehler',
        unsupportedResolution: 'Die aktuelle Auflösung wird nicht unterstützt',
        retrieving: 'Bildschirm wird abgerufen...',
        changingResolution: 'Auflösung wird gewechselt...',
        updateFailed: 'Der Bildschirm kann derzeit nicht aktualisiert werden',
        videoError: 'Fehler bei der Videoanzeige',
        noHdmi: 'Kein HDMI-Signal erkannt',
        unavailable: 'Der Bildschirm kann derzeit nicht angezeigt werden'
      }
    },
    keyboard: {
      title: 'Tastatur',
      paste: 'Einfügen',
      placeholder: 'Bitte eingeben',
      submit: 'Senden',
      virtual: 'Tastatur',
      readClipboard: 'Aus der Zwischenablage lesen',
      clipboardPermissionDenied:
        'Berechtigung für die Zwischenablage verweigert. Bitte erlauben Sie den Zugriff auf die Zwischenablage in Ihrem Browser.',
      clipboardReadError: 'Zwischenablage konnte nicht gelesen werden',
      dropdownEnglish: 'Englisch',
      dropdownGerman: 'Deutsch',
      dropdownFrench: 'Französisch',
      dropdownRussian: 'Russisch',
      shortcut: {
        custom: 'Benutzerdefiniert',
        capture: 'Klicken Sie hier, um die Verknüpfung zu erfassen',
        save: 'Speichern'
      },
      leaderKey: {
        title: 'Leader-Taste',
        howToUse: 'Verwendung',
        simultaneous: {
          title: 'Simultanmodus',
          desc1: 'Halten Sie die Leader-Taste gedrückt und drücken Sie dann die Tastenkombination.',
          desc2: 'Intuitiv, kann jedoch zu Konflikten mit Systemverknüpfungen führen.'
        },
        sequential: {
          title: 'Sequenzieller Modus',
          desc1:
            'Drücken Sie die Leader-Taste → drücken Sie die Tastenkombination nacheinander → drücken Sie erneut die Leader-Taste.',
          desc2: 'Erfordert mehr Schritte, vermeidet jedoch vollständig Systemkonflikte.'
        },
        enable: 'Leader-Taste aktivieren',
        tip: 'Wenn diese Taste als Leader-Taste zugewiesen wird, dient sie ausschließlich als Auslöser für Tastenkombinationen und verliert ihr Standardverhalten.',
        placeholder: 'Bitte drücken Sie die Leader-Taste',
        shiftRight: 'Rechts Shift',
        ctrlRight: 'Rechts Ctrl',
        metaRight: 'Rechts Win',
        submit: 'Senden',
        recorder: {
          rec: 'REC',
          activate: 'Tasten aktivieren',
          input: 'Bitte drücken Sie die Tastenkombination...'
        }
      }
    },
    mouse: {
      title: 'Maus',
      cursor: 'Cursor',
      default: 'Standard Cursor',
      pointer: 'Zeiger Cursor',
      cell: 'Zellen Cursor',
      text: 'Text Cursor',
      grab: 'Greif Cursor',
      mode: 'Maus Modus',
      absolute: 'Absoluter Modus',
      relative: 'Relativer Modus',
      direction: 'Scrollrichtung',
      scrollUp: 'Nach oben scrollen',
      speed: 'Scrollgeschwindigkeit',
      fast: 'Schnell',
      slow: 'Langsam',
      requestPointer:
        'Relativer Modus aktiv. Klicken Sie auf den Desktop um den Mauszeiger zu sehen.',
      resetHid: 'HID zurücksetzen',
      hidOnly: {
        title: 'HID-Only-Modus',
        tip1: 'Die Aktivierung des HID-Only Modus entfernt das virtuelle U-Laufwerk und das virtuelle Netzwerk.',
        tip2: 'Im HID-Only Modus ist das Einbinden von Systemabbilder deaktiviert.',
        enable: 'HID-Only Modus aktivieren',
        disable: 'HID-Only Modus deaktivieren'
      }
    },
    image: {
      title: 'Bilder',
      loading: 'Lädt...',
      empty: 'Nichts gefunden',
      mountMode: 'Mount-Modus',
      mountFailed: 'Einbinden fehlgeschlagen',
      diskOnWarn:
        'Beim Einbinden des Images wird das virtuelle Laufwerk ausgeschaltet, sodass der Computer nicht mehr auf /data zugreifen kann. Fortfahren?',
      diskOffWarn:
        'Das virtuelle Laufwerk ist ausgeschaltet und muss zum Einbinden des Images aktiviert werden. Die USB-Geräte am Computer werden neu erkannt. Fortfahren?',
      forceEject: 'Auswerfen erzwingen',
      forceEjectConfirm:
        'Der Host hat das optische Laufwerk gesperrt. Beim erzwungenen Auswerfen wird das virtuelle USB-Gerät kurz getrennt, sodass Tastatur und Maus kurzzeitig ausfallen können. Fortfahren?',
      refresh: 'Bilder aktualisieren',
      attention: 'Achtung',
      deleteConfirm: 'Sind Sie sicher, dass Sie dieses Bild löschen möchten?',
      tips: {
        title: 'So laden Sie Dateien hoch',
        usb1: 'Verbinden Sie den NanoKVM über USB mit Ihrem Computer.',
        usb3: 'Öffnen Sie die virtuelle Festplatte auf Ihrem Computer und kopieren Sie die Image-Datei in das Stammverzeichnis der virtuellen Festplatte.',
        scp1: 'Stellen Sie sicher, dass sich der NanoKVM und Ihr Computer im selben lokalen Netzwerk befinden.',
        scp2: 'Öffnen Sie ein Terminal auf Ihrem Computer und verwenden Sie den SCP-Befehl, um die Image-Datei in das Verzeichnis /data auf dem NanoKVM hochzuladen.',
        scp3: 'Beispiel: scp your-image-path root@your-nanokvm-ip:/data',
        tfCard: 'TF-Karte',
        tf3: 'Stecken Sie die TF-Karte in einen Kartenleser und verbinden Sie diesen mit Ihrem Computer.',
        tf4: 'Kopieren Sie die Image-Datei in das Verzeichnis /data auf der TF-Karte.',
        tf5: 'Setzen Sie die TF-Karte wieder in den NanoKVM ein.'
      }
    },
    script: {
      title: 'Skripte',
      upload: 'Hochladen',
      run: 'Ausführen',
      runBackground: 'Im Hintergrund ausführen',
      attention: 'Achtung',
      delDesc: 'Möchten Sie diese Datei wirklich löschen?',
      confirm: 'Ja',
      cancel: 'Nein',
      delete: 'Löschen',
      close: 'Schliessen'
    },
    terminal: {
      title: 'Terminal',
      nanokvm: 'NanoKVM Terminal',
      serial: 'Serieller Anschluss Terminal',
      serialPort: 'Serieller Anschluss',
      serialPortPlaceholder: 'Bitte seriellen Anschluss angeben',
      baudrate: 'Baudrate',
      parity: 'Parität',
      parityNone: 'Keine',
      parityEven: 'Gerade',
      parityOdd: 'Ungerade',
      flowControl: 'Fluss-Kontrolle',
      flowControlNone: 'Keine',
      flowControlSoft: 'Software',
      flowControlHard: 'Hardware',
      dataBits: 'Daten bits',
      stopBits: 'Stopp bits',
      confirm: 'Ok'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'Sende Befehl...',
      sent: 'Befehl gesendet',
      input: 'Bitte MAC Adresse eingeben',
      ok: 'Ok'
    },
    download: {
      title: 'Systemabbild Downloader',
      input: 'Bitte geben Sie die URL für das Remote-Systemabbild ein',
      ok: 'Ok',
      mountedImage:
        'Dieses Image ist eingebunden. Heben Sie die Einbindung auf, bevor Sie eine Datei mit demselben Namen hochladen.',
      diskOff: 'Virtuelles Laufwerk ausschalten',
      uploadbox: 'Datei hier ablegen oder klicken zum Auswählen',
      inputfile: 'Bitte geben Sie die Datei für das Systemabbild an',
      NoISO: 'Keine ISO',
      sha256Placeholder: 'Geben Sie eine 64-stellige SHA-256-Prüfsumme ein',
      invalidSHA256: 'SHA-256 muss eine 64-stellige Hexadezimalzeichenfolge sein',
      checksumFailed: 'Download fehlgeschlagen: SHA-256-Prüfung fehlgeschlagen'
    },
    power: {
      title: 'Power',
      showConfirm: 'Bestätigung',
      showConfirmTip: 'Diese Aktionen benötigen eine zusätzliche Bestätigung',
      reset: 'Zurücksetzen',
      power: 'Power',
      resetConfirm: 'Reset-Aktion durchführen?',
      powerConfirm: 'Power-Aktion durchführen?',
      okBtn: 'Ja',
      cancelBtn: 'Nein'
    },
    settings: {
      title: 'Einstellungen',
      about: {
        title: 'Über NanoKVM',
        information: 'Informationen',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Applikations-Version',
        applicationTip: 'NanoKVM Web Applikations-Version',
        image: 'Systemabbild-Version',
        imageTip: 'NanoKVM Systemabbild-Version',
        deviceKey: 'Geräteschlüssel',
        community: 'Community',
        hostname: 'Hostname',
        hostnameUpdated: 'Hostname aktualisiert. Neustarten um zu übernehmen.',
        ipType: {
          Wired: 'Kabel',
          Wireless: 'Drahtlos',
          Other: 'Andere'
        }
      },
      appearance: {
        title: 'Erscheinungsbild',
        display: 'Bildschirm',
        language: 'Sprache',
        languageDesc: 'Wählen Sie die Sprache für die Benutzeroberfläche aus',
        webTitle: 'Web Titel',
        webTitleDesc: 'Passen Sie den Web-Seite Titel an',
        menuBar: {
          title: 'Menüleiste',
          mode: 'Anzeigemodus',
          modeDesc: 'Menüleiste auf dem Bildschirm anzeigen',
          modeOff: 'Aus',
          modeAuto: 'Automatisch ausblenden',
          modeAlways: 'Immer sichtbar',
          keyboardLedStatus: 'Tastensperren-Anzeigen',
          keyboardLedStatusDesc:
            'Num-Lock-, Feststell- und Rollen-Status des Remote-Computers anzeigen',
          icons: 'Untermenüsymbole',
          iconsDesc: 'Untermenüsymbole in der Menüleiste anzeigen'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Tastensperren-Status der Remote-Tastatur',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num-Taste',
        numLockShort: 'Num',
        capsLock: 'Feststelltaste',
        capsLockShort: 'Fest',
        scrollLock: 'Rollen-Taste',
        scrollLockShort: 'Roll',
        on: 'Ein',
        off: 'Aus',
        unknown: 'Unbekannt'
      },
      device: {
        title: 'Gerät',
        oled: {
          title: 'OLED'
        },
        ssh: {},
        swap: {
          title: 'Swap',
          description: 'Grösse der Swap-Datei festlegen'
        },
        mouseJiggler: {
          title: 'Mausaktivitäts-Simulator',
          description: 'Verhindert, dass der remote Host in den Energiesparmodus wechselt',
          disable: 'Deaktivieren',
          absolute: 'Absoluter Modus',
          relative: 'Relativer Modus'
        },
        mdns: {
          description: 'mDNS-Erkennungsdienst aktivieren',
          tip: 'Deaktivieren Sie den Dienst, wenn Sie ihn nicht benötigen'
        },
        hdmi: {
          description: 'HDMI/Monitor-Ausgabe aktivieren',
          idleTimeoutTitle: 'Zeitlimit für inaktive Aufnahme',
          idleTimeoutDescription:
            'HDMI-Aufnahme stoppen, wenn keine aktiven Zuschauer vorhanden sind für'
        },
        hidOnly: 'HID-Only Mode',
        disk: 'Virtuelle Festplatte',
        network: 'Virtuelles Netzwerk',
        reboot: 'Neustarten',
        rebootDesc: 'Sind Sie sicher dass Sie NanoKVM neustarten möchten?',
        okBtn: 'Ja',
        cancelBtn: 'Nein'
      },
      network: {
        title: 'Netzwerk',
        wifi: {
          title: 'Wi-Fi',
          description: 'Wi-Fi konfigurieren',
          apMode: 'AP-Modus ist aktiviert, verbinden Sie sich per QR-Code mit dem Wi-Fi',
          connect: 'Wi-Fi verbinden',
          connectDesc1: 'Bitte geben Sie die Netzwerk-SSID und das Passwort ein',
          connectDesc2: 'Bitte geben Sie das Passwort ein, um diesem Netzwerk beizutreten',
          disconnect: 'Möchten Sie die Netzwerkverbindung wirklich trennen?',
          ssid: 'Name',
          password: 'Passwort',
          joinBtn: 'Verbinden',
          confirmBtn: 'OK',
          cancelBtn: 'Abbrechen'
        },
        tls: {
          description: 'HTTPS-Protokoll aktivieren'
        },
        dns: {
          title: 'DNS',
          description: 'DNS-Server für NanoKVM konfigurieren',
          ipv4Title: 'IPv4',
          ipv4Description: 'IPv4-Adressierung für die kabelgebundene Schnittstelle konfigurieren',
          mode: 'Modus',
          dhcp: 'DHCP',
          manual: 'Manuell',
          save: 'Speichern',
          apply: 'Übernehmen',
          invalid: 'Bitte eine gültige IPv4- oder IPv6-Adresse eingeben',
          invalidNetwork: 'Bitte eine gültige IPv4-Adresse, Subnetzmaske und Router eingeben',
          noDhcp: 'Derzeit ist kein DHCP-DNS verfügbar',
          saved: 'DNS-Einstellungen gespeichert',
          redirecting: 'Netzwerkeinstellungen gespeichert. Neue Adresse wird geöffnet...',
          saveFailed: 'DNS-Einstellungen konnten nicht gespeichert werden',
          unsaved: 'Ungespeicherte Änderungen',
          maxServers: 'Maximal {{count}} DNS-Server erlaubt',
          dhcpServersDescription: 'DNS-Server werden automatisch per DHCP bezogen',
          interface: 'Schnittstelle',
          ipAddress: 'IP-Adresse',
          subnetMask: 'Subnetzmaske',
          router: 'Router'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Speicher Optimierung',
          tip: 'Wenn die Speichernutzung das Limit überschreitet, wird die Speicherbereinigung aggressiver durchgeführt, um Speicher freizugeben. Es wird empfohlen, den Wert auf 75 MB zu setzen, wenn Tailscale verwendet wird. Ein Neustart von Tailscale ist erforderlich, damit die Änderung wirksam wird.'
        },
        swap: {
          title: 'Speicher austauschen',
          tip: 'Wenn die Probleme nach der Aktivierung der Speicheroptimierung weiterhin bestehen, versuchen Sie, den Swap-Speicher zu aktivieren. Dadurch wird die Größe der Auslagerungsdatei standardmäßig auf 256MB festgelegt, was unter „Einstellungen > Gerät“ angepasst werden kann.'
        },
        restart: 'Tailscale neu starten?',
        stop: 'Tailscale stoppen?',
        loading: 'Lädt...',
        install: 'Installieren',
        installing: 'Installiere',
        failed: 'Installation fehlgeschlagen',
        download: 'Laden Sie das',
        package: 'Installations-Paket herunter',
        unzip: 'und entpacken Sie es',
        refresh: 'Aktuelle Seite neu laden',
        notRunning: 'Tailscale läuft nicht. Bitte starten Sie es, um fortzufahren.',
        run: 'Start',
        notLogin:
          'Das Gerät konnte noch nicht gefunden werden. Bitte melden Sie sich an und verknüpfen Sie dieses Gerät mit Ihrem Konto.',
        urlPeriod: 'Diese URL ist für 10 Minuten gültig',
        login: 'Anmelden',
        loginSuccess: 'Anmeldung erfolgreich',
        deviceName: 'Geräte Name',
        deviceIP: 'Geräte IP',
        account: 'Konto',
        logout: 'Abmelden',
        logoutDesc: 'Möchten Sie sich wirklich abmelden?',
        uninstall: 'Tailscale deinstallieren',
        uninstallDesc: 'Sind Sie sicher, dass Sie Tailscale deinstallieren möchten?',
        okBtn: 'Ja',
        cancelBtn: 'Nein'
      },
      update: {
        title: 'Nach Aktualisierungen suchen',
        queryFailed: 'Version konnte nicht abgefragt werden',
        updateFailed: 'Aktualisierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
        isLatest: 'Sie haben bereits die aktuellste Version.',
        available: 'Eine Aktualisierung ist verfügbar. Möchten sie diese jetzt durchführen?',
        updating: 'Aktualisierung gestartet. Bitte warten...',
        confirm: 'Bestätigen',
        cancel: 'Abbrechen',
        preview: 'Vorab-Versionen',
        previewDesc: 'Erhalten Sie vorab Zugriff auf neue Funktionen und Verbesserungen',
        offline: {
          title: 'Offline Aktualisierung',
          desc: 'Über lokales Installationspaket aktualisieren',
          upload: 'Hochladen',
          invalidName:
            'Ungültiges Dateinamenformat. Bitte laden Sie von den GitHub-Releases herunter.',
          updateFailed: 'Aktualisierung fehlgeschlagen. Bitte versuchen Sie es erneut.'
        }
      },
      account: {
        title: 'Konto',
        webAccount: 'Web Konto Name',
        password: 'Passwort',
        updateBtn: 'Ändern',
        logoutBtn: 'Abmelden',
        logoutDesc: 'Möchten Sie sich wirklich abmelden?',
        okBtn: 'Ja',
        cancelBtn: 'Nein'
      }
    },
    picoclaw: {
      title: 'PicoClaw Assistent',
      inputPlaceholder: 'Beschreiben Sie, was der PicoClaw tun soll',
      newConversation: 'Neues Gespräch',
      processing: 'Wird verarbeitet...',
      agent: {
        defaultTitle: 'Allgemeiner Assistent',
        kvmTitle: 'Fernsteuerung',
        switched: 'Agentenrolle gewechselt',
        switchFailed: 'Agentenrolle konnte nicht gewechselt werden'
      },
      send: 'Senden',
      cancel: 'Abbrechen',
      status: {
        connecting: 'Verbindung zum Gateway wird hergestellt...',
        connected: 'PicoClaw Sitzung verbunden',
        disconnected: 'PicoClaw Sitzung geschlossen',
        stopped: 'Stoppanforderung gesendet',
        runtimeStarted: 'PicoClaw Runtime gestartet',
        runtimeStartFailed: 'PicoClaw Runtime konnte nicht gestartet werden',
        runtimeStopped: 'PicoClaw Runtime gestoppt',
        runtimeStopFailed: 'PicoClaw Runtime konnte nicht gestoppt werden'
      },
      connection: {
        runtime: {
          checking: 'Überprüfung',
          ready: 'Runtime bereit',
          stopped: 'Runtime gestoppt',
          unavailable: 'Runtime nicht verfügbar',
          configError: 'Konfigurationsfehler'
        },
        transport: {
          connecting: 'Verbinden',
          connected: 'Verbunden'
        },
        run: {
          idle: 'Leerlauf',
          busy: 'Beschäftigt'
        }
      },
      message: {
        toolAction: 'Aktion',
        observation: 'Beobachtung',
        screenshot: 'Screenshot'
      },
      overlay: {
        locked: 'PicoClaw steuert das Gerät. Die manuelle Eingabe wird angehalten.'
      },
      install: {
        install: 'Installieren Sie PicoClaw',
        installing: 'Installation von PicoClaw',
        success: 'PicoClaw erfolgreich installiert',
        failed: 'Installation von PicoClaw fehlgeschlagen',
        uninstalling: 'Runtime wird deinstalliert...',
        requiredTitle: 'PicoClaw ist nicht installiert',
        requiredDescription: 'Installieren Sie PicoClaw, bevor Sie die PicoClaw Runtime starten.',
        progressDescription: 'PicoClaw wird heruntergeladen und installiert.',
        stages: {
          preparing: 'Vorbereiten',
          downloading: 'Wird heruntergeladen',
          extracting: 'Extrahieren',
          verifying: 'Überprüfen',
          installing: 'Installiere',
          installed: 'Installiert',
          install_timeout: 'Zeitüberschreitung',
          install_failed: 'Fehlgeschlagen'
        }
      },
      model: {
        requiredTitle: 'Modellkonfiguration ist erforderlich',
        requiredDescription:
          'Konfigurieren Sie das PicoClaw-Modell, bevor Sie den PicoClaw-Chat verwenden.',
        docsTitle: 'Konfigurationshandbuch',
        docsDesc: 'Unterstützte Modelle und Protokolle',
        menuLabel: 'Modell konfigurieren',
        modelIdentifier: 'Modell-ID',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API-Schlüssel',
        apiKeyPlaceholder: 'API-Schlüssel des Modells eingeben',
        save: 'Speichern',
        saving: 'Speichern',
        saved: 'Modellkonfiguration gespeichert',
        saveFailed: 'Modellkonfiguration konnte nicht gespeichert werden',
        invalid: 'Modellkennung, API Base URL und API-Schlüssel sind erforderlich'
      },
      uninstall: {
        menuLabel: 'Deinstallieren',
        confirmTitle: 'Deinstallieren PicoClaw',
        confirmContent:
          'Sind Sie sicher, dass Sie PicoClaw deinstallieren möchten? Dadurch werden die ausführbare Datei und alle Konfigurationsdateien gelöscht.',
        confirmOk: 'Deinstallieren',
        confirmCancel: 'Abbrechen'
      },
      history: {
        title: 'Verlauf',
        loading: 'Sitzungen werden geladen...',
        emptyTitle: 'Noch keine Historie',
        emptyDescription: 'Frühere PicoClaw-Sitzungen werden hier angezeigt.',
        loadFailed: 'Der Sitzungsverlauf konnte nicht geladen werden',
        deleteFailed: 'Sitzung konnte nicht gelöscht werden',
        deleteConfirmTitle: 'Sitzung löschen',
        deleteConfirmContent: 'Sind Sie sicher, dass Sie „{{title}}“ löschen möchten?',
        deleteConfirmOk: 'Löschen',
        deleteConfirmCancel: 'Abbrechen',
        messageCount_one: '{{count}} Nachricht',
        messageCount_other: '{{count}} Nachrichten'
      },
      config: {
        startRuntime: 'PicoClaw starten',
        stopRuntime: 'PicoClaw stoppen'
      },
      start: {
        title: 'PicoClaw starten',
        description:
          'Starten Sie die Runtime, um mit der Verwendung des PicoClaw-Assistenten zu beginnen.'
      }
    },
    error: {
      title: 'Wir sind auf ein Problem gestossen',
      refresh: 'Neuladen'
    },
    fullscreen: {
      toggle: 'Vollbild ein/aus'
    },
    menu: {}
  }
};

export default de;
